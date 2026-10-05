import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  ArrowRight,
  Target,
  ShieldCheck,
  CheckCircle2,
  Zap,
  TrendingUp
} from 'lucide-react';
import { HeroChatbot } from '../../ui/components/HeroChatbot';

const CALENDAR_URL = 'https://calendar.app.google/iSajQABW249gqbvB9';

interface SectorInfo {
  name: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  roiStat: string;
  roiLabel: string;
  painPoints: string[];
  solutions: string[];
  color: string;
}

const sectorData: Record<string, SectorInfo> = {
  'restaurantes': {
    name: 'Restaurantes y Gastronomía',
    badge: 'Hostelería Garraf & Sitges',
    title: 'Multiplica las Reservas Directas de tu Restaurante',
    subtitle: 'Asistente IA 24/7 en WhatsApp e Instagram que gestiona reservas, carta y alérgenos sin comisiones abusivas.',
    description: 'Durante el servicio de comidas no puedes atender llamadas ni contestar DMs de Instagram. Nuestra IA gestiona tus reservas en segundos, sincroniza tu sala en tiempo real y erradica los "no-shows" con confirmaciones automáticas.',
    roiStat: '+1.325€/mes',
    roiLabel: 'Margen recuperado al eliminar comisiones de portales y cancelaciones',
    painPoints: [
      'Llamadas y DMs perdidos durante las horas pico de sala.',
      'Comisiones de hasta el 20% a plataformas y portales de reservas.',
      'Mesas vacías por cancelaciones de última hora sin previo aviso.',
    ],
    solutions: [
      'Reserva 100% automatizada vía WhatsApp con sincronización instantánea.',
      'Recordatorio 2h antes por WhatsApp con botón de reconfirmación en 1 clic.',
      'Carta digital interactiva con respuesta inteligente de alérgenos e idiomas.',
    ],
    color: '#00FF85'
  },
  'clinicas': {
    name: 'Clínicas y Salud',
    badge: 'Sector Sanitario y Dental',
    title: 'IA y Automatización para Clínicas Médicas y Dentales',
    subtitle: 'Recepcionistas Virtuales que atienden 24/7, agendan citas y eliminan las pérdidas por ausencias.',
    description: 'En el sector salud, una llamada comunicando es un paciente que acude a la competencia. Nuestro sistema automatiza el agendamiento, filtra urgencias y envía recordatorios inteligentes para blindar tu agenda.',
    roiStat: '+1.250€/mes',
    roiLabel: 'ROI medio estimado recuperando 8 citas perdidas al mes',
    painPoints: [
      'Líneas telefónicas saturadas en recepción a primera hora de la mañana.',
      'Pacientes que no se presentan (No-Shows) costando más de 200€ por hueco.',
      'Dependencia y comisiones recurrentes a directorios médicos tipo Doctoralia.',
    ],
    solutions: [
      'Asistente de WhatsApp que agenda, cambia o cancela citas 24 horas al día.',
      'Recordatorio preventivo con confirmación activa y lista de espera automática.',
      'Portal web propio ultrarrápido con posicionamiento local SEO prioritario.',
    ],
    color: '#00D4FF'
  },
  'clinicas-dentales': {
    name: 'Clínicas Dentales',
    badge: 'Especial Odontología',
    title: 'El Sistema de Citas Inteligente para Clínicas Dentales',
    subtitle: 'Elimina los huecos vacíos en gabinete y capta primeras visitas sin comisiones.',
    description: 'Diseñado específicamente para gabinetes odontológicos en Sitges y Garraf. Nuestro asistente responde dudas de implantes, ortodoncia o urgencias y agenda la primera valoración directamente en tu calendario.',
    roiStat: '+1.800€/mes',
    roiLabel: 'Valor generado en primeras visitas y fidelización de revisiones anuales',
    painPoints: [
      'Huecos caros en sillón dental por cancelaciones imprevistas.',
      'Personal de recepción sobrecargado entre atender pacientes y el teléfono.',
      'Fuga de pacientes que buscan cita fuera del horario de clínica.',
    ],
    solutions: [
      'Agendado automático de revisiones, limpiezas y primeras consultas.',
      'Recordatorios de seguimiento y avisos de recall de mantenimiento dental.',
      'Triaje de urgencias dentales con derivación directa al doctor de guardia.',
    ],
    color: '#00D4FF'
  },
  'estetica': {
    name: 'Estética, Spas y Belleza',
    badge: 'Wellness & Salones',
    title: 'Llena tu Agenda de Tratamientos y Elimina Comisiones de Treatwell',
    subtitle: 'Bot de WhatsApp y pasarela de fianza para garantizar la asistencia a cada manicura, masaje o tratamiento.',
    description: 'Deja de regalar hasta el 25% de cada tratamiento a marketplaces de terceros. Convierte tus seguidores de Instagram y contactos de Google Maps en clientas recurrentes con reserva inmediata por WhatsApp.',
    roiStat: '+890€/mes',
    roiLabel: 'Beneficio neto adicional al captar clientas directas y cobrar depósitos',
    painPoints: [
      'Clientas que reservan y no aparecen a su tratamiento.',
      'Comisiones asfixiantes en plataformas de reserva intermediarias.',
      'Horas contestando mensajes de WhatsApp sobre precios y disponibilidad.',
    ],
    solutions: [
      'Cobro de depósitos o fianzas en 1 toque con Apple Pay / Bizum / Tarjeta.',
      'Venta y reserva automática de bonos de tratamiento recurrentes.',
      'Asistente 24/7 que muestra fotos del catálogo de manicura, pestañas y estética.',
    ],
    color: '#EC4899'
  },
  'centros-estetica': {
    name: 'Centros de Belleza y Estética Avanzada',
    badge: 'Estética Avanzada',
    title: 'Automatización y Reservas para Centros de Belleza',
    subtitle: 'Captación directa y blindaje de agenda con depósitos automáticos.',
    description: 'Optimiza la operativa de tu salón o clínica estética. Olvídate del estrés de responder mensajes a deshoras y maximiza la ocupación de tus cabinas.',
    roiStat: '+950€/mes',
    roiLabel: 'Ahorro en comisiones y rescate de citas canceladas',
    painPoints: [
      'Altas tasas de no-show en tratamientos de alto valor.',
      'Pérdida de clientes en fines de semana por falta de respuesta rápida.',
      'Dificultad para fidelizar y vender paquetes de sesiones completas.',
    ],
    solutions: [
      'Agente WhatsApp que responde al instante y agenda según cabinas disponibles.',
      'Recordatorios con instrucciones previas al tratamiento.',
      'Campañas automáticas de felicitación y reactivación a los 30 días.',
    ],
    color: '#EC4899'
  },
  'hoteles': {
    name: 'Hoteles y Apartamentos Turísticos',
    badge: 'Hospitality & Luxury',
    title: 'Conserje Virtual 24/7 y Reservas Directas sin Comisiones de OTAs',
    subtitle: 'Atención 5 estrellas a huéspedes en 12 idiomas vía WhatsApp y Voice AI.',
    description: 'Transforma la estancia de tus huéspedes desde el pre-checkin hasta la salida. Resuelve dudas de Wi-Fi, traslados, parking y recomendaciones locales sin saturar la recepción.',
    roiStat: '+2.490€/mes',
    roiLabel: 'Ahorro en turnos nocturnos y aumento de venta directa de extras',
    painPoints: [
      'Saturación en mostrador con preguntas repetitivas sobre Wi-Fi o llaves.',
      'Barreras de idioma con turistas internacionales en temporada alta.',
      'Altas comisiones pagadas a Booking y Airbnb por falta de reservas directas.',
    ],
    solutions: [
      'Conserje IA multilingüe 24/7 en WhatsApp (Check-in, Wi-Fi, Room Service).',
      'Up-selling automático de late check-out, desayunos y experiencias locales.',
      'Gestión automática de partes de viajeros y recogida de DNI con OCR.',
    ],
    color: '#A855F7'
  },
  'hoteles-villas': {
    name: 'Hoteles Boutique y Villas Vacacionales',
    badge: 'Turismo Sitges & Costa',
    title: 'Conserje Inteligente para Villas y Alojamientos Boutique',
    subtitle: 'Eleva la experiencia del huésped de lujo sin necesidad de personal 24h in situ.',
    description: 'Diseñado para propietarios y gestores de villas vacacionales en Sitges y Garraf. Atención premium inmediata para turistas de alto ticket.',
    roiStat: '+3.100€/mes',
    roiLabel: 'Upselling de servicios extra y optimización de gestión operativa',
    painPoints: [
      'Llamadas a deshoras por incidencias menores de aire acondicionado o claves.',
      'Gestión manual caótica de check-ins y depósitos de fianza.',
      'Pérdida de ingresos por no ofrecer servicios adicionales durante la estancia.',
    ],
    solutions: [
      'Acceso instantáneo con guía digital interactiva de la villa.',
      'Canal VIP para reserva de chefs privados, traslados y reservas de ocio.',
      'Protocolo de triaje urgente que solo avisa al gestor si hay emergencia real.',
    ],
    color: '#A855F7'
  },
  'inmobiliarias': {
    name: 'Inmobiliarias y Real Estate',
    badge: 'Agencias Inmobiliarias',
    title: 'Automatización Inteligente para Inmobiliarias en Sitges y Garraf',
    subtitle: 'Atiende leads en <30 segundos, filtra compradores solventes y agenda visitas.',
    description: 'Si tardas más de 5 minutos en responder a un lead de Idealista o Fotocasa, el comprador ya ha contactado con otra agencia. Nuestra IA responde, cualifica presupuesto y agenda la visita en tu Google Calendar.',
    roiStat: '+1.900€/mes',
    roiLabel: 'Horas comerciales recuperadas y mayor ratio de cierre en visitas cualificadas',
    painPoints: [
      'Cientos de mensajes de curiosos sin capacidad financiera real.',
      'Leads que escriben por la tarde/noche y se enfrían al día siguiente.',
      'Agentes inmobiliarios perdiendo 3 horas al día coordinando calendarios.',
    ],
    solutions: [
      'Cualificación BANT automática (Presupuesto, Zona, Tipo de Inmueble).',
      'Sincronización instantánea de citas de visita con el comercial asignado.',
      'Búsqueda en catálogo de propiedades mediante lenguaje natural en WhatsApp.',
    ],
    color: '#3B82F6'
  }
};

