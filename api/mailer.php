<?php
declare(strict_types=1);

/**
 * Pure PHP SMTP & Mailer Client for HR Shastri
 * Sends lead notification emails to admin on form submission.
 */

function send_lead_notification(array $config, array $entry): bool
{
    $to = $config['admin_email'] ?? 'ketan@redsparkinfo.co.in';
    if (empty($to)) {
        return false;
    }

    $leadName = $entry['name'] ?? 'New Prospect';
    $leadCompany = $entry['company'] ?? '';
    $leadSubject = $entry['subject'] ?? 'Form Submission';
    
    $emailSubject = sprintf(
        '[%s Lead] %s %s',
        $leadSubject,
        $leadName,
        $leadCompany !== '' ? "({$leadCompany})" : ''
    );

    $htmlBody = render_lead_html($entry);
    $textBody = render_lead_plain_text($entry);

    $smtp = $config['smtp'] ?? [];
    if (!empty($smtp['enabled']) && !empty($smtp['host'])) {
        return smtp_send($smtp, $to, $emailSubject, $htmlBody, $entry['email'] ?? '');
    }

    // Fallback to standard mail() if SMTP is not enabled yet
    return native_mail_send($smtp, $to, $emailSubject, $htmlBody, $entry['email'] ?? '', $leadName);
}

function native_mail_send(array $smtp, string $to, string $subject, string $html, string $replyToEmail, string $replyToName): bool
{
    $fromEmail = !empty($smtp['from_email']) ? $smtp['from_email'] : 'noreply@hrshastri.com';
    $fromName = !empty($smtp['from_name']) ? $smtp['from_name'] : 'HR Shastri Leads';

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . sprintf('=?UTF-8?B?%s?= <%s>', base64_encode($fromName), $fromEmail),
    ];

    if (!empty($replyToEmail)) {
        $headers[] = 'Reply-To: ' . sprintf('=?UTF-8?B?%s?= <%s>', base64_encode($replyToName), $replyToEmail);
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    return @mail($to, $encodedSubject, $html, implode("\r\n", $headers));
}

function smtp_send(array $smtp, string $to, string $subject, string $html, string $replyToEmail): bool
{
    $host = $smtp['host'];
    $port = (int) ($smtp['port'] ?? 587);
    $encryption = strtolower($smtp['encryption'] ?? 'tls');
    $username = $smtp['username'] ?? '';
    $password = $smtp['password'] ?? '';
    $fromEmail = !empty($smtp['from_email']) ? $smtp['from_email'] : 'noreply@hrshastri.com';
    $fromName = !empty($smtp['from_name']) ? $smtp['from_name'] : 'HR Shastri Leads';
    $timeout = 15;

    $connectHost = ($encryption === 'ssl') ? 'ssl://' . $host : $host;
    $socket = @fsockopen($connectHost, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        error_log("HR Shastri SMTP Error: Cannot connect to {$host}:{$port} - {$errstr} ({$errno})");
        return false;
    }

    $read = function () use ($socket): string {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === ' ') {
                break;
            }
        }
        return $data;
    };

    $write = function (string $cmd) use ($socket): void {
        fputs($socket, $cmd . "\r\n");
    };

    $response = $read();
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        return false;
    }

    $localhost = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $write("EHLO " . $localhost);
    $response = $read();

    if ($encryption === 'tls') {
        $write("STARTTLS");
        $response = $read();
        if (substr($response, 0, 3) !== '220') {
            fclose($socket);
            return false;
        }

        $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
            $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        }
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
            $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
        }

        if (!stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
            fclose($socket);
            return false;
        }

        $write("EHLO " . $localhost);
        $response = $read();
    }

    if ($username !== '' && $password !== '') {
        $write("AUTH LOGIN");
        $response = $read();
        if (substr($response, 0, 3) !== '334') {
            fclose($socket);
            return false;
        }

        $write(base64_encode($username));
        $response = $read();
        if (substr($response, 0, 3) !== '334') {
            fclose($socket);
            return false;
        }

        $write(base64_encode($password));
        $response = $read();
        if (substr($response, 0, 3) !== '235') {
            fclose($socket);
            return false;
        }
    }

    $write("MAIL FROM: <{$fromEmail}>");
    $response = $read();
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }

    $write("RCPT TO: <{$to}>");
    $response = $read();
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }

    $write("DATA");
    $response = $read();
    if (substr($response, 0, 3) !== '354') {
        fclose($socket);
        return false;
    }

    $headers = [
        'Date: ' . date('r'),
        'To: <' . $to . '>',
        'From: ' . sprintf('=?UTF-8?B?%s?= <%s>', base64_encode($fromName), $fromEmail),
        'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'X-Mailer: HR Shastri Lead Mailer',
    ];

    if ($replyToEmail !== '') {
        $headers[] = 'Reply-To: <' . $replyToEmail . '>';
    }

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.\r\n";
    $write($message);
    $response = $read();

    $write("QUIT");
    fclose($socket);

    return substr($response, 0, 3) === '250';
}

