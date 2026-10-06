import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agencia de Automatización IA y Desarrollo Web | HecTechAi",
  description: "Automatización con IA para negocios locales del Garraf: agentes de WhatsApp y voz, recepcionistas virtuales y webs rápidas. Auditoría gratuita para medir cuántas horas puedes ahorrar.",
  keywords: [
    "agencia automatización IA",
    "agentes IA ventas",
    "recepcionista virtual IA",
    "desarrollo web premium",
    "automatizar mensajes whatsapp business",
    "chatbots para clínicas y restaurantes",
    "reducir costes operativos",
    "ahorrar tiempo en mi empresa",
    "crm automatizado",
    "agencia n8n españa",
    "sistemas ia para empresas Sitges",
    "automatizacion Sitges Garraf"
  ],
  authors: [{ name: "Héctor Barberá" }],
  creator: "HecTechAi Automation",
  publisher: "HecTechAi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hectechai.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://hectechai.com',
    title: 'Automatización Inteligente y Web Premium | HecTechAi',
    description: 'Delega el trabajo manual en nuestra IA y multiplica tus ventas 24/7. Auditoría gratuita.',
    siteName: 'HecTechAi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HecTechAi | Menos Operativa, Más Ventas',
    description: 'Automatizamos las tareas repetitivas de tu negocio con Inteligencia Artificial.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "HecTechAi Automation",
  "url": "https://hectechai.com",
  "logo": "https://hectechai.com/logo.png",
  "description": "Agencia de automatización con IA y desarrollo web high-ticket. Implementamos agentes IA de WhatsApp, recepcionistas virtuales de voz y automatización n8n.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sitges",
    "addressRegion": "Barcelona",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.2372",
    "longitude": "1.8105"
  },
  "areaServed": ["Sitges", "Garraf", "Barcelona", "España", "Internacional"],
  "priceRange": "$$",
  "email": "hectechia@gmail.com",
  "sameAs": [
    "https://instagram.com/hectechai"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Agentes IA de WhatsApp & Voz 24/7"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Desarrollo Web & Apps High-Ticket"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "SaaS de Reservas & CRM Integrado"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Consultoría & Auditorías IA"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Sistemas RAG para Empresas"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
