import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  MessageSquare,
  Globe,
  Database,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

const CALENDAR_URL = 'https://calendar.app.google/iSajQABW249gqbvB9';

// Data for each service
const servicesData: Record<string, any> = {
  'agentes-ia': {
    title: 'Agentes IA de WhatsApp & Voz',
    subtitle: 'Atención 24/7 y cierre de ventas automático',
    description: 'Tus clientes exigen respuestas instantáneas, pero tú no puedes estar pegado al teléfono. Desarrollamos agentes conversacionales que responden audios, agendan citas y cierran ventas en piloto automático, mientras tú te enfocas en operar tu negocio.',
    icon: <MessageSquare size={48} className="text-[#00FF94]" />,
    color: '#00FF94',
    features: [
      'Respuestas en menos de 5 segundos, 24/7.',
      'Soporte multi-idioma automático.',
      'Integración directa con Google Calendar y tu CRM.',
      'Calificación de leads (solo te pasa los clientes reales).',
      'Gestión de objeciones basada en tu argumentario de ventas.',
    ],
    benefits: [
      { title: '0 Citas Perdidas', text: 'Rescata clientes que te escriben a las 3 de la madrugada.' },
      { title: 'Más Tiempo Libre', text: 'Olvídate de copiar y pegar el mismo mensaje 50 veces al día.' },
      { title: 'Escalabilidad', text: 'Atiende a 100 clientes a la vez sin despeinarte.' }
    ]
  },
  'desarrollo-web': {
    title: 'Desarrollo Web & Apps High-Ticket',
    subtitle: 'Portales premium optimizados para la conversión',
    description: 'Tu página web es tu vendedor más importante. Si tarda más de 3 segundos en cargar o parece de 2010, estás perdiendo clientes. Construimos ecosistemas digitales premium que proyectan autoridad y están diseñados con un único objetivo: convertir visitantes en clientes de alto valor.',
    icon: <Globe size={48} className="text-[#00C2FF]" />,
    color: '#00C2FF',
    features: [
      'Diseño UI/UX de vanguardia (adiós plantillas aburridas).',
      'Rendimiento perfecto (100/100 en Google Lighthouse).',
      'Arquitectura SEO avanzada para dominar tu ciudad.',
      'Animaciones fluidas y microinteracciones premium.',
      'Portales de cliente y dashboards a medida.',
    ],
    benefits: [
      { title: 'Autoridad Instantánea', text: 'Cobra más por tus servicios gracias a un posicionamiento premium.' },
      { title: 'SEO Dominante', text: 'Estructuras semánticas que Google adora.' },
      { title: 'Conversión Optimizada', text: 'Embudos diseñados para llevar al usuario directo a la venta.' }
    ]
  },
  'saas-reservas': {
    title: 'SaaS de Reservas & CRM',
    subtitle: 'Tu plataforma de gestión todo-en-uno',
    description: '¿Usas 4 programas distintos para llevar tu negocio? Consolida todo en un ecosistema unificado. Implementamos un sistema de reservas, pagos, facturación y seguimiento de clientes adaptado milimétricamente a tu operativa.',
    icon: <Database size={48} className="text-[#FFE600]" />,
    color: '#FFE600',
    features: [
      'Calendario inteligente multi-empleado y multi-sede.',
      'Pasarela de pagos automatizada (Stripe/RedSys).',
      'Fichas de clientes y seguimiento de historiales.',
      'Recordatorios automáticos por SMS y WhatsApp.',
      'Facturación a un clic y exportación para gestoría.',
    ],
    benefits: [
      { title: 'Adiós al Caos', text: 'Toda la información de tu negocio centralizada y accesible.' },
      { title: '0 No-Shows', text: 'Los recordatorios automáticos reducen las ausencias drásticamente.' },
      { title: 'Datos Financieros', text: 'Visualiza exactamente de dónde viene tu rentabilidad.' }
    ]
  },
  'rag-empresarial': {
    title: 'Sistemas RAG Corporativos',
    subtitle: 'El cerebro inteligente de tu empresa',
    description: '¿Tu equipo pierde horas buscando procedimientos, manuales o inventarios? Creamos un buscador inteligente con Inteligencia Artificial que ha leído todos los documentos de tu empresa y responde a cualquier pregunta técnica de tus empleados al instante y con referencias exactas.',
    icon: <Cpu size={48} className="text-blue-500" />,
    color: '#3B82F6',
    features: [
      'Búsqueda semántica en PDFs, Words y bases de datos.',
      'Integración con Slack, Teams o portal interno.',
      'Control estricto de accesos (quién ve qué).',
      'Responde a partir de tus propios documentos y, si no encuentra la respuesta, lo dice.',
      'Actualización en tiempo real al subir nuevos documentos.',
    ],
    benefits: [
      { title: 'Onboarding Flash', text: 'Los nuevos empleados resuelven sus dudas sin interrumpir a los veteranos.' },
      { title: 'Conocimiento Blindado', text: 'Si un empleado clave se va, el conocimiento se queda.' },
      { title: 'Productividad Extrema', text: 'De buscar en carpetas durante 20 minutos a encontrar la respuesta en 3 segundos.' }
    ]
  }
};

