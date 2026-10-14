import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

const SITE = {
  name: 'HR Shastri',
  legalName: 'HRshastri',
  url: 'https://hrshastri.com',
  email: 'info@hrshastri.com',
  phone: '+91 915 707 5570',
  address: '5th Floor, Darshanam Oxypark, Vasna-Bhayli Main Road, Vadodara – 390007, Gujarat, India',
}

const NAV_LINKS_HTML = `
<nav aria-label="Main Navigation" style="padding:16px 24px;border-bottom:1px solid #e2e8f0;display:flex;flex-wrap:wrap;gap:20px;align-items:center;font-family:sans-serif;font-size:14px;">
  <a href="/" style="font-weight:700;color:#51459D;text-decoration:none;">HR Shastri</a>
  <a href="/features" style="color:#334155;text-decoration:none;">HRMS Features</a>
  <a href="/modules" style="color:#334155;text-decoration:none;">Workforce Modules</a>
  <a href="/pricing" style="color:#334155;text-decoration:none;">Pricing Plans</a>
  <a href="/faq" style="color:#334155;text-decoration:none;">FAQ</a>
  <a href="/about" style="color:#334155;text-decoration:none;">About Us</a>
  <a href="/contact" style="color:#51459D;font-weight:600;text-decoration:none;">Book Free Demo</a>
</nav>
`

const FOOTER_HTML = `
<footer style="margin-top:48px;padding:32px 24px;border-top:1px solid #e2e8f0;background:#f8fafc;font-family:sans-serif;font-size:14px;color:#475569;">
  <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
    <div>
      <h3 style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:8px;">HR Shastri HRMS Software</h3>
      <p style="line-height:1.6;margin:0;">Cloud-based Human Resource Management System built for Indian businesses to manage employees, attendance, leave, statutory payroll, recruitment, and mobile self-service.</p>
    </div>
    <div>
      <h3 style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:8px;">Explore HR Shastri</h3>
      <ul style="list-style:none;padding:0;margin:0;line-height:2;">
        <li><a href="/features" style="color:#51459D;text-decoration:none;">HRMS Features & Capabilities</a></li>
        <li><a href="/modules" style="color:#51459D;text-decoration:none;">Workforce Management Modules</a></li>
        <li><a href="/pricing" style="color:#51459D;text-decoration:none;">Plans & Headcount Pricing</a></li>
        <li><a href="/faq" style="color:#51459D;text-decoration:none;">HRMS FAQ & Support</a></li>
      </ul>
    </div>
    <div>
      <h3 style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:8px;">Contact & Headquarters</h3>
      <p style="line-height:1.6;margin:0 0 8px;">${SITE.address}</p>
      <p style="margin:0 0 4px;">Phone: <a href="tel:+919157075570" style="color:#51459D;text-decoration:none;">+91 915 707 5570</a></p>
      <p style="margin:0;">Email: <a href="mailto:info@hrshastri.com" style="color:#51459D;text-decoration:none;">info@hrshastri.com</a></p>
    </div>
    <div>
      <h3 style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:8px;">Legal & Security</h3>
      <ul style="list-style:none;padding:0;margin:0;line-height:2;">
        <li><a href="/privacy-policy" style="color:#51459D;text-decoration:none;">Privacy Policy</a></li>
        <li><a href="/terms-of-use" style="color:#51459D;text-decoration:none;">Terms of Use</a></li>
        <li><a href="/contact" style="color:#51459D;text-decoration:none;">Schedule a Consultation</a></li>
      </ul>
    </div>
  </div>
  <div style="max-width:1100px;margin:24px auto 0;padding-top:16px;border-top:1px solid #cbd5e1;text-align:center;font-size:13px;color:#64748b;">
    © 2026 HR Shastri (HRshastri). All rights reserved. Cloud HRMS Platform for Modern Companies.
  </div>
</footer>
`

