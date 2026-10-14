<?php
/**
 * Copy this file to config.local.php and set a long random view_token.
 * Do not commit config.local.php to public repositories.
 */
return [
    // Secret key for viewing submissions (use in private URL only)
    'view_token' => 'REPLACE_WITH_LONG_RANDOM_STRING',

    // JSON file path
    'storage_file' => dirname(__DIR__) . '/storage/contact-submissions.json',

    // Admin email address to receive lead notifications
    'admin_email' => 'ketan@redsparkinfo.co.in',

    // SMTP Configuration for Production
    'smtp' => [
        'enabled' => false, // Set to true to send via authenticated SMTP
        'host' => 'smtp.example.com',
        'port' => 587,
        'encryption' => 'tls', // 'tls' or 'ssl'
        'username' => '',
        'password' => '',
        'from_email' => 'noreply@hrshastri.com',
        'from_name' => 'HR Shastri Leads',
    ],
];