export async function generateStaticParams() {
  return Object.keys(sectorData).map((sector) => ({
    sector,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  const data = sectorData[sector];

  if (!data) {
    return { title: 'Sector no encontrado | HecTechAi' };
  }

  return {
    title: `${data.title} | HecTechAi`,
    description: data.description.substring(0, 160),
    openGraph: {
      title: data.title,
      description: data.description.substring(0, 160),
    }
  };
}

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const data = sectorData[sector];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 selection:bg-[#00FF85] selection:text-black">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none overflow-hidden opacity-10">
        <div
          className="absolute inset-0 rounded-full blur-[150px]"
          style={{ backgroundColor: data.color }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <span>Sectores</span>
          <span>/</span>
          <span style={{ color: data.color }}>{data.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold tracking-widest mb-6"
              style={{ color: data.color }}
            >
              <Target size={14} /> {data.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-display leading-[1.1] tracking-tight">
              {data.title}
            </h1>
            <p className="text-xl text-zinc-300 font-medium mb-6 leading-relaxed">
              {data.subtitle}
            </p>
            <p className="text-zinc-400 text-base leading-relaxed mb-8">
              {data.description}
            </p>

            {/* ROI Banner */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0"
                style={{ backgroundColor: `${data.color}15`, color: data.color }}
              >
                <TrendingUp size={24} />
              </div>
              <div>
                <div className="text-2xl font-black font-display tracking-tight" style={{ color: data.color }}>
                  {data.roiStat}
                </div>
                <div className="text-xs text-zinc-400">
                  {data.roiLabel}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-high-ticket inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base shadow-xl"
              >
                <Calendar size={18} />
                <span>Solicitar Auditoría 360°</span>
              </a>
              <a
                href={`https://wa.me/34654551635?text=Hola,%20quiero%20probar%20la%20demo%20de%20IA%20para%20${encodeURIComponent(data.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass-secondary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-mono text-zinc-300 hover:text-white"
              >
                <span>Probar en WhatsApp Real</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Interactive Chatbot Demo Component */}
          <div className="relative">
            <HeroChatbot />
          </div>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Pain points */}
          <div className="rounded-3xl p-8 md:p-10 bg-[#090D16] border border-red-500/20">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-red-400 font-display">
              <ShieldCheck size={22} />
              El Cuello de Botella Actual
            </h3>
            <ul className="space-y-5">
              {data.painPoints.map((point: string, idx: number) => (
                <li key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-mono">
                    ✕
                  </div>
                  <span className="text-zinc-300 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div
            className="rounded-3xl p-8 md:p-10 bg-[#090D16] border"
            style={{ borderColor: `${data.color}30` }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 font-display" style={{ color: data.color }}>
              <CheckCircle2 size={22} />
              La Solución HecTechAi
            </h3>
            <ul className="space-y-5">
              {data.solutions.map((sol: string, idx: number) => (
                <li key={idx} className="flex gap-4 items-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-mono"
                    style={{ backgroundColor: `${data.color}15`, color: data.color }}
                  >
                    ✓
                  </div>
                  <span className="text-white text-sm font-medium leading-relaxed">{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div
          className="rounded-3xl p-10 md:p-14 text-center border relative overflow-hidden bg-gradient-to-b from-[#090D16] to-[#04060A]"
          style={{ borderColor: `${data.color}30` }}
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <Zap size={40} className="mx-auto mb-4" style={{ color: data.color }} />
            <h2 className="text-3xl md:text-4xl font-black mb-4 font-display tracking-tight">
              Moderniza tu {data.name} en menos de 14 días
            </h2>
            <p className="text-zinc-400 mb-8 text-base">
              Evaluamos la deuda técnica y las fugas de reservas de tu negocio sin coste. Te entregamos un informe de viabilidad y ROI antes de comprometer un solo euro.
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-high-ticket inline-flex items-center gap-3 px-10 py-4 rounded-xl font-black text-base shadow-2xl"
            >
              <Calendar size={18} />
              <span>Agendar Auditoría Gratuita</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
