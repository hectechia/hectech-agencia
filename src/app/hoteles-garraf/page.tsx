'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  MessageSquare, Globe, Clock, CheckCircle2, ArrowDown,
  Hotel, Smartphone, BarChart3, ChevronRight, Menu, X
} from 'lucide-react'
import { requestHotelDemo } from './actions'

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B0E14]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-tight">
          Hec<span className="text-[#00FF85]">Tech</span>Ai
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#problema" className="hover:text-white transition-colors">El problema</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a>
          <a href="#precios" className="hover:text-white transition-colors">Precios</a>
          <a href="#demo" className="px-4 py-2 bg-[#00FF85] text-black font-semibold rounded-lg hover:bg-[#00e077] transition-colors text-sm">
            Pide tu demo
          </a>
        </div>
        <button className="md:hidden text-white/60" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0B0E14] px-6 py-4 flex flex-col gap-4 text-sm text-white/60">
          <a href="#problema" onClick={() => setOpen(false)}>El problema</a>
          <a href="#como-funciona" onClick={() => setOpen(false)}>Cómo funciona</a>
          <a href="#precios" onClick={() => setOpen(false)}>Precios</a>
          <a href="#demo" onClick={() => setOpen(false)} className="text-[#00FF85] font-semibold">
            Pide tu demo →
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF85]/30 bg-[#00FF85]/5 text-[#00FF85] text-xs font-medium mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse" />
        Chatbot 24/7 · WhatsApp + Web · Garraf
      </div>

      <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
        Tu hotel responde en inglés,
        <br />
        alemán y catalán
        <br />
        <span className="text-[#00FF85]">a las 3 de la mañana.</span>
      </h1>

      <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
        Sin contratar a nadie. Sin que el teléfono te despierte.
        Un chatbot de IA que conoce tu hotel de cabo a rabo y responde
        en el idioma del huésped, siempre.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#demo"
          className="px-8 py-4 bg-[#00FF85] text-black font-bold rounded-xl text-base hover:bg-[#00e077] active:scale-95 transition-all"
        >
          Pide tu demo gratis
        </a>
        <a
          href="#como-funciona"
          className="px-8 py-4 border border-white/15 text-white/70 font-medium rounded-xl text-base hover:border-white/30 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          Cómo funciona <ArrowDown size={16} />
        </a>
      </div>

      <p className="mt-6 text-xs text-white/30">
        Sin compromiso · Sin tarjeta de crédito · La demo es tuya, te la quedas
      </p>
    </section>
  )
}

// ─── PROBLEMA ────────────────────────────────────────────────────────────────

const REPEATED_QUESTIONS = [
  { lang: 'ES', q: '¿Hacéis late check-out? ¿Y early check-in?' },
  { lang: 'ES', q: '¿Puedo aparcar en el hotel o cerca?' },
  { lang: 'EN', q: 'Do you have rooms with sea view available?' },
  { lang: 'DE', q: 'Haben Sie noch Zimmer frei für dieses Wochenende?' },
  { lang: 'ES', q: '¿El restaurante está abierto para cenas o solo desayunos?' },
]