const ROUTES = [
  {
    path: '/',
    outputPath: 'index.html',
    title: 'HRMS Software for Indian Businesses — Complete Employee Management System | HR Shastri',
    description:
      'HR Shastri is cloud HRMS software for Indian businesses to manage employees — attendance tracking, leave approvals, India-ready payroll (PF, ESI, TDS), recruitment, and mobile self-service. Book a free demo.',
    keywords:
      'HRMS software, employee management system, HR software India, payroll software India, attendance management system, leave management software, biometric attendance HRMS, workforce management system, employee self service app, buy HRMS software',
    canonical: 'https://hrshastri.com/',
    breadcrumbs: [{ name: 'Home', path: '/' }],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">HRMS Software for Indian Businesses — Complete Employee Management System</h1>
        <p style="font-size:17px;color:#334155;margin-bottom:24px;">HR Shastri is an all-in-one cloud Human Resource Management System (HRMS) engineered specifically for Indian businesses, SMEs, and growing enterprises looking to manage employees efficiently from hire to retire. Automate attendance tracking, leave management, statutory payroll processing (PF, ESI, TDS, PT), applicant tracking, performance reviews, and mobile employee self-service.</p>
        
        <div style="margin:24px 0;display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/contact" style="background:#51459D;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Book a Free Demo</a>
          <a href="/features" style="background:#f1f5f9;color:#0F172A;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Explore HRMS Features</a>
          <a href="/pricing" style="background:#f1f5f9;color:#0F172A;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">View Pricing Plans</a>
        </div>

        <section style="margin-top:36px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:12px;">Core Capabilities to Automate Workforce Management</h2>
          <p>Managing employees across branches, shifts, and remote locations requires a unified HR platform. HR Shastri eliminates spreadsheets and fragmented tools with an integrated suite of modules:</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:16px;">
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:18px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">1. Centralized Employee Database</h3>
              <p style="font-size:14px;color:#475569;">Maintain accurate employee profiles, emergency contacts, statutory IDs (Aadhaar, PAN, UAN), education records, and digital document vaults with role-based security.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:18px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">2. Attendance & Biometric Sync</h3>
              <p style="font-size:14px;color:#475569;">Real-time biometric device integration, GPS mobile geofencing attendance, flexible shift scheduling, night shift rules, overtime calculation, and late-mark tracking.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:18px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">3. Leave Management System</h3>
              <p style="font-size:14px;color:#475569;">Configurable leave policies (Casual, Sick, Earned, Maternity, Compensatory Off), automated leave balances, calendar view, and multi-tier manager approval workflows.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:18px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">4. India Statutory Payroll</h3>
              <p style="font-size:14px;color:#475569;">1-click payroll processing with automated Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and Tax Deducted at Source (TDS) calculations and payslip generation.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:18px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">5. Recruitment & Applicant Tracking (ATS)</h3>
              <p style="font-size:14px;color:#475569;">Streamline hiring from job requisition to candidate screening, interview feedback loops, offer letter generation, and automated new hire onboarding.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:18px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">6. Mobile Employee Self-Service (ESS)</h3>
              <p style="font-size:14px;color:#475569;">Empower employees with dedicated iOS and Android mobile apps for punch-in, leave requests, payslip downloads, expense claim submissions, and company announcements.</p>
            </article>
          </div>
        </section>

        <section style="margin-top:40px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:12px;">Why Indian Companies Choose HR Shastri as Their Primary HRMS</h2>
          <p>Trusted by companies across manufacturing, IT services, logistics, healthcare, and retail throughout India. With over 30+ HR domain specialists and 50+ enterprise deployments, HR Shastri delivers enterprise-grade reliability at transparent, affordable pricing.</p>
          <ul style="padding-left:20px;line-height:2;">
            <li><strong>Rapid 48-Hour Onboarding:</strong> Dedicated implementation specialists assist with historical employee data migration, biometric integration, and custom salary structure setup.</li>
            <li><strong>Bank-Grade 256-Bit SSL Security:</strong> Multi-tenant isolation, role-based access control (RBAC), and daily automated encrypted cloud backups protect your sensitive HR data.</li>
            <li><strong>Native Mobile Apps:</strong> HR Shastri mobile app available for download on Google Play Store and Apple App Store for real-time employee engagement on the move.</li>
            <li><strong>Local Customer Support:</strong> Responsive phone, email, and live support based in Vadodara, Gujarat, operating Monday through Saturday from 10:00 AM to 7:00 PM IST.</li>
          </ul>
        </section>

        <section style="margin-top:40px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:12px;">Frequently Asked Questions About HR Shastri HRMS</h2>
          <div style="border-top:1px solid #e2e8f0;padding-top:16px;">
            <h3 style="font-size:17px;color:#0F172A;margin-bottom:6px;">What is an HRMS system and why does my business need one?</h3>
            <p style="font-size:14px;color:#475569;margin-top:0;">A Human Resource Management System (HRMS) automates end-to-end employee administration — from hiring, daily biometric attendance, and leave requests to payroll computation and tax compliance. It saves up to 80% of HR admin time, prevents payroll calculation errors, and ensures full statutory compliance.</p>
          </div>
          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:16px;">
            <h3 style="font-size:17px;color:#0F172A;margin-bottom:6px;">Does HR Shastri handle Indian payroll compliance like PF, ESI, and TDS?</h3>
            <p style="font-size:14px;color:#475569;margin-top:0;">Yes. HR Shastri includes out-of-the-box support for Indian statutory compliance, including Employee Provident Fund (PF), Employee State Insurance (ESI), state-specific Professional Tax (PT), and TDS under both old and new income tax regimes. Generate compliance-ready reports with one click.</p>
          </div>
          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:16px;">
            <h3 style="font-size:17px;color:#0F172A;margin-bottom:6px;">How can we buy HR Shastri or schedule a live product demonstration?</h3>
            <p style="font-size:14px;color:#475569;margin-top:0;">You can schedule a free, live 1-on-1 walkthrough tailored to your company's headcount and requirements by visiting our <a href="/contact" style="color:#51459D;text-decoration:none;font-weight:600;">Contact & Demo Page</a> or calling +91 915 707 5570. We offer a 14-day free trial with no credit card required.</p>
          </div>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/features',
    outputPath: 'features/index.html',
    title: 'HRMS Software Features — Attendance, Leave, Payroll & Self-Service | HR Shastri',
    description:
      'Explore HR Shastri HRMS features: centralized employee database, biometric & geofence attendance, leave workflows, statutory Indian payroll, recruitment ATS, performance, and mobile self-service.',
    keywords:
      'HRMS features, attendance management software, leave tracking software, Indian payroll software, HR self service portal, HR software features, employee database system, geofencing attendance',
    canonical: 'https://hrshastri.com/features',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Features', path: '/features' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">HRMS Software Features — Attendance, Leave, Payroll & Self-Service</h1>
        <p style="font-size:17px;color:#334155;margin-bottom:24px;">Discover the complete suite of HR management features built into HR Shastri. From enterprise workforce administration to employee daily workflows, HR Shastri streamlines operations for companies across India.</p>
        
        <section style="margin-top:36px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:16px;">Comprehensive HRMS Feature Suite</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Employee Records Management</h3>
              <p style="font-size:14px;color:#475569;">Centralize all workforce information in one secure database. Store employee contracts, bank account details, emergency contacts, statutory IDs, past experience, and educational credentials with easy digital search and audit logging.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Geofenced Mobile & Biometric Attendance</h3>
              <p style="font-size:14px;color:#475569;">Track employee presence in real time across multiple offices, manufacturing plants, or remote job sites. Supports face recognition, biometric fingerprint machine sync, and mobile GPS geofencing with selfie validation.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Leave Management & Approvals</h3>
              <p style="font-size:14px;color:#475569;">Automate leave accruals, carry forwards, encashment, and applications. Configurable multi-level approval hierarchies allow managers to approve or reject leave requests in real time from mobile or web.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Statutory Indian Payroll Processing</h3>
              <p style="font-size:14px;color:#475569;">Execute monthly payroll in minutes with automatic attendance reconciliation, salary revisions, bonus and deduction calculations, and instant generation of encrypted PDF payslips and bank disbursement files.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Recruitment & Applicant Tracking (ATS)</h3>
              <p style="font-size:14px;color:#475569;">Manage job openings, parse incoming resumes, schedule interview rounds, collect interviewer evaluations, and issue customizable offer letters with pre-onboarding document uploads.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Expense Claims & Reimbursements</h3>
              <p style="font-size:14px;color:#475569;">Employees snap receipts with their smartphone and submit travel, meal, or client entertainment claims. Managers verify and finance teams disburse directly with monthly payroll.</p>
            </article>
          </div>
        </section>

        <section style="margin-top:40px;background:#f8fafc;padding:24px;border-radius:8px;border:1px solid #e2e8f0;">
          <h2 style="font-size:22px;color:#0F172A;margin-top:0;">Ready to Modernize Your Company's HR Operations?</h2>
          <p style="color:#475569;margin-bottom:16px;">Schedule a personalized 30-minute demonstration with our HR domain specialists to see how HR Shastri fits your organization.</p>
          <a href="/contact" style="background:#51459D;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Schedule Live Product Demo</a>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/modules',
    outputPath: 'modules/index.html',
    title: 'HRMS Modules — Complete Hire-to-Retire Workforce Management | HR Shastri',
    description:
      'Browse HR Shastri modules: employee records, biometric attendance, automated leave, PF/ESI payroll, recruitment ATS, performance appraisals, expense claims, and Android/iOS mobile app.',
    keywords:
      'HRMS modules, workforce management modules, HR payroll module, attendance module, leave management module, employee database system, recruitment software module',
    canonical: 'https://hrshastri.com/modules',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Modules', path: '/modules' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">HRMS Modules — Complete Hire-to-Retire Workforce Management</h1>
        <p style="font-size:17px;color:#334155;margin-bottom:24px;">Explore modular workforce management built to scale. Activate only the modules you need today and expand effortlessly as your company headcount grows.</p>

        <section style="margin-top:36px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:16px;">Integrated Human Resource Modules</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Employee Management Module</h3>
              <p style="font-size:14px;color:#475569;">Centralizes master personnel data, organizational hierarchies, reporting lines, asset allocation tracking (laptops, SIMs, IDs), and document management across all branches.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Attendance & Biometric Module</h3>
              <p style="font-size:14px;color:#475569;">Captures clock-in/out records through hardware biometric devices, QR codes, and GPS geofenced mobile apps with shift planning, grace periods, and automatic overtime computation.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Leave Management Module</h3>
              <p style="font-size:14px;color:#475569;">Supports customizable leave types, accrual rules, auto-deductions, holiday calendars per state, sandwich rules, and instant manager notification and approval pipelines.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Payroll & Compliance Module</h3>
              <p style="font-size:14px;color:#475569;">Automates salary structuring, attendance-linked pay, statutory PF, ESIC, PT, and TDS calculations, Form 16 generation, and single-click bank payment transfer files.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Recruitment & Onboarding Module</h3>
              <p style="font-size:14px;color:#475569;">Tracks candidate pipelines from application to hiring. Includes resume parsing, interview scheduling, offer letter generation, and zero-paper digital onboarding.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Mobile App (Android & iOS)</h3>
              <p style="font-size:14px;color:#475569;">Empowers employees with a user-friendly mobile experience for attendance marking, leave applications, expense claims, payslip downloads, and peer directory access.</p>
            </article>
          </div>
        </section>

        <section style="margin-top:40px;background:#f8fafc;padding:24px;border-radius:8px;border:1px solid #e2e8f0;">
          <h2 style="font-size:22px;color:#0F172A;margin-top:0;">Need Custom Module Configuration?</h2>
          <p style="color:#475569;margin-bottom:16px;">Our solution architects will analyze your branch structures, shift patterns, and payroll needs to configure the ideal setup.</p>
          <a href="/contact" style="background:#51459D;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Talk to an HRMS Specialist</a>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/pricing',
    outputPath: 'pricing/index.html',
    title: 'HRMS Software Pricing & Plans — Affordable for Indian SMEs & Enterprises | HR Shastri',
    description:
      'Compare HR Shastri HRMS pricing plans: Starter, Business, and Enterprise. Transparent pricing tailored for Indian companies with free setup and dedicated implementation support.',
    keywords:
      'HRMS software price, HR software cost India, HRMS pricing plans, affordable HRMS India, employee management software price, payroll software pricing',
    canonical: 'https://hrshastri.com/pricing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">HRMS Software Pricing & Plans — Affordable for Indian SMEs & Enterprises</h1>
        <p style="font-size:17px;color:#334155;margin-bottom:24px;">Simple, transparent, and predictable pricing designed to scale with your company's headcount. No hidden maintenance costs, free version updates, and dedicated onboarding assistance.</p>

        <section style="margin-top:36px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:16px;">Select the Right Plan for Your Organization</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
            <article style="border:2px solid #51459D;border-radius:12px;padding:24px;background:#ffffff;box-shadow:0 10px 25px -5px rgba(81,69,157,0.15);">
              <span style="background:#51459D;color:#ffffff;font-size:11px;padding:4px 8px;border-radius:4px;font-weight:700;text-transform:uppercase;">Recommended</span>
              <h3 style="font-size:18px;color:#0F172A;margin-top:10px;">Unlimited Plan with Monthly Invoice</h3>
              <p style="font-size:26px;font-weight:800;color:#0F172A;margin:8px 0 4px;">₹150 <span style="font-size:14px;font-weight:500;color:#64748b;">/ user / mo</span></p>
              <p style="font-size:12px;color:#64748b;margin:0 0 16px;">₹0 base · ₹150 per user with monthly invoicing</p>
              <div style="background:#f8fafc;padding:12px;border-radius:8px;font-size:13px;line-height:1.8;margin-bottom:16px;border:1px solid #f1f5f9;">
                <div>👥 Unlimited Users Capacity</div>
                <div>👤 Unlimited Employees Capacity</div>
                <div>📅 Billing Cycle: <strong>Monthly Invoice</strong></div>
              </div>
              <ul style="font-size:13px;color:#334155;padding-left:18px;line-height:1.8;">
                <li>Unlimited users & employee capacity</li>
                <li>Biometric & geofence attendance</li>
                <li>Leave management & workflows</li>
                <li>Indian payroll (PF, ESI, TDS, PT)</li>
                <li>Monthly consolidated invoice</li>
              </ul>
              <a href="/contact" style="display:block;text-align:center;background:#51459D;color:#ffffff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:18px;">Start Free Trial</a>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;background:#ffffff;">
              <span style="background:#e0e7ff;color:#4338ca;font-size:11px;padding:4px 8px;border-radius:4px;font-weight:700;text-transform:uppercase;">Points</span>
              <h3 style="font-size:18px;color:#0F172A;margin-top:10px;">Points Plan</h3>
              <p style="font-size:26px;font-weight:800;color:#0F172A;margin:8px 0 4px;">₹6,000 <span style="font-size:14px;font-weight:500;color:#64748b;">/ month</span></p>
              <p style="font-size:12px;color:#64748b;margin:0 0 16px;">Points plan is basic</p>
              <div style="background:#f8fafc;padding:12px;border-radius:8px;font-size:13px;line-height:1.8;margin-bottom:16px;border:1px solid #f1f5f9;">
                <div>👥 10 Users Capacity</div>
                <div>👤 50 Employees Capacity</div>
                <div>📅 Billing Cycle: <strong>Month</strong></div>
              </div>
              <ul style="font-size:13px;color:#334155;padding-left:18px;line-height:1.8;">
                <li>Up to 10 admin users capacity</li>
                <li>Up to 50 employees capacity</li>
                <li>Attendance & shift management</li>
                <li>Leave tracking workflows</li>
                <li>Standard payroll & payslips</li>
              </ul>
              <a href="/contact" style="display:block;text-align:center;background:#0F172A;color:#ffffff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:18px;">Choose Points Plan</a>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;background:#ffffff;">
              <span style="background:#e0e7ff;color:#4338ca;font-size:11px;padding:4px 8px;border-radius:4px;font-weight:700;text-transform:uppercase;">Yearly Plan</span>
              <h3 style="font-size:18px;color:#0F172A;margin-top:10px;">Yearly Plan</h3>
              <p style="font-size:26px;font-weight:800;color:#0F172A;margin:8px 0 4px;">₹10,000 <span style="font-size:14px;font-weight:500;color:#64748b;">/ year</span></p>
              <p style="font-size:12px;color:#64748b;margin:0 0 16px;">Annual small team package</p>
              <div style="background:#f8fafc;padding:12px;border-radius:8px;font-size:13px;line-height:1.8;margin-bottom:16px;border:1px solid #f1f5f9;">
                <div>👥 5 Users Capacity</div>
                <div>👤 5 Employees Capacity</div>
                <div>📅 Billing Cycle: <strong>Year</strong></div>
              </div>
              <ul style="font-size:13px;color:#334155;padding-left:18px;line-height:1.8;">
                <li>Up to 5 admin users capacity</li>
                <li>Up to 5 employees capacity</li>
                <li>12-month annual subscription</li>
                <li>Attendance & leave records</li>
                <li>Basic statutory payroll</li>
              </ul>
              <a href="/contact" style="display:block;text-align:center;background:#0F172A;color:#ffffff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:18px;">Choose Yearly Plan</a>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;background:#ffffff;">
              <span style="background:#e0e7ff;color:#4338ca;font-size:11px;padding:4px 8px;border-radius:4px;font-weight:700;text-transform:uppercase;">Monthly</span>
              <h3 style="font-size:18px;color:#0F172A;margin-top:10px;">Monthly Plan</h3>
              <p style="font-size:26px;font-weight:800;color:#0F172A;margin:8px 0 4px;">₹12,000 <span style="font-size:14px;font-weight:500;color:#64748b;">/ month</span></p>
              <p style="font-size:12px;color:#64748b;margin:0 0 16px;">Flexible monthly billing with higher capacity</p>
              <div style="background:#f8fafc;padding:12px;border-radius:8px;font-size:13px;line-height:1.8;margin-bottom:16px;border:1px solid #f1f5f9;">
                <div>👥 20 Users Capacity</div>
                <div>👤 100 Employees Capacity</div>
                <div>📅 Billing Cycle: <strong>Month</strong></div>
              </div>
              <ul style="font-size:13px;color:#334155;padding-left:18px;line-height:1.8;">
                <li>Up to 20 admin users capacity</li>
                <li>Up to 100 employees capacity</li>
                <li>Full attendance, leave & overtime</li>
                <li>Statutory payroll & PF/ESI/TDS</li>
                <li>Claims & reimbursements</li>
              </ul>
              <a href="/contact" style="display:block;text-align:center;background:#0F172A;color:#ffffff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:18px;">Choose Monthly Plan</a>
            </article>
          </div>
        </section>

        <section style="margin-top:40px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:12px;">Frequently Asked Questions About HRMS Pricing</h2>
          <div style="border-top:1px solid #e2e8f0;padding-top:16px;">
            <h3 style="font-size:17px;color:#0F172A;margin-bottom:6px;">Is there a free trial available?</h3>
            <p style="font-size:14px;color:#475569;margin-top:0;">Yes. We offer a 14-day full-access trial for companies to test attendance tracking, leave applications, and mobile workflows with their real workforce data. No credit card is required.</p>
          </div>
          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:16px;">
            <h3 style="font-size:17px;color:#0F172A;margin-bottom:6px;">Can we upgrade or add employee headcount at any time?</h3>
            <p style="font-size:14px;color:#475569;margin-top:0;">Yes. HR Shastri is fully flexible. As your business hires new team members or opens additional branch offices, your plan scales automatically without system downtime.</p>
          </div>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/faq',
    outputPath: 'faq/index.html',
    title: 'HRMS Software FAQ — Payroll, Biometric, Mobile App & Setup | HR Shastri',
    description:
      'Frequently asked questions about HR Shastri HRMS software: Indian statutory payroll compliance, biometric & mobile attendance, implementation timeline, data security, and multi-branch support.',
    keywords:
      'HRMS FAQ, HR software questions, payroll software FAQ, HRMS implementation India, biometric attendance questions, cloud HRMS security',
    canonical: 'https://hrshastri.com/faq',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">HRMS Software FAQ — Answers for HR, Finance & Leadership</h1>
        <p style="font-size:17px;color:#334155;margin-bottom:24px;">Got questions about implementing HRMS software for your company? Here are detailed answers on features, security, Indian statutory compliance, and mobile setup.</p>

        <section style="margin-top:36px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:16px;">Frequently Asked Questions</h2>
          <div style="space-y:20px;">
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:16px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">What is an HRM / HRMS system?</h3>
              <p style="font-size:14px;color:#475569;">A Human Resource Management System (HRMS) is integrated software that digitizes and automates core HR processes: maintaining employee databases, tracking biometric attendance, managing leave applications, processing payroll with statutory taxes (PF, ESI, TDS), and conducting performance reviews.</p>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:16px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">How does HR Shastri support Indian statutory payroll compliance?</h3>
              <p style="font-size:14px;color:#475569;">HR Shastri has built-in automated rules for Indian statutory compliance, including Employee Provident Fund (PF), Employee State Insurance (ESI), state-wise Professional Tax (PT), and Tax Deducted at Source (TDS) under old and new income tax regimes. Generate compliance registers and challan upload files with a single click.</p>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:16px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Can employees mark attendance via mobile app and biometric machines?</h3>
              <p style="font-size:14px;color:#475569;">Yes. HR Shastri connects seamlessly with physical biometric fingerprint and face recognition devices across multiple locations, while field or remote employees can clock in using the iOS/Android mobile app with GPS geofencing and optional selfie capture.</p>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:16px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">How long does implementation take?</h3>
              <p style="font-size:14px;color:#475569;">Most small to medium companies are fully operational on HR Shastri within 2 to 5 business days. Our dedicated technical onboarding team assists with data import from spreadsheets or legacy software, salary master setup, and employee training.</p>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:16px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">How secure is our company's confidential employee and payroll data?</h3>
              <p style="font-size:14px;color:#475569;">HR Shastri uses 256-bit SSL encryption for data in transit and at rest, multi-tenant database isolation, strict role-based access control (RBAC), and automated daily cloud backups hosted in secure, certified data centers.</p>
            </article>

            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:16px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Does HR Shastri support multiple legal entities or branch locations?</h3>
              <p style="font-size:14px;color:#475569;">Yes. HR Shastri provides multi-company and multi-branch management within a single administrative console, allowing corporate group headquarters to oversee branch-wise attendance, leave policies, and payroll separately.</p>
            </article>
          </div>
        </section>

        <section style="margin-top:40px;background:#f8fafc;padding:24px;border-radius:8px;border:1px solid #e2e8f0;">
          <h2 style="font-size:22px;color:#0F172A;margin-top:0;">Have a Specific Question?</h2>
          <p style="color:#475569;margin-bottom:16px;">Speak directly with our team in Vadodara, Gujarat. We are ready to answer your questions and guide your HRMS migration.</p>
          <a href="/contact" style="background:#51459D;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Contact Our HR Experts</a>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/about',
    outputPath: 'about/index.html',
    title: 'About HR Shastri — Cloud HRMS Software Company in Vadodara, India | HR Shastri',
    description:
      'Learn about HR Shastri: 30+ HR experts with over a decade of domain experience building cloud HRMS software for 50+ companies across India from Vadodara, Gujarat.',
    keywords:
      'about HR Shastri, HRMS software company India, HR software provider Vadodara Gujarat, HR tech company India, workforce software creators',
    canonical: 'https://hrshastri.com/about',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">About HR Shastri — Modern Cloud HRMS Platform</h1>
        <p style="font-size:17px;color:#334155;margin-bottom:24px;">HR Shastri was created by a dedicated team of over 30+ HR domain specialists with more than a decade of hands-on experience solving real workforce management, payroll, and compliance challenges for Indian businesses.</p>

        <section style="margin-top:36px;">
          <h2 style="font-size:24px;color:#0F172A;margin-bottom:12px;">Who We Are & What We Stand For</h2>
          <p>Headquartered in Vadodara, Gujarat, HR Shastri has served over 50+ corporate clients across manufacturing, financial services, healthcare, logistics, and technology sectors throughout India. Our mission is to democratize enterprise-grade Human Resource Management Systems (HRMS), making powerful workforce automation accessible, reliable, and cost-effective for companies of all sizes.</p>
          
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-top:24px;">
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">In Sync</h3>
              <p style="font-size:14px;color:#475569;">Seamlessly integrating payroll, attendance, leave, and personnel records to eliminate administrative friction and data silos.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Frugal & Scalable</h3>
              <p style="font-size:14px;color:#475569;">Providing premium enterprise-level capabilities at fair, transparent pricing that grows with your organization's employee count.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Adaptable</h3>
              <p style="font-size:14px;color:#475569;">Constantly evolving our software with regular feature updates reflecting changing Indian labor statutory regulations and modern mobile workflows.</p>
            </article>
            <article style="border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
              <h3 style="font-size:18px;color:#51459D;margin-top:0;">Customer Delight</h3>
              <p style="font-size:14px;color:#475569;">Delivering responsive customer onboarding and personalized ongoing technical support from experienced HR professionals.</p>
            </article>
          </div>
        </section>

        <section style="margin-top:40px;background:#f8fafc;padding:24px;border-radius:8px;border:1px solid #e2e8f0;">
          <h2 style="font-size:22px;color:#0F172A;margin-top:0;">Partner With Us for Your HR Transformation</h2>
          <p style="color:#475569;margin-bottom:16px;">Whether you employ 25 or 5,000 staff members, HR Shastri delivers the tools your business needs to succeed.</p>
          <a href="/contact" style="background:#51459D;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Schedule a Conversation</a>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/contact',
    outputPath: 'contact/index.html',
    title: 'Contact HR Shastri — Book a Live Demo & Free HRMS Trial | HR Shastri',
    description:
      'Contact HR Shastri to schedule a live product demo or start a free 14-day trial. Reach our Vadodara headquarters at +91 915 707 5570 or info@hrshastri.com.',
    keywords:
      'contact HR Shastri, book HRMS demo, HR software free trial, HRMS sales enquiry, HR Shastri Vadodara office, hire HRMS software',
    canonical: 'https://hrshastri.com/contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">Contact HR Shastri — Book a Live Demo & Free Trial</h1>
        <p style="font-size:17px;color:#334155;margin-bottom:24px;">Connect with our HR solutions team to see how HR Shastri can streamline your employee management, attendance tracking, and statutory payroll. We offer personalized demonstrations and 14-day full trials.</p>

        <section style="margin-top:36px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
          <article style="border:1px solid #e2e8f0;border-radius:8px;padding:24px;">
            <h2 style="font-size:20px;color:#51459D;margin-top:0;">Corporate Headquarters</h2>
            <p style="color:#475569;margin-bottom:12px;"><strong>Address:</strong><br>${SITE.address}</p>
            <p style="color:#475569;margin-bottom:12px;"><strong>Phone:</strong><br><a href="tel:+919157075570" style="color:#51459D;text-decoration:none;">+91 915 707 5570</a></p>
            <p style="color:#475569;margin-bottom:12px;"><strong>Email:</strong><br><a href="mailto:info@hrshastri.com" style="color:#51459D;text-decoration:none;">info@hrshastri.com</a></p>
            <p style="color:#475569;margin-bottom:0;"><strong>Operating Hours:</strong><br>Monday to Saturday: 10:00 AM – 7:00 PM IST</p>
          </article>

          <article style="border:1px solid #e2e8f0;border-radius:8px;padding:24px;background:#f8fafc;">
            <h2 style="font-size:20px;color:#0F172A;margin-top:0;">Why Schedule a Live Walkthrough?</h2>
            <ul style="font-size:14px;color:#475569;padding-left:20px;line-height:2;">
              <li>See how attendance from biometric machines & mobile geofencing syncs in real time.</li>
              <li>Learn how Indian payroll (PF, ESI, TDS) is calculated with 100% accuracy.</li>
              <li>Evaluate the employee self-service mobile app on iOS and Android.</li>
              <li>Receive transparent pricing matching your exact employee count and branch structure.</li>
            </ul>
          </article>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/privacy-policy',
    outputPath: 'privacy-policy/index.html',
    title: 'Privacy Policy — HR Shastri HRMS Platform',
    description:
      'Privacy Policy for HR Shastri (hrshastri.com): how we collect, store, process, and protect your company and employee information.',
    keywords: 'HR Shastri privacy policy, HRMS data protection, employee data privacy',
    canonical: 'https://hrshastri.com/privacy-policy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">Privacy Policy — HR Shastri HRMS Platform</h1>
        <p style="font-size:15px;color:#64748b;margin-bottom:24px;">Last updated: October 2026. This Privacy Policy outlines our commitments regarding data collection, protection, and security on hrshastri.com.</p>
        
        <section style="margin-top:24px;">
          <h2 style="font-size:20px;color:#0F172A;">1. Who We Are</h2>
          <p style="color:#475569;">HR Shastri (hrshastri.com) is a workforce management and HRMS software platform operated from Vadodara, Gujarat, India. We are committed to protecting personal and corporate data entrusted to us by client organizations and website visitors.</p>
        </section>

        <section style="margin-top:24px;">
          <h2 style="font-size:20px;color:#0F172A;">2. Information We Collect</h2>
          <p style="color:#475569;">When you request a product demo, contact our team, or create an account, we may collect your name, business email, organization name, telephone number, and employee headcount to serve your inquiry accurately.</p>
        </section>

        <section style="margin-top:24px;">
          <h2 style="font-size:20px;color:#0F172A;">3. Data Security & Storage</h2>
          <p style="color:#475569;">We implement industry-standard 256-bit SSL encryption, restricted access controls, and secure database hosting to prevent unauthorized access, alteration, or disclosure of data.</p>
        </section>

        <section style="margin-top:24px;">
          <h2 style="font-size:20px;color:#0F172A;">4. Contact Regarding Privacy</h2>
          <p style="color:#475569;">For questions regarding this privacy policy or your data rights, please contact info@hrshastri.com or call +91 915 707 5570.</p>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
  {
    path: '/terms-of-use',
    outputPath: 'terms-of-use/index.html',
    title: 'Terms of Use — HR Shastri HRMS Platform',
    description:
      'Terms of Use and conditions for using the HR Shastri website, services, and software platform.',
    keywords: 'HR Shastri terms of use, HRMS service agreement, terms and conditions',
    canonical: 'https://hrshastri.com/terms-of-use',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Use', path: '/terms-of-use' },
    ],
    content: `
      <header>${NAV_LINKS_HTML}</header>
      <main style="max-width:1100px;margin:32px auto;padding:0 24px;font-family:sans-serif;color:#1e293b;line-height:1.7;">
        <h1 style="font-size:32px;line-height:1.25;color:#0F172A;margin-bottom:16px;">Terms of Use — HR Shastri HRMS Platform</h1>
        <p style="font-size:15px;color:#64748b;margin-bottom:24px;">Last updated: October 2026. Conditions for using the HR Shastri website and associated marketing resources.</p>

        <section style="margin-top:24px;">
          <h2 style="font-size:20px;color:#0F172A;">1. Acceptance of Terms</h2>
          <p style="color:#475569;">By accessing and browsing hrshastri.com, you agree to these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, please do not use this site.</p>
        </section>

        <section style="margin-top:24px;">
          <h2 style="font-size:20px;color:#0F172A;">2. Website Content & Intellectual Property</h2>
          <p style="color:#475569;">All materials, logos, product screenshots, graphics, and text contained on this website are protected by applicable intellectual property and copyright laws. Unauthorized reproduction or redistribution is prohibited.</p>
        </section>

        <section style="margin-top:24px;">
          <h2 style="font-size:20px;color:#0F172A;">3. Software Subscriptions</h2>
          <p style="color:#475569;">Use of the HR Shastri HRMS software platform and mobile application is governed by separate Master Service Agreements (MSA) executed between HR Shastri and client organizations.</p>
        </section>
      </main>
      ${FOOTER_HTML}
    `,
  },
]

