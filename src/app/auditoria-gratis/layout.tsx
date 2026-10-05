import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hectechai.com'

export const metadata: Metadata = {
  title: 'Auditoría IA Gratis para tu Negocio de Hostelería | HecTechAi',
  description:
    'Cuéntanos tu caso y recibe al momento un preview con IA, y en minutos un informe completo por email: diagnóstico, oportunidades y plan de 30 días para tu hotel, restaurante o bar.',
  keywords: [
    'auditoría ia gratis',
    'auditoría digital hostelería',
    'automatización ia hoteles',
    'auditoría restaurante ia',
    'consultoría ia hostelería',
    'digitalización hotel gratis',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: `${BASE_URL}/auditoria-gratis`,
    title: 'Auditoría IA Gratis para tu Negocio de Hostelería | HecTechAi',
    description:
      'Cuéntanos tu caso y recibe un preview al momento + un informe completo por email con oportunidades y plan de 30 días.',
    siteName: 'HecTechAi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auditoría IA Gratis para tu Negocio de Hostelería | HecTechAi',
    description: 'Preview al momento + informe completo por email. Gratis.',
  },
  alternates: {
    canonical: `${BASE_URL}/auditoria-gratis`,
  },
}

export default function AuditoriaGratisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
