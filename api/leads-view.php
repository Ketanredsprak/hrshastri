<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$token = $_GET['key'] ?? '';
if (!is_string($token) || !hash_equals($CONFIG['view_token'], $token)) {
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><title>Not Found</title><p>Not Found</p>';
    exit;
}

$storagePath = $CONFIG['storage_file'];
$items = read_submissions($storagePath);

// Handle Export to CSV / Excel
if (($_GET['action'] ?? '') === 'export') {
    $filename = 'hrshastri-leads-' . date('Y-m-d-His') . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Pragma: no-cache');
    header('Expires: 0');

    $out = fopen('php://output', 'w');
    // UTF-8 BOM for Microsoft Excel compatibility
    fwrite($out, "\xEF\xBB\xBF");

    fputcsv($out, [
        'ID',
        'Date & Time (UTC)',
        'Status / Flag',
        'Inquiry Type / Subject',
        'Full Name',
        'Company',
        'Email Address',
        'Phone Number',
        'Employees Count',
        'Message / Requirements',
        'Internal Action Notes',
        'Last Status Update',
        'IP Address',
    ]);

    foreach ($items as $row) {
        fputcsv($out, [
            $row['id'] ?? '',
            $row['created_at'] ?? '',
            strtoupper(str_replace('_', ' ', $row['status'] ?? 'new')),
            $row['subject'] ?? '',
            $row['name'] ?? '',
            $row['company'] ?? '',
            $row['email'] ?? '',
            $row['phone'] ?? '',
            $row['employees'] ?? '',
            $row['message'] ?? '',
            $row['notes'] ?? '',
            $row['status_updated_at'] ?? '',
            $row['ip'] ?? '',
        ]);
    }

    fclose($out);
    exit;
}

// Handle Update Status / Action Note (Supports both AJAX and standard POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'update_status') {
    $leadId = trim((string)($_POST['lead_id'] ?? ''));
    $newStatus = trim((string)($_POST['lead_status'] ?? 'new'));
    $actionNotes = isset($_POST['action_notes']) ? trim((string)$_POST['action_notes']) : null;
    
    $validStatuses = ['new', 'contacted', 'demo_scheduled', 'closed', 'lost'];
    if (!in_array($newStatus, $validStatuses, true)) {
        $newStatus = 'new';
    }

    $updated = false;
    $updatedItem = null;
    foreach ($items as &$item) {
        if (($item['id'] ?? '') === $leadId) {
            $item['status'] = $newStatus;
            if ($actionNotes !== null) {
                $item['notes'] = $actionNotes;
            }
            $item['status_updated_at'] = gmdate('c');
            $updated = true;
            $updatedItem = $item;
            break;
        }
    }
    unset($item);

    if ($updated) {
        write_submissions($storagePath, $items);
    }

    $isAjax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
              || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'ok' => $updated,
            'lead_id' => $leadId,
            'status' => $newStatus,
            'notes' => $updatedItem['notes'] ?? '',
            'status_updated_at' => $updatedItem['status_updated_at'] ?? '',
        ]);
        exit;
    }

    header('Location: leads-view.php?key=' . urlencode($token) . '&status=status_updated');
    exit;
}

// Handle Single Delete
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
    $deleteId = trim((string)($_POST['lead_id'] ?? ''));
    if ($deleteId !== '') {
        $beforeCount = count($items);
        $items = array_values(array_filter($items, fn($item) => ($item['id'] ?? '') !== $deleteId));
        if (count($items) < $beforeCount) {
            write_submissions($storagePath, $items);
            header('Location: leads-view.php?key=' . urlencode($token) . '&status=deleted');
            exit;
        }
    }
}

