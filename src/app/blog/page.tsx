import React from 'react';
import { Metadata } from 'next';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog de Automatización y Casos de Uso | HecTechAi',
  description: 'Aprende a automatizar tu clínica, restaurante o agencia inmobiliaria. Casos reales, guías paso a paso y tutoriales de n8n para dueños de negocio.',
};

export default function BlogHome() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pt-24 pb-12">
      <main className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <span className="inline-block text-[#00FF85] text-xs font-black uppercase tracking-[0.3em] mb-4 px-4 py-2 rounded-full border border-[#00FF85]/20 bg-[#00FF85]/5">
            Blog & Casos de Estudio
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 font-display">
            Aprende a Escalar con <span className="text-gradient">Inteligencia Artificial</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Descubre cómo otras PYMES están utilizando agentes inteligentes y flujos automatizados para reducir costes y multiplicar sus ventas. Sin tecnicismos.
          </p>
        </header>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Post Placeholder 1 */}
          <article className="glass-card rounded-2xl border border-white/10 overflow-hidden group hover:border-[#00FF85]/30 transition-colors cursor-pointer flex flex-col h-full">
            <div className="aspect-video bg-[#111] relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              <span className="text-gray-600 text-5xl opacity-50"><BookOpen /></span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#00FF85] text-black text-xs font-bold px-3 py-1 rounded-full">Sanidad Privada</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Clock size={14} /> <span>Lectura: 5 min</span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-white font-display group-hover:text-[#00FF85] transition-colors">
                7 Maneras en que tu Clínica Dental Pierde Dinero Cada Día (y Cómo una IA lo Soluciona)
              </h2>
              <p className="text-gray-400 text-sm mb-6 flex-grow">
                Un análisis exhaustivo sobre los costes ocultos en la gestión de reservas, seguimiento de pacientes y facturación en clínicas dentales...
              </p>
              <div className="flex items-center gap-2 text-[#00FF85] font-bold text-sm mt-auto">
                Leer artículo completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
 
          {/* Post Placeholder 2 */}
          <article className="glass-card rounded-2xl border border-white/10 overflow-hidden group hover:border-[#00FF85]/30 transition-colors cursor-pointer flex flex-col h-full">
            <div className="aspect-video bg-[#111] relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              <span className="text-gray-600 text-5xl opacity-50"><BookOpen /></span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#00F2FF] text-black text-xs font-bold px-3 py-1 rounded-full">Inmobiliaria</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Clock size={14} /> <span>Lectura: 7 min</span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-white font-display group-hover:text-[#00F2FF] transition-colors">
                Cómo Automatizar la Captación de Leads en WhatsApp sin Perder el Toque Humano
              </h2>
              <p className="text-gray-400 text-sm mb-6 flex-grow">
                Descubre cómo las inmobiliarias top están utilizando agentes IA para pre-cualificar clientes y agendar visitas 24/7 de forma personalizada...
              </p>
              <div className="flex items-center gap-2 text-[#00F2FF] font-bold text-sm mt-auto">
                Leer artículo completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
 
          {/* Post Placeholder 3 */}
          <article className="glass-card rounded-2xl border border-white/10 overflow-hidden group hover:border-[#00FF85]/30 transition-colors cursor-pointer flex flex-col h-full">
            <div className="aspect-video bg-[#111] relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              <span className="text-gray-600 text-5xl opacity-50"><BookOpen /></span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#00F2FF] text-black text-xs font-bold px-3 py-1 rounded-full">Tecnología Base</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Clock size={14} /> <span>Lectura: 8 min</span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-white font-display group-hover:text-[#00F2FF] transition-colors">
                ¿Qué es n8n y por qué es mejor que Zapier para tu PYME?
              </h2>
              <p className="text-gray-400 text-sm mb-6 flex-grow">
                Rompiendo mitos: una comparativa real de costes, escalabilidad y potencia entre las herramientas de automatización más populares...
              </p>
              <div className="flex items-center gap-2 text-[#00F2FF] font-bold text-sm mt-auto">
                Leer artículo completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
