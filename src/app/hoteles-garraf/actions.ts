'use server'

export interface DemoRequestData {
  hotelName: string
  contactName: string
  email: string
  phone?: string
  hotelUrl?: string
}

export async function requestHotelDemo(data: DemoRequestData) {
  const { hotelName, contactName, email, phone, hotelUrl } = data

  if (!hotelName || !contactName || !email) {
    return { success: false, error: 'Nombre del hotel, contacto y email son obligatorios.' }
  }

  const payload = {
    lead_source: 'garraf-landing',
    hotel_nombre: hotelName,
    name: contactName,
    email,
    phone: phone || '',
    hotel_url: hotelUrl || '',
    timestamp: new Date().toISOString(),
  }

  const demoWebhook = process.env.N8N_DEMO_BUILDER_WEBHOOK_URL
  const generalWebhook = process.env.N8N_WEBHOOK_URL
  const demoToken = process.env.DEMO_BUILDER_SECRET || ''

  // demo_builder requiere hotel_url; solo se dispara cuando el visitante la provee.
  // Sin URL, el lead cae en el webhook general (o se ignora si tampoco está configurado).
  const webhookUrl = hotelUrl ? (demoWebhook || generalWebhook) : generalWebhook
  if (webhookUrl) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (demoToken) headers['x-demo-token'] = demoToken
    await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error('[garraf-landing] webhook error:', err)
    })
  }

  return { success: true }
}
