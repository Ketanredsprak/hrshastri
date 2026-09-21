<?php
/**
 * Copy this file to config.local.php and set a long random view_token.
 * Do not commit config.local.php to public repositories.
 */
return [
    // Secret key for viewing submissions (use in private URL only)
    'view_token' => 'REPLACE_WITH_LONG_RANDOM_STRING',

    // JSON file path (outside public web root is ideal; blocked by storage/.htaccess)
    'storage_file' => dirname(__DIR__) . '/storage/contact-submissions.json',
];
