import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hectechai.com'

export const metadata: Metadata = {
  title: 'Chatbot 24/7 para Hoteles del Garraf | HecTechAi',
  description:
    'Tu hotel responde en inglés, alemán y catalán a las 3 de la mañana. Sin contratar a nadie. Chatbot IA para hoteles boutique del Garraf — demo gratis.',
  keywords: [
    'chatbot hotel garraf',
    'automatización hostelería sitges',
    'chatbot whatsapp hotel',
    'atención al cliente hotel 24 horas',
    'chatbot multiidioma hotel',
    'ia para hoteles boutique',
    'automatización hotel sitges garraf',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: `${BASE_URL}/hoteles-garraf`,
    title: 'Chatbot 24/7 para Hoteles del Garraf | HecTechAi',
    description:
      'Tu hotel responde en inglés, alemán y catalán a las 3 de la mañana. Sin contratar a nadie. Demo gratis.',
    siteName: 'HecTechAi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chatbot 24/7 para hoteles del Garraf | HecTechAi',
    description: 'Responde WhatsApp en 4 idiomas a las 3am. Sin contratar a nadie. Demo gratis.',
  },
  alternates: {
    canonical: `${BASE_URL}/hoteles-garraf`,
  },
}

export default function HotelesGarrafLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
