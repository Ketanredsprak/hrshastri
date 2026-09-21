<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '', true);
if (!is_array($body)) {
    json_response(400, ['ok' => false, 'error' => 'Invalid JSON body']);
}

// Honeypot — bots often fill hidden fields
if (!empty($body['website'])) {
    json_response(200, ['ok' => true]);
}

$name = sanitize_string($body['name'] ?? '', 120);
$company = sanitize_string($body['company'] ?? '', 160);
$email = sanitize_string($body['email'] ?? '', 160);
$phone = sanitize_string($body['phone'] ?? '', 40);
$employees = sanitize_string($body['employees'] ?? '', 40);
$message = sanitize_string($body['message'] ?? '', 2000);
$subject = sanitize_string($body['subject'] ?? 'General inquiry', 120);

if ($name === '' || $company === '' || $email === '' || $phone === '' || $employees === '') {
    json_response(422, ['ok' => false, 'error' => 'Missing required fields']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(422, ['ok' => false, 'error' => 'Invalid email address']);
}

$entry = [
    'id' => bin2hex(random_bytes(16)),
    'created_at' => gmdate('c'),
    'subject' => $subject,
    'name' => $name,
    'company' => $company,
    'email' => $email,
    'phone' => $phone,
    'employees' => $employees,
    'message' => $message,
    'ip' => sanitize_string($_SERVER['REMOTE_ADDR'] ?? '', 45),
    'user_agent' => sanitize_string($_SERVER['HTTP_USER_AGENT'] ?? '', 300),
];

$path = $CONFIG['storage_file'];
$items = read_submissions($path);
array_unshift($items, $entry);

if (!write_submissions($path, $items)) {
    json_response(500, ['ok' => false, 'error' => 'Could not save submission']);
}

json_response(201, ['ok' => true, 'id' => $entry['id']]);
