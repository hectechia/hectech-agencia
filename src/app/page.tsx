'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Zap,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Menu,
  X,
  CheckCircle2,
  Globe,
  Sparkles,
  Loader2,
  Users,
  Rocket,
  ShieldCheck,
  Camera,
  Plus,
  Minus,
  Instagram,
  Mail,
  ArrowRight
} from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { generateAuditAction } from './actions';
import { HeroChatbot } from '../ui/components/HeroChatbot';
import { HeroCanvas } from '../ui/components/HeroCanvas';
import { BentoGrid } from '../ui/components/BentoGrid';

const ContactForm = dynamic(() => import('./ContactForm').then(mod => mod.ContactForm), { ssr: false });
const VisualAudit = dynamic(() => import('../ui/components/VisualAudit').then(mod => mod.VisualAudit), { ssr: false });
const LiveDemo = dynamic(() => import('./LiveDemo'), { ssr: false });
const PreCalendarModal = dynamic(() => import('../ui/components/PreCalendarModal').then(mod => mod.PreCalendarModal), { ssr: false });

const CALENDAR_URL = 'https://calendar.app.google/iSajQABW249gqbvB9';

// --- ANIMATION HELPER ---
const Reveal = ({ children, width = 'fit-content' }: { children: React.ReactNode; width?: 'fit-content' | '100%' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'visible' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- MAGNETIC BUTTON ---
const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- FLOATING CTA ---
const FloatingCTA = ({ onOpenCalendar }: { onOpenCalendar: () => void }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      <MagneticButton>
        <button
          onClick={onOpenCalendar}
          className="btn-high-ticket flex items-center gap-3 px-8 py-4 rounded-full text-base whitespace-nowrap shadow-2xl cursor-pointer"
        >
          <Calendar size={18} />
          <span>Solicitar Auditoría 360°</span>
        </button>
      </MagneticButton>
      <Link
        href="/auditoria-gratis?utm_source=floating"
        className="text-[11px] font-mono text-zinc-400 hover:text-[#00FF85] transition-colors whitespace-nowrap bg-[#050507]/90 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md"
      >
        ¿Prefieres recibir informe PDF por email? →
      </Link>
    </div>
  );
};

// --- NAVBAR ---
const Navbar = ({ onOpenCalendar }: { onOpenCalendar: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beneficios', href: '#beneficios' },
    { name: '4 Motores Core', href: '#servicios' },
    { name: 'Demos en Vivo', href: '#demos' },
    { name: 'Auditoría 360°', href: '#auditoria-ia' },
    { name: 'Calculadora ROI', href: '#roi-calculator' },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[#050507]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 cursor-pointer group">
          <Image
            src="/logo.png"
            alt="HecTechAi Logo"
            width={44}
            height={44}
            className="object-contain group-hover:scale-105 transition-transform"
            style={{ mixBlendMode: 'screen' }}
          />
          <div className="flex items-center gap-2 font-display font-black text-xl md:text-2xl tracking-tighter text-white">
            <span>
              Hec<span className="text-[#00FF85]">TechAi</span>
            </span>
          </div>
          <span className="hidden sm:inline-flex ml-2 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-white/[0.04] text-zinc-400 border border-white/10">
            ENGINE 2.0
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="btn-glass-secondary px-4 py-2 rounded-xl text-xs flex items-center gap-2"
          >
            <Users size={14} />
            Acceso Clientes
          </Link>
          <button
            onClick={onOpenCalendar}
            className="btn-high-ticket px-5 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
          >
            <Calendar size={14} />
            Auditoría 360°
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-zinc-300 hover:text-white p-2"
          aria-label="Alternar menú móvil"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="lg:hidden absolute top-full left-0 w-full bg-[#050507]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl z-[100]"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-zinc-300 hover:text-[#00FF85] font-mono text-sm uppercase tracking-wider py-2 border-b border-white/5 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="btn-glass-secondary py-3 rounded-xl text-center text-sm flex items-center justify-center gap-2"
            >
              <Users size={16} />
              Acceso Clientes
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCalendar();
              }}
              className="btn-high-ticket py-3.5 rounded-xl text-center text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar size={16} />
              Solicitar Auditoría 360°
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// --- HERO SECTION ($50K HOOK) ---
const Hero = ({ onOpenCalendar }: { onOpenCalendar: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#050507]">
      {/* Interactive Micro-mesh Canvas */}
      <HeroCanvas />

      {/* Subtle Ambient Radial Halos (Surgical 8-12%) */}
      <div className="absolute top-10 -left-40 w-[550px] h-[550px] halo-emerald blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] halo-cyan blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] halo-amber blur-[180px] pointer-events-none opacity-40" />

      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 noise-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: The $50k Hook */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Animated Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-ping" />
            <span className="swiss-tag text-[10px] text-zinc-300">
              HECTECHAI · AUTOMATION &amp; CINEMATIC WEB ENGINE
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tighter text-white font-display">
            Automatización e <br className="hidden sm:block" />
            <span className="text-gradient">Infraestructura Web</span> que Convierte Negocios Locales en Máquinas de Escala.
          </h1>

          {/* Tech-Commercial Subtitle */}
          <p className="text-zinc-400 text-lg sm:text-xl lg:text-2xl max-w-2xl leading-relaxed font-normal">
            Sustituimos páginas obsoletas y procesos manuales por <strong className="text-white font-semibold">experiencias web cinemáticas</strong>, <strong className="text-white font-semibold">agentes de voz 24/7</strong> y <strong className="text-white font-semibold">enjambres de IA</strong> que capturan clientes mientras duermes.
          </p>

          {/* Dual High-Ticket CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <MagneticButton>
              <button
                onClick={onOpenCalendar}
                className="btn-high-ticket px-9 py-5 rounded-2xl text-base flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(0,255,133,0.3)] cursor-pointer"
              >
                <Calendar size={20} />
                <span>Solicitar Auditoría 360°</span>
              </button>
            </MagneticButton>

            <a
              href="#demos"
              className="btn-glass-secondary px-8 py-5 rounded-2xl text-base flex items-center justify-center gap-2 group"
            >
              <Sparkles size={18} className="text-[#00FF85] group-hover:rotate-12 transition-transform" />
              <span>Ver Enjambres en Vivo</span>
            </a>
          </div>

          {/* HUD Telemetry Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/[0.08]">
            {[
              { label: 'Disponibilidad', value: '24/7/365', accent: '#00FF85' },
              { label: 'Infraestructura', value: 'n8n propio', accent: '#00F2FF' },
              { label: 'Auditoría Inicial', value: '0€ Sin Riesgo', accent: '#00FF85' },
              { label: 'Permanencia', value: '0 Días (Libre)', accent: '#FFB800' },
            ].map((metric, i) => (
              <div
                key={i}
                className="precision-glass p-3.5 rounded-2xl text-left border border-white/[0.06]"
              >
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{metric.label}</div>
                <div className="text-lg sm:text-xl font-bold font-display mt-0.5" style={{ color: metric.accent }}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: HeroChatbot with Obsidian Precision Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Subtle Halo behind chatbot */}
          <div className="absolute inset-0 halo-emerald blur-[90px] opacity-30 pointer-events-none" />

          <div className="w-full relative z-10">
            {/* Top Engineering Telemetry Tag */}
            <div className="mb-3 flex items-center justify-between px-2 text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
                CONCIERGE AGENT · ENJAMBRE ACTIVO
              </span>
              <span className="text-[#00F2FF]">TELEMETRÍA EN DIRECTO</span>
            </div>

            <div className="rounded-3xl border border-white/[0.1] bg-[#08080c]/90 backdrop-blur-2xl shadow-2xl p-2 relative overflow-hidden">
              <HeroChatbot />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// --- ENGINEERING TELEMETRY MARQUEE ---
const EngineeringTelemetry = () => {
  const items = [
    'N8N AUTOALOJADO EN SERVIDOR PROPIO',
    'APROBACIÓN HUMANA ANTES DE ENVIAR',
    'WHATSAPP · TELEGRAM · EMAIL',
    'DATOS AISLADOS POR CLIENTE',
    'ORQUESTACIÓN N8N EMPRESARIAL',
    'MULTI-TENANT SUPABASE RLS',
    'SSR NEXT.JS 16 TURBOPACK',
    'AGENTES DE VOZ CON VAPI',
    'CACHÉ DE PROMPTS PARA CONTENER COSTES',
  ];

  return (
    <div className="w-full bg-[#030305] border-y border-white/[0.08] py-4 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85]" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BENEFITS SECTION ---
const Benefits = () => {
  const benefits = [
    {
      icon: <Clock size={28} className="text-[#00FF85]" />,
      tag: 'DISPONIBILIDAD TOTAL',
      title: 'Atención 24/7 Sin Descanso',
      desc: 'Tu negocio nunca duerme. Responde a clientes y leads al instante a las 23:00 o en domingo, bloqueando ventas antes de que busquen a tu competidor.',
    },
    {
      icon: <Target size={28} className="text-[#00F2FF]" />,
      tag: 'PRECISIÓN QUIRÚRGICA',
      title: 'Menos Errores Manuales',
      desc: 'Evita descuidos y citas duplicadas automatizando la reserva, la sincronización con tu CRM y la facturación.',
    },
    {
      icon: <TrendingUp size={28} className="text-[#00FF85]" />,
      tag: 'ESCALABILIDAD REAL',
      title: 'Más Capacidad Sin Contratar',
      desc: 'Absorbe picos de demanda y conversaciones simultáneas sin aumentar tu coste de personal ni sobrecargar a tu equipo.',
    },
    {
      icon: <Zap size={28} className="text-[#FFB800]" />,
      tag: 'RECUPERACIÓN DE INGRESOS',
      title: 'Fidelización Automatizada',
      desc: 'Recordatorios por WhatsApp que reducen las citas olvidadas y reactivan a clientes inactivos con ofertas personalizadas.',
    },
    {
      icon: <Globe size={28} className="text-[#00F2FF]" />,
      tag: 'ARQUITECTURA MODERNA',
      title: 'Velocidad Web Extrema',
      desc: 'Webs hechas con Next.js y React 19, optimizadas para cargar rápido en el móvil, algo que Google tiene en cuenta al posicionarte.',
    },
    {
      icon: <CheckCircle2 size={28} className="text-[#00FF85]" />,
      tag: 'RENTABILIDAD MEDIBLE',
      title: 'Costes Bajo Control',
      desc: 'Sustituye horas de gestión manual por flujos automatizados de n8n. Antes de empezar calculamos contigo cuánto ahorras y en cuánto tiempo se paga.',
    },
  ];

  return (
    <section id="beneficios" className="py-28 bg-[#050507] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="swiss-tag justify-center">
              <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
              VENTAJA COMPETITIVA SISTÉMICA
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
              ¿Por Qué Seguir Operando con <br />
              <span className="text-gradient">Sistemas del Siglo Pasado</span>?
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Las empresas que lideran no trabajan más horas; automatizan las tareas repetitivas y concentran su talento humano en cerrar acuerdos de alto valor.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <Reveal key={index} width="100%">
              <div className="precision-glass precision-glass-hover p-8 rounded-3xl h-full flex flex-col justify-between group">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <span className="swiss-tag text-[9px] px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/5">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- PROCESS METHODOLOGY SECTION ---
const Process = () => {
  const steps = [
    {
      num: '01',
      title: 'Auditoría Quirúrgica 360°',
      desc: 'Mapeamos tus fugas de conversión, tiempos de respuesta y procesos manuales. En 48h recibes un blueprint de optimización sin rodeos.',
      tag: 'DIAGNÓSTICO',
    },
    {
      num: '02',
      title: 'Despliegue del Enjambre',
      desc: 'Construimos e integramos tus agentes de voz, chatbots WhatsApp y portales web conectados a tu CRM y calendario en un entorno aislado.',
      tag: 'INGENIERÍA',
    },
    {
      num: '03',
      title: 'Optimización Continua & Escala',
      desc: 'Afinamos prompts, monitorizamos telemetría y auditamos mensualmente para maximizar tu rentabilidad y mantener el coste de API al mínimo.',
      tag: 'CRECIMIENTO',
    },
  ];

  return (
    <section id="proceso" className="py-28 relative bg-[#07070b]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="swiss-tag justify-center">
              <span className="w-2 h-2 rounded-full bg-[#00F2FF]" />
              METODOLOGÍA DE INGENIERÍA EN 3 ETAPAS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
              Cómo Convertimos Fricción en <br />
              <span className="text-gradient">Autonomía Operativa</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <Reveal key={index} width="100%">
              <div className="precision-glass p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden group">
                {/* Monumental Numbering */}
                <div className="text-7xl font-black font-mono text-white/[0.04] absolute top-4 right-6 pointer-events-none select-none">
                  {step.num}
                </div>

                <div className="space-y-4 relative z-10">
                  <span className="swiss-tag text-[10px] text-[#00FF85]">{step.tag}</span>
                  <h3 className="text-2xl font-bold text-white font-display">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85]" />
                  Revisión contigo en cada fase
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- TRUST BLOCK & FOUNDER GUARANTEE ---
const TrustBlock = () => {
  const commitments = [
    {
      icon: <ShieldCheck size={28} className="text-[#00FF85]" />,
      title: 'Garantía de las 5 Horas',
      desc: 'Si durante el diagnóstico no identificamos al menos 5 horas semanales de ahorro operativo demostrable, no hay propuesta comercial. Punto.',
      badge: 'SIN RIESGO',
      color: '#00FF85',
    },
    {
      icon: <Rocket size={28} className="text-[#00F2FF]" />,
      title: 'Prototipo Funcional Previo',
      desc: 'Construimos un flujo real con tus datos antes de formalizar cualquier contrato. Ves el agente operando antes de comprometer un solo euro.',
      badge: 'PRUEBA REAL',
      color: '#00F2FF',
    },
    {
      icon: <Zap size={28} className="text-[#FFB800]" />,
      title: 'Cero Permanencia',
      desc: 'El mantenimiento mensual es cancelable en cualquier instante sin penalizaciones. Te quedas solo si te compensa.',
      badge: 'LIBERTAD TOTAL',
      color: '#FFB800',
    },
    {
      icon: <Users size={28} className="text-[#00FF85]" />,
      title: 'Línea Directa con el Fundador',
      desc: 'Sin intermediarios ni consultores juniors. Héctor Barberá lidera directamente el diseño de la arquitectura y la entrega de tu sistema.',
      badge: 'TRATO DIRECTO',
      color: '#00FF85',
    },
  ];

  return (
    <section className="py-28 bg-[#050507] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="swiss-tag justify-center">
              <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
              COMPROMISO DE ALTO NIVEL
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
              Resultados de Negocio, <br />
              <span className="text-gradient">No Promesas Vacías</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Construimos sistemas pensados para dar un retorno que se pueda medir, y antes de empezar acordamos contigo cómo lo vamos a medir.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commitments.map((item, i) => (
            <Reveal key={i} width="100%">
              <div className="precision-glass p-8 md:p-10 rounded-3xl h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}30`,
                        backgroundColor: `${item.color}08`,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">{item.title}</h3>
                  <p className="text-zinc-400 text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Inline Booking Call */}
        <Reveal width="100%">
          <div className="mt-16 text-center">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-high-ticket inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-base shadow-2xl"
            >
              <Calendar size={20} />
              <span>Agendar Auditoría de 15 Minutos con Héctor</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// --- ABOUT THE FOUNDER ---
const AboutUs = () => {
  return (
    <section id="sobre-nosotros" className="py-28 bg-[#07070a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <Reveal width="100%">
              <div className="precision-glass p-3 rounded-3xl relative overflow-hidden group">
                <div className="aspect-[4/5] relative bg-[#09090e] rounded-2xl overflow-hidden flex flex-col justify-end p-8 border border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-800 pointer-events-none">
                    <Users size={160} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <div className="swiss-tag text-[10px] text-[#00FF85]">DIRECTOR &amp; CREATIVE TECHNOLOGIST</div>
                    <h3 className="text-3xl font-black text-white font-display">Héctor Barberá Sánchez</h3>
                    <p className="text-xs font-mono text-zinc-400">Garraf / Sitges · Barcelona</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <Reveal width="100%">
              <div className="space-y-4">
                <div className="swiss-tag">
                  <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
                  FILOSOFÍA TÉCNICA
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
                  Construimos la Tecnología que <br />
                  <span className="text-gradient">Devuelve tu Tiempo</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Creé <strong className="text-white">HecTechAi</strong> porque vi a dueños de clínicas, restaurantes y negocios locales pasar los fines de semana respondiendo mensajes atrasados en lugar de descansar. Mi meta es que los sistemas autónomos hagan el trabajo aburrido y tú te dediques a expandir tu empresa.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="precision-glass p-6 rounded-2xl space-y-2">
                <div className="swiss-tag text-[10px] text-[#00FF85]">MISIÓN</div>
                <h4 className="text-lg font-bold text-white">Sistemas Autónomos</h4>
                <p className="text-xs text-zinc-400">Sustituir procesos manuales lentos por infraestructuras digitales de alta fidelidad.</p>
              </div>
              <div className="precision-glass p-6 rounded-2xl space-y-2">
                <div className="swiss-tag text-[10px] text-[#00F2FF]">COMPROMISO</div>
                <h4 className="text-lg font-bold text-white">Soberanía de Datos</h4>
                <p className="text-xs text-zinc-400">Tus datos viven en tu propia base de datos y en nuestro servidor de n8n, aislados del resto de clientes.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-[#00FF85]">
              <p className="text-zinc-300 italic text-base leading-relaxed">
                &ldquo;La inteligencia artificial no debe ser un juguete ni una moda. O genera ingresos directos y libera horas de tu vida, o no vale la pena implementarla.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- SMART & VISUAL AUDIT SECTION ---
const SmartAudit = () => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'visual'>('strategic');
  const [business, setBusiness] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generateAudit = async () => {
    if (!business || !painPoint || !email) return;
    setLoading(true);
    setResult('');

    try {
      const response = await generateAuditAction(business, painPoint, email);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setResult(response.error || '⚠️ Error al generar diagnóstico.');
      }
    } catch {
      setResult('⚠️ Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="auditoria-ia" className="py-28 relative overflow-hidden bg-[#050507]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-12 space-y-4">
            <div className="swiss-tag justify-center">
              <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
              TERMINAL DE AUDITORÍA EN TIEMPO REAL
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
              Diagnóstico de Automatización <br />
              <span className="text-gradient">Para tu Negocio</span>
            </h2>
            <p className="text-zinc-400 text-base">
              Selecciona el tipo de evaluación para recibir un análisis adaptado a tu operativa.
            </p>
          </div>
        </Reveal>

        {/* Mode Selector Tabs */}
        <Reveal width="100%">
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('strategic')}
              className={`px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'strategic'
                  ? 'bg-[#00FF85] text-black shadow-lg'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              <Sparkles size={16} />
              Plan Estratégico IA
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'visual'
                  ? 'bg-[#00FF85] text-black shadow-lg'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              <Camera size={16} />
              Análisis Visual de Web
            </button>
          </div>
        </Reveal>

        <Reveal width="100%">
          <div className="precision-glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            {activeTab === 'strategic' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Tipo de Negocio o Sector
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Clínica Dental, Inmobiliaria, Restaurante..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#00FF85] focus:outline-none transition-colors"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Mayor Cuello de Botella
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Mensajes sin responder a deshoras..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#00FF85] focus:outline-none transition-colors"
                      value={painPoint}
                      onChange={(e) => setPainPoint(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Email Profesional para el Diagnóstico
                    </label>
                    <input
                      type="email"
                      placeholder="gerencia@tunegocio.com"
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#00FF85] focus:outline-none transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={generateAudit}
                  disabled={loading || !business || !painPoint || !email}
                  className="btn-high-ticket w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Analizando Cuellos de Botella...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generar Plan de Automatización Gratuito
                    </>
                  )}
                </button>

                {result && (
                  <div className="p-6 bg-white/[0.02] border border-[#00FF85]/30 rounded-2xl animate-in fade-in duration-500">
                    <div className="flex items-center gap-2 text-[#00FF85] text-xs font-mono uppercase tracking-wider mb-3">
                      <Sparkles size={14} />
                      Diagnóstico Generado
                    </div>
                    <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line font-mono">
                      {result}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <VisualAudit />
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <Link
                href="/auditoria-gratis?utm_source=terminal"
                className="text-xs font-mono text-zinc-400 hover:text-[#00FF85] transition-colors inline-flex items-center gap-1.5"
              >
                ¿Quieres un informe técnico completo en PDF? → Solicitar aquí
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// --- INTERACTIVE ROI CALCULATOR ---
const ROICalculator = () => {
  const [employees, setEmployees] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(22);
  const [hoursPerWeek, setHoursPerWeek] = useState(12);

  const monthlyLoss = Math.round(employees * hourlyRate * hoursPerWeek * 4.33);
  const annualLoss = monthlyLoss * 12;
  const potentialSavings = Math.round(monthlyLoss * 0.75);

  return (
    <section id="roi-calculator" className="py-28 relative overflow-hidden bg-[#07070b]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="swiss-tag">
                <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
                CALCULADORA DE FUGA DE CAPITAL
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
                El Coste Real de <br />
                <span className="text-gradient">No Automatizar Hoy</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                Muchas empresas no son conscientes del capital que pierden en tareas mecánicas. Ajusta los parámetros y comprueba el impacto financiero directo.
              </p>
            </div>

            <div className="space-y-8">
              {/* Slider 1 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-mono text-zinc-300">
                  <span>Personas en tareas manuales / repetitivas:</span>
                  <span className="text-[#00FF85] font-bold text-lg">{employees} empleados</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={employees}
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FF85]"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-mono text-zinc-300">
                  <span>Coste promedio empresa por hora:</span>
                  <span className="text-[#00F2FF] font-bold text-lg">{hourlyRate}€ / hora</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="2"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00F2FF]"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-mono text-zinc-300">
                  <span>Horas perdidas a la semana por empleado:</span>
                  <span className="text-[#FFB800] font-bold text-lg">{hoursPerWeek} horas / semana</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFB800]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Reveal width="100%">
              <div className="precision-glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative space-y-8">
                <div>
                  <div className="swiss-tag text-[10px] text-zinc-500">PÉRDIDA OPERATIVA MENSUAL</div>
                  <div className="text-5xl sm:text-6xl font-black text-white font-mono mt-2 tracking-tight">
                    {monthlyLoss.toLocaleString()}€
                    <span className="text-xs text-zinc-500 font-normal"> / mes</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Fuga Anual Estimada</div>
                    <div className="text-2xl font-bold font-mono text-red-400 mt-1">
                      {annualLoss.toLocaleString()}€
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Ahorro Mensual IA</div>
                    <div className="text-2xl font-bold font-mono text-[#00FF85] mt-1">
                      +{potentialSavings.toLocaleString()}€
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#00FF85]/10 border border-[#00FF85]/20 text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-[#00FF85]">Conclusión Técnica:</strong> Automatizar estas tareas libera aproximadamente un <strong className="text-white">35% de margen operativo</strong> neto para tu empresa.
                </div>

                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-high-ticket w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <Calendar size={18} />
                  <span>Detener Esta Fuga de Capital</span>
                </a>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- FAQ ACCORDION ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Qué diferencia a HecTechAi de otras agencias tradicionales?',
      a: 'No cobramos por horas de diseño web genérico ni instalamos plantillas WordPress. Construimos ingeniería cinemática en Next.js, conectamos agentes de voz en tiempo real con Vapi y desplegamos enjambres multi-tenant integrados en Supabase pensados para reducir costes operativos.',
    },
    {
      q: '¿Cómo garantizáis la privacidad de las conversaciones y clientes?',
      a: 'Cada cliente tiene sus datos aislados en Supabase mediante Row Level Security (RLS) y todas las conexiones van cifradas. Antes de empezar te explicamos qué proveedor de IA procesa cada dato y en qué condiciones.',
    },
    {
      q: '¿Qué sucede si un agente de voz o WhatsApp no entiende una consulta?',
      a: 'Cuando la IA detecta ambigüedad o una situación compleja, escala inmediatamente la conversación a un operador humano vía Telegram/WhatsApp con el contexto y la transcripción completa.',
    },
    {
      q: '¿Cuánto tiempo lleva poner en marcha un agente o portal web?',
      a: 'Un agente de voz o chatbot de WhatsApp se despliega habitualmente en 72 a 96 horas tras la auditoría inicial. Una plataforma web cinemática completa de HecSite se entrega en 10 a 14 días laborables lista para convertir.',
    },
    {
      q: '¿Existe algún tipo de permanencia o cláusula de permanencia?',
      a: 'Ninguna. El retainer mensual es libre y se puede rescindir en cualquier momento. Creemos en retener a nuestros clientes mediante el valor financiero y el ahorro que generamos mensualmente, no mediante contratos forzados.',
    },
  ];

  return (
    <section id="faq" className="py-28 bg-[#050507]">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16 space-y-4">
            <div className="swiss-tag justify-center">
              <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
              RESOLUCIÓN DE DUDAS OPERATIVAS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
              Preguntas Frecuentes
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              Todo lo que necesitas saber antes de dar el salto a la automatización empresarial.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} width="100%">
              <div className="precision-glass rounded-2xl overflow-hidden border border-white/5">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white font-display">{faq.q}</span>
                  <div className="text-zinc-400 ml-4">
                    {openIndex === index ? <Minus size={18} className="text-[#00FF85]" /> : <Plus size={18} />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-white/5 font-sans">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CONTACT SECTION ---
const ContactSection = () => {
  return (
    <section id="contacto" className="py-28 px-6 relative bg-[#07070a]">
      <div className="max-w-4xl mx-auto precision-glass p-8 md:p-14 rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-center mb-10 space-y-3">
          <div className="swiss-tag justify-center">
            <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
            CONVERSACIÓN DIRECTA
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
            ¿Hablamos 15 Minutos? <br />
            <span className="text-gradient">Sin Presión de Venta</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Cuéntanos cómo funciona tu operativa hoy. Te diremos con total transparencia si la automatización es adecuada para tu caso.
          </p>
        </div>

        {/* Option 1: Direct Calendar */}
        <div className="flex flex-col items-center mb-12">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-high-ticket flex items-center gap-3 px-10 py-5 rounded-2xl text-base shadow-2xl"
          >
            <Calendar size={20} />
            <span>Reservar Directamente en Google Calendar</span>
          </a>
          <span className="text-zinc-500 text-xs font-mono mt-3">
            Elige tu franja horaria · Gratuito · Sin compromiso
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="swiss-tag text-[10px]">O ESCRÍBENOS UN MENSAJE</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = ({ onOpenCalendar }: { onOpenCalendar: () => void }) => {
  return (
    <footer className="bg-[#030305] pt-24 pb-12 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* High Ticket Final Banner */}
        <div className="precision-glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden mb-20 border border-white/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF85] to-transparent" />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              ¿Listo para Escalar sin Fricción?
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Deja de perder clientes potenciales y recupera el control de tu agenda con sistemas autónomos de élite.
            </p>
            <button
              onClick={onOpenCalendar}
              className="btn-high-ticket inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-base cursor-pointer"
            >
              <Calendar size={18} />
              <span>Agendar mi Auditoría 360°</span>
            </button>
          </div>
        </div>

        {/* Bottom Info Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="HecTechAi Logo"
              width={34}
              height={34}
              className="object-contain opacity-90"
              style={{ mixBlendMode: 'screen' }}
            />
            <div className="font-display font-black text-xl text-white tracking-tighter">
              Hec<span className="text-[#00FF85]">TechAi</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-zinc-400">
            <a href="#servicios" className="hover:text-white transition-colors">4 Motores Core</a>
            <a href="#sobre-nosotros" className="hover:text-white transition-colors">Filosofía</a>
            <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
            <a href="/legal" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="/terms" className="hover:text-white transition-colors">Términos</a>
            <Link href="/dashboard" className="text-[#00FF85] hover:underline font-bold">
              Acceso Clientes
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/hectechai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#00FF85]/40 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="mailto:hectechia@gmail.com"
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#00FF85]/40 transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Swiss Status & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-[11px] font-mono mt-10 pt-6 border-t border-white/5">
          <div>
            © {new Date().getFullYear()} HecTechAi Automation Agency. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] inline-block" />
            <span>ALL SYSTEMS OPERATIONAL · SITGES &amp; GLOBAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- MAIN HOME COMPONENT ---
export default function Home() {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-[#00FF85] selection:text-black">
      <Navbar onOpenCalendar={() => setIsCalendarModalOpen(true)} />
      <Hero onOpenCalendar={() => setIsCalendarModalOpen(true)} />
      <EngineeringTelemetry />
      <Benefits />
      <BentoGrid />
      <Process />
      <TrustBlock />
      <AboutUs />
      
      {/* Live Demo Framed Showcase */}
      <section id="demos" className="py-28 bg-[#050507] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal width="100%">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="swiss-tag justify-center">
                <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
                DEMOS INTERACTIVAS POR SECTOR
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tighter">
                Experimenta el Enjambre <br />
                <span className="text-gradient">En Tiempo Real</span>
              </h2>
              <p className="text-zinc-400 text-base">
                Interactúa con los asistentes simulados para clínicas, inmobiliarias y hostelería.
              </p>
            </div>
          </Reveal>

          {/* Sandbox Real WhatsApp Banner */}
          <Reveal width="100%">
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#00FF85]/10 via-[#00F2FF]/10 to-transparent border border-[#00FF85]/20 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 backdrop-blur-xl">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FF85] uppercase tracking-wider font-bold">
                  <Sparkles size={14} /> Prueba en tu Propio Teléfono
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                  ¿Prefieres comprobar la velocidad en WhatsApp Real?
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 max-w-xl">
                  Envía la palabra <strong className="text-white">&quot;DEMO&quot;</strong> a nuestro WhatsApp oficial y reserva una mesa o cita simulada en 30 segundos.
                </p>
              </div>
              <a
                href="https://wa.me/34654551635?text=DEMO"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-high-ticket whitespace-nowrap px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-lg"
              >
                <span>Chatear por WhatsApp</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal width="100%">
            <div className="precision-glass rounded-3xl p-4 md:p-8 border border-white/10 shadow-2xl">
              <LiveDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <SmartAudit />
      <ROICalculator />
      <FAQ />
      <ContactSection />
      <FloatingCTA onOpenCalendar={() => setIsCalendarModalOpen(true)} />
      <Footer onOpenCalendar={() => setIsCalendarModalOpen(true)} />

      {/* Global Pre-Calendar Modal */}
      <PreCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
    </div>
  );
}
