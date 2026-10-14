import crypto from 'node:crypto';
import fs from 'node:fs';

/**
 * Vercel Serverless Function for HR Shastri Contact & Demo Requests
 * Handles contact form submissions, stores leads, and sends notifications.
 */
export default async function handler(req, res) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    }
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request body' });
  }

  // Honeypot check
  if (body.website) {
    return res.status(200).json({ ok: true, id: 'hp_' + Date.now() });
  }

  const name = String(body.name || '').trim().slice(0, 120);
  const company = String(body.company || '').trim().slice(0, 160);
  const email = String(body.email || '').trim().slice(0, 160);
  const phone = String(body.phone || '').trim().slice(0, 40);
  const employees = String(body.employees || '').replace(/\D/g, '').slice(0, 20);
  const message = String(body.message || '').trim().slice(0, 2000);
  const subject = String(body.subject || 'General inquiry').trim().slice(0, 120);

  if (!name || !company || !email || !phone || !employees) {
    return res.status(422).json({ ok: false, error: 'Missing required fields' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ ok: false, error: 'Invalid email address' });
  }

  const entryId = crypto.randomBytes ? crypto.randomBytes(16).toString('hex') : Date.now().toString(16);
  const createdAt = new Date().toISOString();

  const entry = {
    id: entryId,
    created_at: createdAt,
    subject,
    name,
    company,
    email,
    phone,
    employees,
    message,
    status: 'new',
    ip: (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').toString().slice(0, 45),
    user_agent: (req.headers['user-agent'] || '').slice(0, 300),
  };

  // Log lead details to Vercel runtime logs
  console.log(`[HR SHASTRI LEAD] ID: ${entry.id} | Intent: ${subject} | ${name} from ${company} (${email}, ${phone}, ${employees} employees)`);

  // Try saving to temporary storage (cross-platform /tmp on Vercel)
  try {
    const os = await import('node:os');
    const path = await import('node:path');
    const tmpFile = path.join(os.tmpdir(), 'contact-submissions.json');
    let list = [];
    if (fs.existsSync(tmpFile)) {
      try {
        const raw = fs.readFileSync(tmpFile, 'utf8');
        list = JSON.parse(raw);
        if (!Array.isArray(list)) list = [];
      } catch {
        list = [];
      }
    }
    list.unshift(entry);
    fs.writeFileSync(tmpFile, JSON.stringify(list.slice(0, 200), null, 2), 'utf8');
  } catch (err) {
    console.warn('[HR SHASTRI] Temporary file storage not available:', err);
  }

  // Optional: Forward to remote webhook / PHP API if configured in environment variables
  if (process.env.REMOTE_LEADS_URL) {
    try {
      await fetch(process.env.REMOTE_LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (forwardErr) {
      console.warn('[HR SHASTRI] Failed to forward lead to REMOTE_LEADS_URL:', forwardErr);
    }
  }

  // Attempt Email Notification if SMTP credentials exist in environment variables
  const adminEmail = process.env.ADMIN_EMAIL || 'ketan@redsparkinfo.co.in';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT || 587);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailerModule = await import('nodemailer');
      const nodemailer = nodemailerModule.default || nodemailerModule;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%); padding: 24px 28px; color: #ffffff;">
            <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">HR Shastri · New Lead Received</h2>
            <p style="margin: 0; font-size: 13px; opacity: 0.9;">${escapeHtml(subject)} · Instant Notification</p>
          </div>
          <div style="padding: 24px 28px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; width: 140px; color: #64748b;">Full Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">Company Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${escapeHtml(company)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">Work Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">Phone Number</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${escapeHtml(phone)}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${escapeHtml(phone)}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">Employee Count</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0284c7;">${escapeHtml(employees)} Employees</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b; vertical-align: top;">Requirements</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Submitted At</td>
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">${createdAt}</td>
              </tr>
            </table>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"HR Shastri Leads" <${smtpUser}>`,
        to: adminEmail,
        replyTo: `"${name}" <${email}>`,
        subject: `[${subject} Lead] ${name} (${company})`,
        html: htmlBody,
        text: `New Lead from HR Shastri:\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nEmployees: ${employees}\nMessage: ${message}\nTime: ${createdAt}`,
      });
      console.log(`[HR SHASTRI] Email notification sent successfully to ${adminEmail}`);
    } catch (mailErr) {
      console.error('[HR SHASTRI] Error sending notification email via SMTP:', mailErr);
    }
  }

  return res.status(200).json({ ok: true, id: entryId });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
