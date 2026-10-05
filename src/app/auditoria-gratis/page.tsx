'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import {
  Sparkles, Mail, Clock3, CheckCircle2, ArrowDown, ChevronRight,
  FileText, Target, Calendar, Menu, X
} from 'lucide-react'
import { AuditForm } from './AuditForm'

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B0E14]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-tight">
          Hec<span className="text-[#00FF94]">Tech</span>Ai
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a>
          <a href="#que-recibes" className="hover:text-white transition-colors">Qué recibes</a>
          <a href="#form" className="px-4 py-2 bg-[#00FF94] text-black font-semibold rounded-lg hover:bg-[#00e077] transition-colors text-sm">
            Pide tu auditoría
          </a>
        </div>
        <button className="md:hidden text-white/60" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0B0E14] px-6 py-4 flex flex-col gap-4 text-sm text-white/60">
          <a href="#como-funciona" onClick={() => setOpen(false)}>Cómo funciona</a>
          <a href="#que-recibes" onClick={() => setOpen(false)}>Qué recibes</a>
          <a href="#form" onClick={() => setOpen(false)} className="text-[#00FF94] font-semibold">
            Pide tu auditoría →
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF94]/30 bg-[#00FF94]/5 text-[#00FF94] text-xs font-medium mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
        Auditoría IA gratuita · Hostelería local
      </div>

      <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
        Cuéntanos tu caso.
        <br />
        <span className="text-gradient">La IA analiza tu negocio</span>
        <br />
        en minutos.
      </h1>

      <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
        Rellena el formulario y recibe al momento un preview de tu análisis. Minutos después,
        un informe completo por email con diagnóstico, 3 oportunidades concretas y un plan de
        30 días para tu hotel, restaurante o bar.
      </p>

      <a
        href="#form"
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#00FF94] text-black font-bold rounded-xl text-base hover:bg-[#00e077] active:scale-95 transition-all"
      >
        Quiero mi auditoría gratis <ArrowDown size={16} />
      </a>

      <p className="mt-6 text-xs text-white/30">
        Gratis · Sin compromiso · Solo necesitamos tu caso y tu email
      </p>
    </section>
  )
}

// ─── CÓMO FUNCIONA ───────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    title: 'Cuéntanos tu caso',
    body: 'Nombre de tu negocio, tu web y el problema que más te quita tiempo o dinero. Dos minutos.',
    icon: <FileText size={22} />,
  },
  {
    n: '02',
    title: 'La IA analiza al momento',
    body: 'Un preview de 5-8 líneas aparece en pantalla al instante, mientras la IA sigue trabajando en el informe completo.',
    icon: <Sparkles size={22} />,
  },
  {
    n: '03',
    title: 'Recibes el informe por email',
    body: 'En 2-3 minutos, un informe con diagnóstico, 3 oportunidades concretas, plan de 30 días y benchmark del sector.',
    icon: <Mail size={22} />,
  },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 px-6 bg-white/2">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Tres pasos. Sin coste, sin compromiso.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            No es una demo genérica: es un análisis de tu caso real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.n} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center text-[#00FF94]">
                  {step.icon}
                </div>
                <span className="text-5xl font-display font-bold text-white/5">{step.n}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── QUÉ RECIBES ─────────────────────────────────────────────────────────────

const DELIVERABLES = [
  { icon: <Target size={20} />, title: 'Diagnóstico claro', body: 'Qué está pasando en tu negocio, en 2 frases sin rodeos.' },
  { icon: <Sparkles size={20} />, title: '3 oportunidades concretas', body: 'Con impacto estimado en horas u operaciones, no promesas vacías.' },
  { icon: <Calendar size={20} />, title: 'Plan de 30 días', body: 'Una acción por semana, priorizada y accionable desde el día uno.' },
  { icon: <CheckCircle2 size={20} />, title: 'Benchmark del sector', body: 'Cómo lo están resolviendo ya los negocios líderes en digitalización IA.' },
]

function QueRecibes() {
  return (
    <section id="que-recibes" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Qué recibes en el informe
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Cero jerga técnica. Cero cifras infladas. Si nos falta un dato, te lo decimos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {DELIVERABLES.map((d) => (
          <div key={d.title} className="flex gap-4 p-6 rounded-2xl border border-white/8 bg-white/3">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center text-[#00FF94]">
              {d.icon}
            </div>
            <div>
              <h3 className="font-display font-semibold mb-1">{d.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{d.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: '¿Es realmente gratis?', a: 'Sí. No pedimos tarjeta ni compromiso. Solo tu caso y tu email para enviarte el informe.' },
  { q: '¿Cuánto tarda en llegar el informe?', a: 'El preview aparece al momento en pantalla. El informe completo llega por email en 2-3 minutos.' },
  { q: '¿Qué pasa con mis datos?', a: 'Se usan exclusivamente para generar y enviarte tu auditoría. No los compartimos con terceros.' },
  { q: '¿Sirve para cualquier tipo de negocio de hostelería?', a: 'Está optimizado para hoteles, restaurantes y bares. Si tu negocio es distinto, indícalo como "Otro" y lo analizamos igual.' },
]

function FAQ() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Preguntas frecuentes</h2>
      </div>
      <div className="flex flex-col gap-4">
        {FAQS.map((f) => (
          <div key={f.q} className="p-6 rounded-2xl border border-white/8 bg-white/3">
            <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
              <ChevronRight size={16} className="text-[#00FF94]" /> {f.q}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed pl-6">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── FORM SECTION ────────────────────────────────────────────────────────────

function FormSection() {
  return (
    <section id="form" className="py-20 px-6 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Pide tu auditoría gratis
        </h2>
        <p className="text-white/50 flex items-center justify-center gap-1.5">
          <Clock3 size={14} /> Preview al instante · Informe completo en 2-3 minutos
        </p>
      </div>
      <Suspense fallback={<div className="glass-card premium-border p-8 md:p-10 rounded-3xl border border-white/10 min-h-[400px]" />}>
        <AuditForm />
      </Suspense>
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

export default function AuditoriaGratisPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <Nav />
      <main>
        <Hero />
        <ComoFunciona />
        <QueRecibes />
        <FormSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
