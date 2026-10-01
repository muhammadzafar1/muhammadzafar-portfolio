const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

export async function sendContactEmail({ name, email, subject, message }) {
  const apiKey = process.env.RESEND_API_KEY
  const mailFrom = process.env.MAIL_FROM
  const mailTo = process.env.MAIL_TO

  if (!apiKey || !mailFrom || !mailTo) {
    throw new Error('RESEND_API_KEY, MAIL_FROM, and MAIL_TO must be configured.')
  }

  const safeName = escapeHtml(name ?? '')
  const safeEmail = escapeHtml(email ?? '')
  const safeSubject = escapeHtml(subject ?? '')
  const safeMessage = escapeHtml(message ?? '')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [mailTo],
        reply_to: email,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `
          <h2>New message from ${safeName}</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div>
            <p><strong>Message:</strong></p>
            <p>${safeMessage.replace(/\n/g, '<br />')}</p>
          </div>
        `
      }),
      signal: controller.signal
    })

    const responseText = await response.text()
    if (!response.ok) {
      throw new Error(responseText || `Resend request failed with status ${response.status}`)
    }

    return responseText
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Email provider timed out after 8 seconds.')
    }

    throw error
  } finally {
    clearTimeout(timer)
  }
}