// Generar rutas estáticas
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

// Metadatos dinámicos SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData[params.slug];
  
  if (!service) {
    return { title: 'Servicio no encontrado | HecTechAi' };
  }
  
  return {
    title: `${service.title} | Soluciones IA en Sitges | HecTechAi`,
    description: service.description.substring(0, 160),
    openGraph: {
      title: `${service.title} - HecTechAi Automation`,
      description: service.description.substring(0, 160),
    }
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 selection:bg-[#00FF94] selection:text-black">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{ backgroundColor: service.color }}
        ></div>
        <div className="absolute inset-0 noise-bg opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-white transition-colors">Inicio</a>
          <span>/</span>
          <a href="/#servicios" className="hover:text-white transition-colors">Servicios</a>
          <span>/</span>
          <span style={{ color: service.color }}>{service.title}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest mb-6" style={{ color: service.color }}>
              Servicio Premium
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 font-display leading-[1.1]">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6">
              {service.subtitle}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {service.description}
            </p>
            
            <a 
              href={CALENDAR_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#00FF94] text-black px-8 py-4 rounded-xl font-black text-lg hover:bg-[#00cc76] transition-all glow-effect shadow-[0_10px_30px_rgba(0,255,148,0.3)]"
            >
              <Calendar size={20} />
              Auditoría Gratuita de Viabilidad
            </a>
            <p className="text-sm text-gray-500 mt-4">Reserva 15 min. Te diremos si esto aplica a tu negocio (y si no, también).</p>
          </div>
          
          <div className="relative">
            <div className="glass-card rounded-3xl p-12 border border-white/10 premium-border flex items-center justify-center min-h-[400px]">
              <div className="relative">
                <div className="absolute inset-0 blur-[60px] opacity-30" style={{ backgroundColor: service.color }}></div>
                <div className="relative z-10 w-32 h-32 bg-black/50 border border-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl">
                  {service.icon}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Funcionalidades Clave */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-display flex items-center gap-3">
              <Zap style={{ color: service.color }} /> 
              Lo que implementamos
            </h2>
            <div className="glass-card rounded-3xl p-8 border border-white/5 space-y-6">
              {service.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ color: service.color }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* El Resultado */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-display flex items-center gap-3">
              <TrendingUp style={{ color: service.color }} /> 
              El Resultado Directo
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {service.benefits.map((benefit: any, idx: number) => (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                  <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* CTA Final */}
        <div className="glass-card rounded-3xl p-12 text-center border relative overflow-hidden" style={{ borderColor: `${service.color}40` }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundColor: service.color }}></div>
          <div className="relative z-10">
            <ShieldCheck size={48} className="mx-auto mb-6" style={{ color: service.color }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">No hay precios cerrados. Todo es a medida.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              No vendemos "paquetes mágicos". Antes de darte un presupuesto, analizamos tu operativa de forma gratuita para asegurarnos de que la inversión tendrá un ROI claro para tu negocio.
            </p>
            <a 
              href={CALENDAR_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-xl font-black text-lg hover:scale-105 transition-transform"
            >
              Agendar Sesión de Diagnóstico <ArrowRight size={20} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
