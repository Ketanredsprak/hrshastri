export const SITE = {
  name: 'HR Shastri',
  legalName: 'HRshastri',
  tagline: 'Resource Management System',
  url: 'https://hrshastri.com',
  email: 'info@hrshastri.com',
  phone: '+91 915 707 5570',
  phoneHref: 'tel:+919157075570',
  whatsappUrl: 'https://wa.me/919157075570',
  address:
    '5th Floor, Darshanam Oxypark, Vasna-Bhayli Main Road, Vadodara – 390007, Gujarat, India',
  hours: 'Monday - Saturday 10AM to 7PM IST',
  loginUrl: 'https://app.hrshastri.com',
  demoUrl: '/contact?intent=demo',
  trialUrl: '/contact?intent=trial',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.redspark.hrshastri&hl=en_IN',
  appStoreUrl: 'https://apps.apple.com/us/app/hr-shastri/id6454792117',
} as const

export const SOCIAL = {
  facebook: 'https://www.facebook.com/people/HRshastri/61551775772202/',
  twitter: 'https://x.com/HrShastrii',
  instagram: 'https://www.instagram.com/hrshastrii/',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Modules', href: '/modules' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export const ANNOUNCEMENTS = [
  'Book a free personalized demo with our HR experts',
  'New: Advanced geofencing attendance & WFH workflows',
  'Start your free trial — setup in minutes',
] as const
