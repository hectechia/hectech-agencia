'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Globe,
  PhoneCall,
  MessageSquare,
  Activity,
  ArrowRight,
  Zap,
  CheckCircle2,
  Calendar,
  Volume2,
  VolumeX,
  Database,
  Cpu,
  ShieldCheck,
  Search
} from 'lucide-react';

export const BentoGrid: React.FC = () => {
  // Módulo 1: 3D Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({
      x: rotateX,
      y: rotateY,
      shineX: (x / rect.width) * 100,
      shineY: (y / rect.height) * 100,
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
  };

  // Módulo 2: Voice AI Simulator State
  const [isCalling, setIsCalling] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0);

  const voiceConversation = [
    { speaker: 'Cliente', text: 'Hola, buenas tardes. Necesito una mesa para 4 este sábado a las 21:30.' },
    { speaker: 'Vapi Voice Agent', text: '¡Buenas tardes! Confirmando disponibilidad en salón principal para 4 personas a las 21:30... Mesa reservada con éxito.' },
    { speaker: 'Sistema', text: 'Confirmación SMS/WhatsApp enviada y sincronizada en Supabase con Tenant ID restaurante-sitges.' }
  ];

  const toggleCall = () => {
    if (isCalling) {
      setIsCalling(false);
      setVoiceStep(0);
    } else {
      setIsCalling(true);
      setVoiceStep(0);
      const timer1 = setTimeout(() => setVoiceStep(1), 1800);
      const timer2 = setTimeout(() => setVoiceStep(2), 3800);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  };

  // Módulo 4: Scanner Interactive State
  const [scanningUrl, setScanningUrl] = useState('clinicadental-sitges.es');
  const [scanProgress, setScanProgress] = useState<'idle' | 'scanning' | 'done'>('done');
  const [scanResult, setScanResult] = useState({
    speed: '4.6s (Lenta)',
    bounce: '~38% rebote',
    leakage: '2.400€/mes',
    status: 'bad'
  });

  const runQuickScan = () => {
    if (!scanningUrl.trim()) return;
    setScanProgress('scanning');

    setTimeout(() => {
      const clean = scanningUrl.toLowerCase().trim();
      let hash = 0;
      for (let i = 0; i < clean.length; i++) {
        hash = (hash << 5) - hash + clean.charCodeAt(i);
        hash |= 0;
      }
      const abs = Math.abs(hash);
      const isFast = clean.includes('google') || clean.includes('apple') || clean.includes('hectech') || clean.includes('vercel');

      if (isFast) {
        setScanResult({
          speed: '0.8s (Óptima)',
          bounce: '<12% rebote',
          leakage: '0€ / mes',
          status: 'good'
        });
      } else {
        const sec = (3.2 + (abs % 25) / 10).toFixed(1);
        const bounceRate = 28 + (abs % 20);
        const lossAmount = (1200 + (abs % 18) * 100).toLocaleString();
        setScanResult({
          speed: `${sec}s (Mejorable)`,
          bounce: `~${bounceRate}% rebote`,
          leakage: `${lossAmount}€/mes`,
          status: 'bad'
        });
      }
      setScanProgress('done');
    }, 1200);
  };

  return (
    <section id="servicios" className="py-24 relative bg-[#050507] overflow-hidden">
      {/* Ambient background halos */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 halo-emerald blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 halo-cyan blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="swiss-tag">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse inline-block" />
            INFRAESTRUCTURA DE ALTO RENDIMIENTO · 4 MOTORES CORE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter font-display max-w-3xl">
            Ingeniería de Escala <br />
            <span className="text-gradient">Sin Fricción Operativa</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Eliminamos el software genérico y las horas manuales sustituyéndolos por sistemas autónomos construidos para dominar tu mercado local.
          </p>
        </div>

        {/* Bento Grid Layout (12 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ========================================================
              MÓDULO 1 (Col-span 7 / Principal): HecSite Cinematic Web
              ======================================================== */}
          <div
            ref={cardRef}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="lg:col-span-7 precision-glass p-8 md:p-10 rounded-3xl relative overflow-hidden group flex flex-col justify-between"
          >
            {/* Specular light follower */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle 350px at ${tilt.shineX}% ${tilt.shineY}%, rgba(0, 255, 133, 0.08), transparent)`,
              }}
            />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#00FF85]">
                    <Globe size={24} />
                  </div>
                  <div>
                    <div className="swiss-tag text-[10px]">MOTOR 01 · WEB CINEMÁTICA</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
                      HecSite SaaS
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#00FF85]/10 border border-[#00FF85]/30 text-[#00FF85] flex items-center gap-1.5">
                  <Activity size={12} /> SSR Next.js
                </span>
              </div>

              <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl">
                Experiencias web cinemáticas diseñadas exclusivamente para <strong className="text-white">Restaurantes</strong> y <strong className="text-white">Centros</strong> (clínicas, estética, fitness). Carga sub-segundo, motor de reservas integrado y sincronización en tiempo real.
              </p>

              {/* Floating Mockup Preview with 3D feel */}
              <div className="relative rounded-2xl bg-[#08080c] border border-white/10 p-5 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 text-xs text-zinc-500 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-zinc-400">hecsite.internal/engine/preview</span>
                  </div>
                  <span className="text-[#00FF85]">SSR Next.js 16</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-mono">Core Web Vitals</div>
                    <div className="text-xl font-bold text-white mt-1">Optimizada</div>
                    <div className="text-[11px] text-[#00FF85] flex items-center gap-1 mt-0.5">
                      <CheckCircle2 size={11} /> Diseño mobile-first
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-mono">Motor de Citas</div>
                    <div className="text-xl font-bold text-white mt-1">Instant Booking</div>
                    <div className="text-[11px] text-[#00F2FF] flex items-center gap-1 mt-0.5">
                      <Calendar size={11} /> Recordatorios automáticos
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-mono">Reservas</div>
                    <div className="text-xl font-bold text-white mt-1">24/7</div>
                    <div className="text-[11px] text-[#00FF85] flex items-center gap-1 mt-0.5">
                      <Zap size={11} /> sin llamadas
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 mt-6">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85]" />
                Multi-tenant con Supabase RLS y Stripe
              </div>
              <Link
                href="/servicios/desarrollo-web"
                className="inline-flex items-center gap-2 text-[#00FF85] font-bold text-sm hover:gap-3 transition-all group/link"
              >
                Conocer HecSite
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ========================================================
              MÓDULO 2 (Col-span 5): Agentes Telefónicos de Voz 24/7
              ======================================================== */}
          <div className="lg:col-span-5 precision-glass p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#00F2FF]">
                    <PhoneCall size={24} />
                  </div>
                  <div>
                    <div className="swiss-tag text-[10px]">MOTOR 02 · VAPI INTEGRATION</div>
                    <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                      Voz IA 24/7
                    </h3>
                  </div>
                </div>
                <button
                  onClick={toggleCall}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isCalling
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 hover:bg-[#00F2FF]/20'
                  }`}
                >
                  {isCalling ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  {isCalling ? 'Colgar Simulación' : 'Llamada en Vivo'}
                </button>
              </div>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                Recepcionistas de voz que atienden llamadas entrantes, responden dudas frecuentes y programan reservas directamente en tu calendario.
              </p>

              {/* Oscillating Audio Wave Visualizer */}
              <div className="p-4 rounded-2xl bg-[#08080c] border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isCalling ? 'bg-[#00FF85] animate-ping' : 'bg-zinc-600'}`} />
                    {isCalling ? 'Conexión Telefónica Activa' : 'Canal en Espera'}
                  </span>
                  <span className="text-[#00F2FF]">Demo simulada</span>
                </div>

                {/* Animated Bars */}
                <div className="h-10 flex items-center justify-center gap-1.5 bg-black/40 rounded-xl px-4">
                  {[12, 24, 8, 32, 18, 28, 14, 22, 36, 16, 26, 10, 30, 20, 15, 25, 34, 18, 28].map((h, idx) => (
                    <div
                      key={idx}
                      className="w-1 rounded-full bg-[#00F2FF] transition-all duration-300"
                      style={{
                        height: isCalling ? `${Math.max(6, (h * (voiceStep + 1)) % 32)}px` : '6px',
                        opacity: isCalling ? 0.9 : 0.25,
                      }}
                    />
                  ))}
                </div>

                {/* Live Transcript Display */}
                <div className="text-xs font-mono p-3 rounded-xl bg-white/[0.02] border border-white/5 min-h-[58px] flex items-center">
                  {isCalling ? (
                    <div className="space-y-1 w-full animate-in fade-in duration-300">
                      <span className="text-[#00FF85] font-bold">[{voiceConversation[voiceStep].speaker}]:</span>{' '}
                      <span className="text-zinc-200">{voiceConversation[voiceStep].text}</span>
                    </div>
                  ) : (
                    <span className="text-zinc-500 italic">Haz clic en &apos;Llamada en Vivo&apos; para simular la conversación.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Atiende también en festivos</span>
              <Link
                href="/servicios/agentes-ia"
                className="inline-flex items-center gap-2 text-[#00F2FF] font-bold text-sm hover:gap-3 transition-all"
              >
                Auditar canal de voz <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* ========================================================
              MÓDULO 3 (Col-span 6): Enjambre WhatsApp Multi-Tenant
              ======================================================== */}
          <div className="lg:col-span-6 precision-glass p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#00FF85]">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <div className="swiss-tag text-[10px]">MOTOR 03 · WAHA & N8N CORE</div>
                    <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                      Enjambre WhatsApp
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#00FF85]/10 border border-[#00FF85]/30 text-[#00FF85]">
                  &lt;1s Latencia
                </span>
              </div>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                Chatbots multi-inquilino conectados directamente a <strong className="text-white">Supabase RLS</strong> y orquestados mediante flujos n8n. Respuestas contextuales instantáneas, envío de PDFs y confirmación automática.
              </p>

              {/* Chat Interface Mockup */}
              <div className="rounded-2xl bg-[#08080c] border border-white/10 p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Database size={12} className="text-[#00FF85]" />
                    <span>tenant_id: garraf_rentals_04</span>
                  </div>
                  <span className="text-[#00FF85]">CRM Sync: OK</span>
                </div>

                {/* Simulated Conversation */}
                <div className="space-y-2">
                  <div className="bg-white/5 text-zinc-300 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                    ¿Tenéis disponibilidad para la villa en Sitges del 12 al 15 de Octubre?
                    <div className="text-[9px] text-zinc-500 mt-1 text-right">18:42 · Leído</div>
                  </div>
                  <div className="bg-[#00FF85]/10 border border-[#00FF85]/20 text-white p-3 rounded-2xl rounded-tr-none ml-auto max-w-[85%]">
                    ¡Hola! Sí, Villa Garraf está disponible. Capacidad: 8 huéspedes. Tarifa total: 1.450€. ¿Quieres bloquear la reserva sin comisiones de portal?
                    <div className="text-[9px] text-[#00FF85] mt-1 text-right">18:42 · Enviado ✓</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <Cpu size={14} className="text-[#00FF85]" />
                Webhook Twilio / WAHA
              </div>
              <Link
                href="/servicios/agentes-ia"
                className="inline-flex items-center gap-2 text-[#00FF85] font-bold text-sm hover:gap-3 transition-all"
              >
                Ver arquitectura <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* ========================================================
              MÓDULO 4 (Col-span 6): Auditoría Digital 360° Automatizada
              ======================================================== */}
          <div className="lg:col-span-6 precision-glass p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FFB800]">
                    <Activity size={24} />
                  </div>
                  <div>
                    <div className="swiss-tag text-[10px]">MOTOR 04 · DIAGNÓSTICO B2B</div>
                    <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                      Auditoría Digital 360°
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800]">
                  Demo ilustrativa
                </span>
              </div>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                Simulación de lo que revisamos en la auditoría: tiempo de carga, abandono en móvil, velocidad de respuesta y fugas de ingresos. Las cifras de esta demo son ilustrativas; el análisis real lo hacemos con tus datos.
              </p>

              {/* Interactive Quick Scanner */}
              <div className="rounded-2xl bg-[#08080c] border border-white/10 p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <Search size={14} className="text-zinc-500" />
                    <input
                      type="text"
                      value={scanningUrl}
                      onChange={(e) => setScanningUrl(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-white"
                      placeholder="tudominio.com"
                    />
                  </div>
                  <button
                    onClick={runQuickScan}
                    disabled={scanProgress === 'scanning'}
                    className="px-4 py-2 bg-[#FFB800] text-black rounded-xl font-bold text-xs hover:bg-[#ffc83b] transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    {scanProgress === 'scanning' ? 'Analizando...' : 'Escanear Fugas'}
                  </button>
                </div>

                {/* Scan Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-500">VELOCIDAD</div>
                    <div className={`text-sm font-bold mt-0.5 ${scanResult.status === 'good' ? 'text-[#00FF85]' : 'text-red-400'}`}>
                      {scanResult.speed}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-500">LEADS PERDIDOS</div>
                    <div className={`text-sm font-bold mt-0.5 ${scanResult.status === 'good' ? 'text-[#00FF85]' : 'text-[#FFB800]'}`}>
                      {scanResult.bounce}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-500">FUGA MENSUAL</div>
                    <div className={`text-sm font-bold mt-0.5 ${scanResult.status === 'good' ? 'text-[#00FF85]' : 'text-red-400'}`}>
                      {scanResult.leakage}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <ShieldCheck size={14} className="text-[#FFB800]" />
                Diagnóstico 100% Gratuito
              </div>
              <a
                href="#auditoria-ia"
                className="inline-flex items-center gap-2 text-[#FFB800] font-bold text-sm hover:gap-3 transition-all"
              >
                Lanzar Auditoría Completa <ArrowRight size={16} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