function Problema() {
  return (
    <section id="problema" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Cada día, las mismas preguntas.
          <br />
          <span className="text-white/40">Siempre fuera de horario.</span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Tu recepción no puede estar disponible las 24 horas.
          Pero el huésped que reserva un sábado a las 23h no espera al lunes.
        </p>
      </div>

      <div className="grid gap-3 max-w-2xl mx-auto mb-14">
        {REPEATED_QUESTIONS.map(({ lang, q }, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 rounded-xl border border-white/8 bg-white/3 hover:border-white/15 transition-colors"
          >
            <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/40 mt-0.5">
              {lang}
            </span>
            <span className="text-white/70 text-sm">&ldquo;{q}&rdquo;</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: <Clock className="text-[#00FF85] mx-auto mb-3" size={28} />,
            title: 'Preguntas fuera de horario',
            body: 'Muchas consultas llegan de noche o en fin de semana, cuando tu recepción no puede contestar.',
          },
          {
            icon: <Globe className="text-[#00F2FF] mx-auto mb-3" size={28} />,
            title: 'Turismo internacional sin respuesta',
            body: 'El turismo del Garraf es mayoritariamente alemán, inglés y holandés. Responder en inglés a las 11pm marca la diferencia.',
          },
          {
            icon: <MessageSquare className="text-[#00FF85] mx-auto mb-3" size={28} />,
            title: 'WhatsApp sin gestionar',
            body: 'Los mensajes de WhatsApp que no se responden en menos de 2 horas tienen el doble de abandono. Cada mensaje perdido es una reserva menos.',
          },
        ].map((card, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/8 bg-white/3">
            {card.icon}
            <h3 className="font-display font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CÓMO FUNCIONA ───────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    title: 'Le contamos cómo es tu hotel',
    body: 'Tú nos das la información: servicios, horarios, FAQs, menú si tienes restaurante. Nosotros lo configuramos. No necesitas tocar código ni plataformas.',
    icon: <Hotel size={22} />,
  },
  {
    n: '02',
    title: 'El bot responde por WhatsApp y web',
    body: 'En el idioma del huésped, con tus respuestas, 24/7. Detecta si algo no sabe responder y avisa a tu equipo en vez de inventarse algo.',
    icon: <Smartphone size={22} />,
  },
  {
    n: '03',
    title: 'Tú ves qué se pregunta',
    body: 'Recibes un resumen diario de las conversaciones. Nada se pierde, todo queda registrado. Puedes ajustar respuestas en cualquier momento.',
    icon: <BarChart3 size={22} />,
  },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 px-6 bg-white/2">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Tres pasos. Sin aprender nada nuevo.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Lo implementamos nosotros. Tú lo supervisas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.n} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center text-[#00FF85]">
                  {step.icon}
                </div>
                <span className="text-5xl font-display font-bold text-white/5">{step.n}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl border border-white/8 bg-white/3 flex flex-col md:flex-row items-start md:items-center gap-4">
          <CheckCircle2 className="text-[#00FF85] shrink-0" size={22} />
          <p className="text-sm text-white/60">
            <strong className="text-white">Humano en el bucle:</strong> el bot nunca finge saber lo que no sabe.
            Si la pregunta requiere criterio humano, escala al equipo y registra la conversación.
            Cumple RGPD y lo decimos explícitamente al usuario.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── PRECIOS ─────────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: 'Starter',
    setup: '497 €',
    monthly: '49 €/mes',
    for: 'Hostales y hoteles familiares',
    features: [
      'Chatbot web + WhatsApp',
      'Hasta 500 conversaciones/mes',
      'Configuración inicial incluida',
      'Respuestas en 3 idiomas',
      'Resumen diario por email',
      'Soporte por email',
    ],
    cta: 'Empezar con Starter',
    highlight: false,
  },
  {
    name: 'Pro',
    setup: '1.197 €',
    monthly: '99 €/mes',
    for: 'Hoteles boutique con F&B',
    features: [
      'Todo lo del Starter',
      'Hasta 2.000 conversaciones/mes',
      'Integración con tu web y reservas',
      'Gestión de reservas de restaurante',
      'Panel de análisis de conversaciones',
      'Soporte prioritario',
    ],
    cta: 'Empezar con Pro',
    highlight: true,
  },
  {
    name: 'Full Automation',
    setup: '2.497 €',
    monthly: '149 €/mes',
    for: 'Hoteles con operaciones complejas',
    features: [
      'Todo lo del Pro',
      'Conversaciones ilimitadas',
      'Integraciones personalizadas (PMS, CRM)',
      'Flujos de upsell automatizados',
      'Onboarding dedicado',
      'SLA de respuesta 24h',
    ],
    cta: 'Solicitar Full Automation',
    highlight: false,
  },
  {
    name: 'Enterprise',
    setup: '4.997 €',
    monthly: '199 €/mes',
    for: 'Grupos y multipropiedad',
    features: [
      'Todo lo del Full Automation',
      'Hasta 3 establecimientos',
      'Integraciones a medida (channel manager, PMS propietario)',
      'Onboarding in situ',
      'Account manager dedicado',
      'SLA de respuesta 2h',
    ],
    cta: 'Hablar con el equipo',
    highlight: false,
  },
]

function Precios() {
  return (
    <section id="precios" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Precios sin letra pequeña
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Un pago de setup (implementación + configuración) y una cuota mensual fija.
          Sin sorpresas, sin comisiones por reserva.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border p-6 flex flex-col gap-5 ${
              tier.highlight
                ? 'border-[#00FF85]/40 bg-[#00FF85]/5'
                : 'border-white/8 bg-white/3'
            }`}
          >
            {tier.highlight && (
              <span className="text-xs font-bold text-[#00FF85] uppercase tracking-wider">
                Más popular
              </span>
            )}
            <div>
              <h3 className="font-display font-bold text-xl mb-1">{tier.name}</h3>
              <p className="text-xs text-white/40">{tier.for}</p>
            </div>
            <div>
              <div className="text-3xl font-display font-bold">{tier.setup}</div>
              <div className="text-sm text-white/40">setup único</div>
              <div className="text-lg font-semibold mt-1 text-[#00FF85]">{tier.monthly}</div>
            </div>
            <ul className="flex flex-col gap-2.5 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                  <CheckCircle2 size={14} className="text-[#00FF85] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#demo"
              className={`text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                tier.highlight
                  ? 'bg-[#00FF85] text-black hover:bg-[#00e077]'
                  : 'border border-white/15 text-white/70 hover:border-white/30 hover:text-white'
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-white/30 mt-8">
        Todos los precios en EUR · IVA no incluido · Cero permanencia (cancela cuando quieras)
      </p>
    </section>
  )
}

// ─── POSICIONAMIENTO GARRAF ───────────────────────────────────────────────────

function GarrafBadge() {
  return (
    <section className="py-16 px-6 bg-white/2">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-white/30 text-sm uppercase tracking-wider mb-4 font-medium">
          Por qué ahora en el Garraf
        </p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
          Sé el primero en tu zona en tenerlo.
        </h2>
        <p className="text-white/50 leading-relaxed mb-8">
          La automatización de atención al cliente con IA está llegando a la hostelería española.
          Los grandes cadenas ya lo usan. Los hoteles independientes del Garraf que lo implanten
          ahora tendrán ventaja antes de que sea estándar.
          <br /><br />
          No hay casos de éxito que enseñarte todavía — somos nuevos en esto y lo decimos.
          Lo que sí hay es una demo real con tu hotel, tu idioma y tus preguntas.
          Eso puedes verlo antes de decidir nada.
        </p>
        <a
          href="#demo"
          className="inline-flex items-center gap-2 text-[#00FF85] font-semibold hover:gap-3 transition-all"
        >
          Ver la demo <ChevronRight size={18} />
        </a>
      </div>
    </section>
  )
}

// ─── DEMO FORM ───────────────────────────────────────────────────────────────

function DemoForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const fd = new FormData(e.currentTarget)

    const result = await requestHotelDemo({
      hotelName: fd.get('hotel_name') as string,
      contactName: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      hotelUrl: fd.get('hotel_url') as string,
    })

    if (result.success) {
      setStatus('success')
      formRef.current?.reset()
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Error al enviar.')
    }
  }

  return (
    <section id="demo" className="py-20 px-6 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Pide tu demo gratis
        </h2>
        <p className="text-white/50">
          Te preparamos una demo con el nombre de tu hotel, tus servicios y
          tus preguntas frecuentes. La ves, la pruebas, y decides.
          Sin presión ni compromiso.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-8 rounded-2xl border border-[#00FF85]/30 bg-[#00FF85]/5 text-center">
          <CheckCircle2 className="text-[#00FF85] mx-auto mb-3" size={40} />
          <h3 className="font-display font-bold text-xl mb-2">¡Solicitud recibida!</h3>
          <p className="text-white/60 text-sm">
            Héctor se pondrá en contacto contigo en menos de 24 horas
            para coordinar la demo de tu hotel.
          </p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            name="hotel_name"
            type="text"
            placeholder="Nombre de tu hotel o establecimiento *"
            required
            className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00FF85]/50 transition-colors text-white placeholder-white/30 h-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Tu nombre *"
              required
              className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00FF85]/50 transition-colors text-white placeholder-white/30 h-14"
            />
            <input
              name="email"
              type="email"
              placeholder="Email *"
              required
              className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00FF85]/50 transition-colors text-white placeholder-white/30 h-14"
            />
          </div>
          <input
            name="phone"
            type="tel"
            placeholder="Teléfono (opcional)"
            className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00FF85]/50 transition-colors text-white placeholder-white/30 h-14"
          />
          <input
            name="hotel_url"
            type="url"
            placeholder="Web del hotel (opcional — la usamos para preparar la demo)"
            className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00FF85]/50 transition-colors text-white placeholder-white/30 h-14"
          />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="py-4 bg-[#00FF85] text-black font-bold rounded-xl text-base hover:bg-[#00e077] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {status === 'submitting' ? 'Enviando…' : 'Quiero ver la demo →'}
          </button>

          {status === 'error' && (
            <p className="text-sm text-red-400 text-center">{errorMsg}</p>
          )}

          <p className="text-xs text-white/25 text-center">
            Tus datos se usan exclusivamente para preparar y enviarte la demo.
            No los compartimos con terceros. Política de privacidad en hectechai.com/privacidad.
          </p>
        </form>
      )}
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <span>
          <strong className="text-white/50">HecTechAi</strong> · Sitges, Garraf
        </span>
        <div className="flex gap-6">
          <Link href="/privacidad" className="hover:text-white/60 transition-colors">Privacidad</Link>
          <Link href="/terms" className="hover:text-white/60 transition-colors">Términos</Link>
          <Link href="/" className="hover:text-white/60 transition-colors">Volver al inicio</Link>
        </div>
        <span>© {new Date().getFullYear()} HecTechAi</span>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HotelesGarrafPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <Nav />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <Precios />
        <GarrafBadge />
        <DemoForm />
      </main>
      <Footer />
    </div>
  )
}
