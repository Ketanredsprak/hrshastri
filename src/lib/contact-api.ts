const SUBMIT_PATH = '/api/contact-submit.php'

export type ContactPayload = {
  name: string
  company: string
  email: string
  phone: string
  employees: string
  message: string
  subject: string
  website?: string
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const response = await fetch(SUBMIT_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error ?? 'Could not send your message. Please try again or call us.')
  }
}
