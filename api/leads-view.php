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

$items = read_submissions($CONFIG['storage_file']);

header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>HR Shastri — Contact leads</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #f8fafc; color: #1e293b; }
    .wrap { max-width: 1200px; margin: 0 auto; padding: 24px 16px 48px; }
    h1 { font-size: 1.35rem; margin: 0 0 8px; }
    .meta { color: #64748b; font-size: 0.875rem; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgb(0 0 0 / 8%); }
    th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #e2e8f0; vertical-align: top; font-size: 0.875rem; }
    th { background: #f1f5f9; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: #475569; }
    tr:last-child td { border-bottom: none; }
    .empty { padding: 32px; text-align: center; color: #64748b; background: #fff; border-radius: 12px; }
    .msg { max-width: 280px; white-space: pre-wrap; word-break: break-word; }
    a { color: #0033cc; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Contact form submissions</h1>
    <p class="meta"><?= count($items) ?> total · Private admin view · Do not share this URL</p>
    <?php if (count($items) === 0): ?>
      <div class="empty">No submissions yet.</div>
    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>Date (UTC)</th>
            <th>Subject</th>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Employees</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($items as $row): ?>
            <tr>
              <td><?= htmlspecialchars($row['created_at'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
              <td><?= htmlspecialchars($row['subject'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
              <td><?= htmlspecialchars($row['name'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
              <td><?= htmlspecialchars($row['company'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
              <td><a href="mailto:<?= htmlspecialchars($row['email'] ?? '', ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($row['email'] ?? '', ENT_QUOTES, 'UTF-8') ?></a></td>
              <td><?= htmlspecialchars($row['phone'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
              <td><?= htmlspecialchars($row['employees'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
              <td class="msg"><?= htmlspecialchars($row['message'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </div>
</body>
</html>