function render_lead_html(array $entry): string
{
    $subject = htmlspecialchars($entry['subject'] ?? 'Form Submission', ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($entry['name'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $company = htmlspecialchars($entry['company'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($entry['email'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($entry['phone'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $employees = htmlspecialchars($entry['employees'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $message = nl2br(htmlspecialchars($entry['message'] ?? 'None', ENT_QUOTES, 'UTF-8'));
    $date = date('d M Y, h:i A T');

    return <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New HR Shastri Lead</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f1f5f9;margin:0;padding:24px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#51459D;padding:28px 32px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px;">HR Shastri — New Lead Alert</h1>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">Someone submitted the website contact / trial form.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <div style="display:inline-block;background:#ede9fe;color:#51459D;padding:6px 14px;border-radius:20px;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:20px;">
                {$subject}
              </div>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:8px;border-collapse:separate;">
                <tr>
                  <td width="35%" style="padding:12px 16px;background:#f8fafc;font-size:13px;font-weight:600;color:#475569;border-bottom:1px solid #e2e8f0;">Full Name</td>
                  <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#0f172a;border-bottom:1px solid #e2e8f0;">{$name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;font-size:13px;font-weight:600;color:#475569;border-bottom:1px solid #e2e8f0;">Company Name</td>
                  <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">{$company}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;font-size:13px;font-weight:600;color:#475569;border-bottom:1px solid #e2e8f0;">Email Address</td>
                  <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-bottom:1px solid #e2e8f0;"><a href="mailto:{$email}" style="color:#51459D;text-decoration:none;font-weight:600;">{$email}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;font-size:13px;font-weight:600;color:#475569;border-bottom:1px solid #e2e8f0;">Phone Number</td>
                  <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-bottom:1px solid #e2e8f0;"><a href="tel:{$phone}" style="color:#51459D;text-decoration:none;font-weight:600;">{$phone}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;font-size:13px;font-weight:600;color:#475569;border-bottom:1px solid #e2e8f0;">Employee Count</td>
                  <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">{$employees}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;font-size:13px;font-weight:600;color:#475569;">Message / Requirements</td>
                  <td style="padding:12px 16px;font-size:14px;color:#334155;line-height:1.5;">{$message}</td>
                </tr>
              </table>

              <div style="margin-top:24px;text-align:center;">
                <a href="mailto:{$email}" style="background:#51459D;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;display:inline-block;margin-right:12px;">Reply to Lead</a>
                <a href="tel:{$phone}" style="background:#f1f5f9;color:#0f172a;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;display:inline-block;">Call {$phone}</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
              Submitted on {$date} via hrshastri.com website form.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

function render_lead_plain_text(array $entry): string
{
    $subject = $entry['subject'] ?? 'Form Submission';
    $name = $entry['name'] ?? 'N/A';
    $company = $entry['company'] ?? 'N/A';
    $email = $entry['email'] ?? 'N/A';
    $phone = $entry['phone'] ?? 'N/A';
    $employees = $entry['employees'] ?? 'N/A';
    $message = $entry['message'] ?? 'None';
    $date = date('d M Y, h:i A T');

    return <<<TEXT
=== NEW HR SHASTRI LEAD ===
Subject: {$subject}
Name: {$name}
Company: {$company}
Email: {$email}
Phone: {$phone}
Employees: {$employees}
Message: {$message}
Date: {$date}
===========================
TEXT;
}