// Handle Bulk Delete
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'bulk_delete') {
    $deleteIds = $_POST['selected_ids'] ?? [];
    if (is_array($deleteIds) && count($deleteIds) > 0) {
        $idMap = array_flip($deleteIds);
        $beforeCount = count($items);
        $items = array_values(array_filter($items, fn($item) => !isset($idMap[$item['id'] ?? ''])));
        $deletedCount = $beforeCount - count($items);
        if ($deletedCount > 0) {
            write_submissions($storagePath, $items);
            header('Location: leads-view.php?key=' . urlencode($token) . '&status=bulk_deleted&count=' . $deletedCount);
            exit;
        }
    }
}

$status = $_GET['status'] ?? '';
$bulkCount = (int)($_GET['count'] ?? 0);

// Calculate Stats
$totalCount = count($items);
$newCount = 0;
$inProgressCount = 0;
$closedCount = 0;
$todayCount = 0;
$todayDate = gmdate('Y-m-d');

foreach ($items as $item) {
    $leadStatus = $item['status'] ?? 'new';
    if ($leadStatus === 'closed') {
        $closedCount++;
    } elseif ($leadStatus === 'contacted' || $leadStatus === 'demo_scheduled') {
        $inProgressCount++;
    } else {
        $newCount++;
    }
    
    $created = $item['created_at'] ?? '';
    if (strpos($created, $todayDate) === 0) {
        $todayCount++;
    }
}

// Pagination logic
$perPage = max(5, (int)($_GET['per_page'] ?? 10));
$page = max(1, (int)($_GET['page'] ?? 1));
$totalPages = max(1, (int)ceil($totalCount / $perPage));
if ($page > $totalPages) {
    $page = $totalPages;
}
$offset = ($page - 1) * $perPage;
$paginatedItems = array_slice($items, $offset, $perPage);