function prerender() {
  const indexHtmlPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`Dist index.html not found at ${indexHtmlPath}. Run vite build first.`)
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8')

  console.log(`Starting SEO pre-rendering for ${ROUTES.length} routes...`)

  for (const route of ROUTES) {
    const fullOutputPath = path.join(distDir, route.outputPath)
    const outDir = path.dirname(fullOutputPath)
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }

    let html = baseHtml

    // Update <title>
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)

    // Update <meta name="description">
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${route.description}" />`,
    )

    // Update canonical if present, or inject before </head>
    if (html.includes('rel="canonical"')) {
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${route.canonical}" />`)
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${route.canonical}" />\n</head>`)
    }

    // Inject keywords meta tag
    if (route.keywords && !html.includes('name="keywords"')) {
      html = html.replace('</head>', `  <meta name="keywords" content="${route.keywords}" />\n</head>`)
    }

    // Inject or update OpenGraph and Twitter tags
    html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${route.title}" />`)
    html = html.replace(
      /<meta\s+property=["']og:description["'][^>]*>/i,
      `<meta property="og:description" content="${route.description}" />`,
    )
    html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${route.canonical}" />`)
    html = html.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${route.title}" />`)
    html = html.replace(
      /<meta\s+name=["']twitter:description["'][^>]*>/i,
      `<meta name="twitter:description" content="${route.description}" />`,
    )

    // Breadcrumb JSON-LD schema
    if (route.breadcrumbs && route.breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: route.breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${SITE.url}${crumb.path}`,
        })),
      }
      html = html.replace(
        '</head>',
        `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n</head>`,
      )
    }

    // Keep #root completely clean so React mounts cleanly with zero content leaking after the footer
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>')

    fs.writeFileSync(fullOutputPath, html, 'utf8')
    console.log(`Pre-rendered: ${route.path} -> ${route.outputPath}`)
  }

  console.log('Static pre-rendering completed successfully.')
}

prerender()
