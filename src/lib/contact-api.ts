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
  const customUrl = (import.meta.env.VITE_CONTACT_API_URL as string | undefined)?.trim()
  const endpoints = [
    ...(customUrl ? [customUrl] : []),
    '/api/contact-submit.php',
    '/api/contact-submit',
  ]

  let lastError: string | null = null

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const contentType = response.headers.get('content-type') || ''
      // If server returned HTML (e.g. static index.html or 404 page), try next endpoint
      if (!contentType.includes('application/json')) {
        continue
      }

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean
        error?: string
      } | null

      if (response.ok && data?.ok) {
        return // Successfully submitted!
      }

      if (data?.error) {
        lastError = data.error
      }
    } catch (err) {
      if (err instanceof Error) {
        lastError = err.message
      }
    }
  }

  throw new Error(lastError || 'Could not send your message. Please try again or call us.')
}

