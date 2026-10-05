'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { submitPreCalendarLeadAction } from '../../app/actions';

interface PreCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendarUrl?: string;
  defaultSector?: string;
}

export function PreCalendarModal({
  isOpen,
  onClose,
  calendarUrl = 'https://calendar.app.google/iSajQABW249gqbvB9',
  defaultSector = 'General',
}: PreCalendarModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [sector, setSector] = useState(defaultSector);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !businessName.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitPreCalendarLeadAction({
        name,
        whatsapp,
        businessName,
        sector,
      });

      // Abrir Google Calendar en nueva pestaña y cerrar modal
      window.open(calendarUrl, '_blank', 'noopener,noreferrer');
      onClose();
    } catch {
      setError('Hubo un error al procesar la solicitud. Redirigiendo...');
      window.open(calendarUrl, '_blank', 'noopener,noreferrer');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#090D16] border border-white/10 shadow-2xl p-6 md:p-8 text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#00FF85]/10 text-[#00FF85] border border-[#00FF85]/20">
              <Calendar size={20} />
            </span>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00FF85] uppercase">
                Auditoría Estratégica 360°
              </span>
              <h3 className="text-xl font-bold tracking-tight">Accede a la Agenda Directa</h3>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mb-6">
            Déjanos tus datos de contacto para que Héctor Barberá prepare el diagnóstico de tu negocio antes de la sesión.
          </p>

          {error && (
            <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1">
                Tu Nombre y Apellidos *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Dr. Carlos Gómez / Ana Martínez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00FF85] focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">
                  Nombre de tu Negocio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Clínica Sitges Dental"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00FF85] focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">
                  Sector Principal
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0d121f] border border-white/10 focus:border-[#00FF85] focus:outline-none text-sm text-white transition-colors"
                >
                  <option value="Hostelería / Restaurante">Restaurante / Gastronomía</option>
                  <option value="Clínica / Salud / Dental">Clínica / Dental / Médica</option>
                  <option value="Estética / Wellness / Barbería">Estética / Spa / Peluquería</option>
                  <option value="Hotel / Villas / Alquiler Turístico">Hotel / Apartamentos / Villas</option>
                  <option value="Servicios Profesionales / B2B">Inmobiliaria / Gestoría / Legal</option>
                  <option value="Otro">Otro Negocio Local</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1">
                WhatsApp de Contacto Directo *
              </label>
              <input
                type="tel"
                required
                placeholder="+34 600 000 000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00FF85] focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-high-ticket w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#00FF85]/10 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Preparando tu Sesión...</span>
                  </>
                ) : (
                  <>
                    <span>Continuar al Calendario Oficial</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 text-center pt-1">
              <ShieldCheck size={14} className="text-[#00FF85]" />
              <span>Sin compromiso. Datos protegidos conforme al RGPD.</span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