header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>HR Shastri — Leads & Inquiries Manager</title>
  <style>
    :root {
      --primary: #51459D;
      --primary-hover: #433880;
      --primary-light: #f3f0ff;
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-200: #e2e8f0;
      --slate-300: #cbd5e1;
      --slate-400: #94a3b8;
      --slate-500: #64748b;
      --slate-600: #475569;
      --slate-700: #334155;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
      --danger: #ef4444;
      --danger-hover: #dc2626;
      --danger-light: #fef2f2;
      --emerald: #10b981;
      --emerald-light: #ecfdf5;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: var(--slate-800);
      line-height: 1.5;
      font-size: 14px;
    }

    /* Top Navbar */
    .navbar {
      background: #ffffff;
      border-bottom: 1px solid var(--slate-200);
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 40;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo {
      height: 32px;
      width: auto;
    }
    .brand-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--slate-900);
      letter-spacing: -0.3px;
    }
    .brand-badge {
      background: var(--primary-light);
      color: var(--primary);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid #e9d5ff;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s ease;
    }
    .btn-primary {
      background: var(--primary);
      color: #ffffff;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
    }
    .btn-success {
      background: #059669;
      color: #ffffff;
    }
    .btn-success:hover {
      background: #047857;
    }
    .btn-outline {
      background: #ffffff;
      color: var(--slate-700);
      border-color: var(--slate-200);
    }
    .btn-outline:hover {
      background: var(--slate-50);
      border-color: var(--slate-300);
    }
    .btn-danger {
      background: var(--danger-light);
      color: var(--danger);
      border-color: #fecaca;
    }
    .btn-danger:hover {
      background: var(--danger);
      color: #ffffff;
    }
    .btn-sm {
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 6px;
    }

    /* Container */
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px 20px 60px;
    }

    /* Flash Messages */
    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 500;
      animation: fadeIn 0.3s ease;
    }
    .alert-success {
      background: var(--emerald-light);
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    /* Toast Notification */
    #toastNotice {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
      font-size: 13px;
      font-weight: 600;
      z-index: 999;
      display: none;
      align-items: center;
      gap: 8px;
      animation: slideUp 0.25s ease;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 12px;
      padding: 18px 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      transition: transform 0.15s ease;
    }
    .stat-card:hover {
      transform: translateY(-2px);
    }
    .stat-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-500);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .stat-value {
      font-size: 28px;
      font-weight: 800;
      color: var(--slate-900);
    }

    /* Card Wrapper */
    .card {
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
    }

    /* Toolbar / Controls */
    .toolbar {
      padding: 16px 20px;
      border-bottom: 1px solid var(--slate-200);
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 280px;
      max-width: 620px;
    }
    .form-input {
      width: 100%;
      padding: 8px 14px;
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      font-size: 13px;
      outline: none;
      transition: border-color 0.15s ease;
    }
    .form-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(81, 69, 157, 0.12);
    }
    .filter-select {
      padding: 8px 12px;
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      font-size: 13px;
      color: var(--slate-700);
      background: #ffffff;
      outline: none;
      cursor: pointer;
    }

    /* Table */
    .table-container {
      overflow-x: auto;
      width: 100%;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    th {
      background: #f8fafc;
      padding: 12px 14px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slate-500);
      border-bottom: 1px solid var(--slate-200);
      white-space: nowrap;
    }
    td {
      padding: 14px 14px;
      border-bottom: 1px solid var(--slate-100);
      vertical-align: top;
      font-size: 13px;
    }
    tr:hover td {
      background-color: #fafbfc;
    }
    tr:last-child td {
      border-bottom: none;
    }

    /* Interactive Status Select Dropdown */
    .status-select {
      padding: 6px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid transparent;
      cursor: pointer;
      outline: none;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .status-new {
      background: #eff6ff;
      color: #1d4ed8;
      border-color: #bfdbfe;
    }
    .status-contacted {
      background: #fefce8;
      color: #b45309;
      border-color: #fef08a;
    }
    .status-demo_scheduled {
      background: #faf5ff;
      color: #7e22ce;
      border-color: #e9d5ff;
    }
    .status-closed {
      background: #ecfdf5;
      color: #047857;
      border-color: #a7f3d0;
    }
    .status-lost {
      background: #f1f5f9;
      color: #64748b;
      border-color: #cbd5e1;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }
    .badge-trial {
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }
    .badge-demo {
      background: #ede9fe;
      color: #51459D;
      border: 1px solid #ddd6fe;
    }
    .badge-general {
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
    }

    /* Message & Notes Cell */
    .msg-cell {
      max-width: 220px;
      color: var(--slate-600);
      word-break: break-word;
      font-size: 12.5px;
      line-height: 1.4;
    }
    .notes-box {
      margin-top: 6px;
      padding: 4px 8px;
      background: #f8fafc;
      border-left: 3px solid var(--primary);
      border-radius: 0 4px 4px 0;
      font-size: 11.5px;
      color: var(--slate-700);
    }
    .contact-link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
    }
    .contact-link:hover {
      text-decoration: underline;
    }
    .action-note-btn {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: var(--primary);
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      margin-top: 4px;
    }
    .action-note-btn:hover {
      text-decoration: underline;
    }

    /* Pagination */
    .pagination-bar {
      padding: 14px 20px;
      border-top: 1px solid var(--slate-200);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      background: #ffffff;
      font-size: 13px;
      color: var(--slate-500);
    }
    .pagination-controls {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .page-btn {
      padding: 5px 10px;
      border: 1px solid var(--slate-200);
      background: #ffffff;
      color: var(--slate-700);
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      font-size: 12px;
    }
    .page-btn.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }
    .page-btn:hover:not(.active) {
      background: var(--slate-50);
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      visibility: hidden;
      opacity: 0;
      transition: all 0.2s ease;
    }
    .modal-overlay.open {
      visibility: visible;
      opacity: 1;
    }
    .modal {
      background: #ffffff;
      border-radius: 12px;
      width: 100%;
      max-width: 480px;
      padding: 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      transform: scale(0.95);
      transition: transform 0.2s ease;
    }
    .modal-overlay.open .modal {
      transform: scale(1);
    }
    .modal-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--slate-900);
      margin-bottom: 8px;
    }
    .modal-body {
      font-size: 13px;
      color: var(--slate-600);
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .empty-state {
      padding: 48px 24px;
      text-align: center;
      color: var(--slate-400);
    }
    .empty-icon {
      font-size: 36px;
      margin-bottom: 12px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

  <!-- Top Header Navigation -->
  <header class="navbar">
    <div class="nav-brand">
      <img src="../logo.png" alt="HR Shastri" class="brand-logo" onerror="this.style.display='none'">
      <span class="brand-title">HR Shastri</span>
      <span class="brand-badge">Leads Pipeline</span>
    </div>

    <div class="nav-actions">
      <!-- Export to Excel Button -->
      <a href="leads-view.php?key=<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>&action=export" class="btn btn-success">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Export to Excel (CSV)
      </a>

      <!-- Quick Link to Live Website -->
      <a href="/" target="_blank" class="btn btn-outline">
        View Website ↗
      </a>
    </div>
  </header>

  <div class="container">

    <!-- Status Alerts -->
    <?php if ($status === 'deleted'): ?>
      <div class="alert alert-success">
        <span>✓ Lead successfully removed from database.</span>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:inherit;font-size:16px;">&times;</button>
      </div>
    <?php elseif ($status === 'bulk_deleted'): ?>
      <div class="alert alert-success">
        <span>✓ <?= (int)$bulkCount ?> leads successfully removed.</span>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:inherit;font-size:16px;">&times;</button>
      </div>
    <?php elseif ($status === 'status_updated'): ?>
      <div class="alert alert-success">
        <span>✓ Lead status / action notes updated.</span>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:inherit;font-size:16px;">&times;</button>
      </div>
    <?php endif; ?>

    <!-- Overview Stats with Lead Status Flags -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Inquiries</div>
        <div class="stat-value"><?= number_format($totalCount) ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">New Leads</div>
        <div class="stat-value" style="color:#2563eb;"><?= number_format($newCount) ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">In Progress / Demo</div>
        <div class="stat-value" style="color:var(--primary);"><?= number_format($inProgressCount) ?></div>
      </div>
      <div class="stat-card" style="border-color:#a7f3d0;background:#f0fdf4;">
        <div class="stat-label" style="color:#047857;">Closed Leads (Won)</div>
        <div class="stat-value" style="color:#059669;"><?= number_format($closedCount) ?></div>
      </div>
    </div>

    <!-- Main Table Card -->
    <div class="card">
      <form id="bulkForm" method="POST" action="leads-view.php?key=<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>">
        <input type="hidden" name="action" value="bulk_delete">

        <!-- Toolbar -->
        <div class="toolbar">
          <div class="search-box">
            <input
              type="text"
              id="leadSearch"
              class="form-input"
              placeholder="Search name, company, email, phone, or notes..."
              onkeyup="filterLeads()"
            >
            <select id="statusFilter" class="filter-select" onchange="filterLeads()">
              <option value="">All Statuses</option>
              <option value="new">🔵 New</option>
              <option value="contacted">🟡 Contacted</option>
              <option value="demo_scheduled">🟣 Demo Scheduled</option>
              <option value="closed">🟢 Lead Closed</option>
              <option value="lost">⚪ Lost</option>
            </select>
            <select id="typeFilter" class="filter-select" onchange="filterLeads()">
              <option value="">All Types</option>
              <option value="trial">Free Trial</option>
              <option value="demo">Book Demo</option>
              <option value="general">General</option>
            </select>
          </div>

          <div style="display:flex;align-items:center;gap:10px;">
            <button
              type="button"
              id="bulkDeleteBtn"
              class="btn btn-danger btn-sm"
              style="display:none;"
              onclick="openBulkDeleteModal()"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              Delete Selected (<span id="selectedCount">0</span>)
            </button>
            <span style="font-size:12px;color:var(--slate-500);"><?= number_format($totalCount) ?> total leads</span>
          </div>
        </div>

        <!-- Leads Table -->
        <div class="table-container">
          <table id="leadsTable">
            <thead>
              <tr>
                <th width="40"><input type="checkbox" id="selectAllCheckbox" onchange="toggleSelectAll(this)"></th>
                <th>Date</th>
                <th>Status / Action Flag</th>
                <th>Inquiry Type</th>
                <th>Prospect & Company</th>
                <th>Contact Info</th>
                <th>Employees</th>
                <th>Message & Action Notes</th>
                <th width="80" style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php if (count($paginatedItems) === 0): ?>
                <tr>
                  <td colspan="9">
                    <div class="empty-state">
                      <div class="empty-icon">📥</div>
                      <strong>No leads submitted yet.</strong>
                      <p style="margin-top:4px;font-size:12px;">Submitted trial and demo requests will appear here in real time.</p>
                    </div>
                  </td>
                </tr>
              <?php else: ?>
                <?php foreach ($paginatedItems as $row): 
                  $subj = strtolower($row['subject'] ?? '');
                  $badgeClass = 'badge-general';
                  if (strpos($subj, 'trial') !== false) {
                    $badgeClass = 'badge-trial';
                  } elseif (strpos($subj, 'demo') !== false) {
                    $badgeClass = 'badge-demo';
                  }

                  $leadStatus = $row['status'] ?? 'new';
                  $rawDate = $row['created_at'] ?? '';
                  $formattedDate = $rawDate !== '' ? date('d M Y, h:i A', strtotime($rawDate)) : 'N/A';
                  $leadId = htmlspecialchars($row['id'] ?? '', ENT_QUOTES, 'UTF-8');
                  $leadName = htmlspecialchars($row['name'] ?? '', ENT_QUOTES, 'UTF-8');
                  $leadCompany = htmlspecialchars($row['company'] ?? '', ENT_QUOTES, 'UTF-8');
                  $leadEmail = htmlspecialchars($row['email'] ?? '', ENT_QUOTES, 'UTF-8');
                  $leadPhone = htmlspecialchars($row['phone'] ?? '', ENT_QUOTES, 'UTF-8');
                  $leadSubject = htmlspecialchars($row['subject'] ?? 'Inquiry', ENT_QUOTES, 'UTF-8');
                  $leadEmployees = htmlspecialchars($row['employees'] ?? '—', ENT_QUOTES, 'UTF-8');
                  $leadMessage = htmlspecialchars($row['message'] ?? '—', ENT_QUOTES, 'UTF-8');
                  $leadNotes = htmlspecialchars($row['notes'] ?? '', ENT_QUOTES, 'UTF-8');
                ?>
                  <tr class="lead-row" id="row-<?= $leadId ?>" data-type="<?= htmlspecialchars($subj, ENT_QUOTES, 'UTF-8') ?>" data-status="<?= htmlspecialchars($leadStatus, ENT_QUOTES, 'UTF-8') ?>">
                    <td>
                      <input type="checkbox" name="selected_ids[]" value="<?= $leadId ?>" class="row-checkbox" onchange="updateSelectedCount()">
                    </td>
                    <td style="white-space:nowrap;color:var(--slate-500);font-size:12px;">
                      <?= $formattedDate ?>
                    </td>
                    <td>
                      <!-- Interactive Status Flag Dropdown -->
                      <select
                        class="status-select status-<?= $leadStatus ?>"
                        id="select-<?= $leadId ?>"
                        onchange="changeLeadStatus('<?= $leadId ?>', this.value)"
                      >
                        <option value="new" <?= $leadStatus === 'new' ? 'selected' : '' ?>>🔵 New</option>
                        <option value="contacted" <?= $leadStatus === 'contacted' ? 'selected' : '' ?>>🟡 Contacted</option>
                        <option value="demo_scheduled" <?= $leadStatus === 'demo_scheduled' ? 'selected' : '' ?>>🟣 Demo Scheduled</option>
                        <option value="closed" <?= $leadStatus === 'closed' ? 'selected' : '' ?>>🟢 Lead Closed</option>
                        <option value="lost" <?= $leadStatus === 'lost' ? 'selected' : '' ?>>⚪ Lost</option>
                      </select>
                    </td>
                    <td>
                      <span class="badge <?= $badgeClass ?>"><?= $leadSubject ?></span>
                    </td>
                    <td>
                      <div style="font-weight:700;color:var(--slate-900);"><?= $leadName ?></div>
                      <div style="font-size:12px;color:var(--slate-500);"><?= $leadCompany ?></div>
                    </td>
                    <td>
                      <div><a href="mailto:<?= $leadEmail ?>" class="contact-link"><?= $leadEmail ?></a></div>
                      <div style="font-size:12px;"><a href="tel:<?= $leadPhone ?>" class="contact-link" style="color:var(--slate-600);"><?= $leadPhone ?></a></div>
                    </td>
                    <td>
                      <span style="font-weight:600;color:var(--slate-700);"><?= $leadEmployees ?></span>
                    </td>
                    <td>
                      <div class="msg-cell"><?= $leadMessage ?></div>
                      
                      <!-- Action Note Display & Trigger -->
                      <div id="notes-container-<?= $leadId ?>">
                        <?php if ($leadNotes !== ''): ?>
                          <div class="notes-box" id="note-text-<?= $leadId ?>">
                            <strong>Action:</strong> <?= $leadNotes ?>
                          </div>
                        <?php endif; ?>
                      </div>

                      <button
                        type="button"
                        class="action-note-btn"
                        onclick="openNoteModal('<?= $leadId ?>', '<?= addslashes($leadName) ?>', '<?= addslashes($leadNotes) ?>')"
                      >
                        📝 <?= $leadNotes !== '' ? 'Edit Note' : '+ Add Action Note' ?>
                      </button>
                    </td>
                    <td style="text-align:right;">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick="openDeleteModal('<?= $leadId ?>', '<?= addslashes($leadName) ?>', '<?= addslashes($leadCompany) ?>')"
                        title="Delete Lead"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>
      </form>

      <!-- Pagination Footer -->
      <?php if ($totalCount > 0): ?>
        <div class="pagination-bar">
          <div>
            Showing <strong><?= $totalCount === 0 ? 0 : $offset + 1 ?></strong> to <strong><?= min($offset + $perPage, $totalCount) ?></strong> of <strong><?= $totalCount ?></strong> leads
          </div>
          
          <div class="pagination-controls">
            <?php if ($page > 1): ?>
              <a href="leads-view.php?key=<?= urlencode($token) ?>&page=<?= $page - 1 ?>&per_page=<?= $perPage ?>" class="page-btn">← Prev</a>
            <?php endif; ?>

            <?php for ($i = 1; $i <= $totalPages; $i++): ?>
              <?php if ($i === 1 || $i === $totalPages || ($i >= $page - 2 && $i <= $page + 2)): ?>
                <a href="leads-view.php?key=<?= urlencode($token) ?>&page=<?= $i ?>&per_page=<?= $perPage ?>" class="page-btn <?= $i === $page ? 'active' : '' ?>">
                  <?= $i ?>
                </a>
              <?php elseif ($i === $page - 3 || $i === $page + 3): ?>
                <span style="padding:0 4px;color:var(--slate-400);">...</span>
              <?php endif; ?>
            <?php endfor; ?>

            <?php if ($page < $totalPages): ?>
              <a href="leads-view.php?key=<?= urlencode($token) ?>&page=<?= $page + 1 ?>&per_page=<?= $perPage ?>" class="page-btn">Next →</a>
            <?php endif; ?>
          </div>
        </div>
      <?php endif; ?>
    </div>

  </div>

  <!-- Toast Notification -->
  <div id="toastNotice">
    <span>✓</span>
    <span id="toastMsg">Status updated</span>
  </div>

  <!-- Action Note Modal -->
  <div id="noteModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-title">Record Action Note</div>
      <div class="modal-body">
        Add action taken for <strong id="noteLeadName"></strong> (e.g., "Called prospect", "Demo presented", "Contract signed"):
        <textarea
          id="actionNoteInput"
          class="form-input"
          rows="4"
          style="margin-top:10px;resize:vertical;"
          placeholder="Enter notes on follow-up, meeting outcome, or closing terms..."
        ></textarea>
        <input type="hidden" id="noteLeadId">
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline" onclick="closeNoteModal()">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="saveActionNote()">Save Note</button>
      </div>
    </div>
  </div>

  <!-- Single Delete Confirmation Modal -->
  <div id="deleteModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-title">Delete Lead Submission</div>
      <div class="modal-body">
        Are you sure you want to permanently delete the lead from <strong id="deleteLeadName"></strong> (<span id="deleteLeadCompany"></span>)?
        <br><br>
        <span style="color:var(--danger);font-size:12px;">This action cannot be undone.</span>
      </div>
      <form method="POST" action="leads-view.php?key=<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>">
        <input type="hidden" name="action" value="delete">
        <input type="hidden" name="lead_id" id="deleteLeadId">
        <div class="modal-actions">
          <button type="button" class="btn btn-outline" onclick="closeDeleteModal()">Cancel</button>
          <button type="submit" class="btn btn-danger">Confirm Delete</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Bulk Delete Confirmation Modal -->
  <div id="bulkDeleteModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-title">Bulk Delete Leads</div>
      <div class="modal-body">
        Are you sure you want to permanently delete the <strong id="bulkModalCount"></strong> selected leads?
        <br><br>
        <span style="color:var(--danger);font-size:12px;">This action cannot be undone.</span>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline" onclick="closeBulkDeleteModal()">Cancel</button>
        <button type="button" class="btn btn-danger" onclick="document.getElementById('bulkForm').submit()">Delete Selected</button>
      </div>
    </div>
  </div>

  <script>
    const viewToken = '<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>';

    // Live Instant Status Change via AJAX
    function changeLeadStatus(leadId, newStatus) {
      const selectEl = document.getElementById('select-' + leadId);
      const row = document.getElementById('row-' + leadId);

      // Update local styles
      selectEl.className = 'status-select status-' + newStatus;
      if (row) {
        row.setAttribute('data-status', newStatus);
      }

      // Post update to server
      const formData = new FormData();
      formData.append('action', 'update_status');
      formData.append('lead_id', leadId);
      formData.append('lead_status', newStatus);

      fetch('leads-view.php?key=' + encodeURIComponent(viewToken), {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          const statusLabels = {
            'new': 'New Lead',
            'contacted': 'Contacted',
            'demo_scheduled': 'Demo Scheduled',
            'closed': 'Lead Closed',
            'lost': 'Marked Lost'
          };
          showToast('✓ Lead updated to ' + (statusLabels[newStatus] || newStatus));
        }
      })
      .catch(err => {
        console.error('Error updating status:', err);
        showToast('⚠ Could not save status change');
      });
    }

    // Action Note Modal
    function openNoteModal(id, name, existingNote) {
      document.getElementById('noteLeadId').value = id;
      document.getElementById('noteLeadName').innerText = name || 'this prospect';
      document.getElementById('actionNoteInput').value = existingNote || '';
      document.getElementById('noteModal').classList.add('open');
      document.getElementById('actionNoteInput').focus();
    }

    function closeNoteModal() {
      document.getElementById('noteModal').classList.remove('open');
    }

    function saveActionNote() {
      const leadId = document.getElementById('noteLeadId').value;
      const note = document.getElementById('actionNoteInput').value.trim();
      const selectEl = document.getElementById('select-' + leadId);
      const currentStatus = selectEl ? selectEl.value : 'new';

      const formData = new FormData();
      formData.append('action', 'update_status');
      formData.append('lead_id', leadId);
      formData.append('lead_status', currentStatus);
      formData.append('action_notes', note);

      fetch('leads-view.php?key=' + encodeURIComponent(viewToken), {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          const container = document.getElementById('notes-container-' + leadId);
          if (container) {
            if (note !== '') {
              container.innerHTML = '<div class="notes-box" id="note-text-' + leadId + '"><strong>Action:</strong> ' + escapeHtml(note) + '</div>';
            } else {
              container.innerHTML = '';
            }
          }
          closeNoteModal();
          showToast('✓ Action note saved successfully');
        }
      })
      .catch(err => {
        console.error('Error saving note:', err);
        showToast('⚠ Error saving note');
      });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.innerText = text;
      return div.innerHTML;
    }

    // Toast alert
    let toastTimer = null;
    function showToast(msg) {
      const toast = document.getElementById('toastNotice');
      document.getElementById('toastMsg').innerText = msg;
      toast.style.display = 'inline-flex';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }

    // Live Search & Type Filtering
    function filterLeads() {
      const query = document.getElementById('leadSearch').value.toLowerCase().trim();
      const status = document.getElementById('statusFilter').value.toLowerCase().trim();
      const type = document.getElementById('typeFilter').value.toLowerCase().trim();
      const rows = document.querySelectorAll('.lead-row');

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const rowType = row.getAttribute('data-type') || '';
        const rowStatus = row.getAttribute('data-status') || '';

        const matchesQuery = query === '' || text.includes(query);
        const matchesType = type === '' || rowType.includes(type);
        const matchesStatus = status === '' || rowStatus === status;

        if (matchesQuery && matchesType && matchesStatus) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    // Modal controls for single delete
    function openDeleteModal(id, name, company) {
      document.getElementById('deleteLeadId').value = id;
      document.getElementById('deleteLeadName').innerText = name || 'this prospect';
      document.getElementById('deleteLeadCompany').innerText = company || 'N/A';
      document.getElementById('deleteModal').classList.add('open');
    }

    function closeDeleteModal() {
      document.getElementById('deleteModal').classList.remove('open');
    }

    // Modal controls for bulk delete
    function openBulkDeleteModal() {
      const selected = document.querySelectorAll('.row-checkbox:checked').length;
      document.getElementById('bulkModalCount').innerText = selected;
      document.getElementById('bulkDeleteModal').classList.add('open');
    }

    function closeBulkDeleteModal() {
      document.getElementById('bulkDeleteModal').classList.remove('open');
    }

    // Selection handling
    function toggleSelectAll(master) {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(cb => {
        if (cb.closest('tr').style.display !== 'none') {
          cb.checked = master.checked;
        }
      });
      updateSelectedCount();
    }

    function updateSelectedCount() {
      const selected = document.querySelectorAll('.row-checkbox:checked').length;
      const bulkBtn = document.getElementById('bulkDeleteBtn');
      const countSpan = document.getElementById('selectedCount');

      countSpan.innerText = selected;
      if (selected > 0) {
        bulkBtn.style.display = 'inline-flex';
      } else {
        bulkBtn.style.display = 'none';
        document.getElementById('selectAllCheckbox').checked = false;
      }
    }

    // Close modals on Escape key or backdrop click
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDeleteModal();
        closeBulkDeleteModal();
        closeNoteModal();
      }
    });
    document.querySelectorAll('.modal-overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el) {
          closeDeleteModal();
          closeBulkDeleteModal();
          closeNoteModal();
        }
      });
    });
  </script>

</body>
</html>
