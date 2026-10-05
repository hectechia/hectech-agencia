'use client'

import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Clock, Loader2 } from 'lucide-react'
import { submitAuditRequest, type AuditFormPayload } from './actions'

const BUSINESS_TYPES: { value: NonNullable<AuditFormPayload['businessType']>; label: string }[] = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'bar', label: 'Bar' },
  { value: 'otro', label: 'Otro' },
]

export function AuditForm() {
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [preview, setPreview] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const payload: AuditFormPayload = {
      email: fd.get('email') as string,
      businessName: fd.get('business_name') as string,
      website: fd.get('website') as string,
      caseDescription: fd.get('case_description') as string,
      businessType: (fd.get('business_type') as AuditFormPayload['businessType']) || undefined,
      utm: {
        source: searchParams.get('utm_source') || undefined,
        medium: searchParams.get('utm_medium') || undefined,
        campaign: searchParams.get('utm_campaign') || undefined,
      },
    }

    const result = await submitAuditRequest(payload)

    if (result.ok) {
      setPreview(result.preview)
      setStatus('done')
    } else {
      setErrorMsg(result.error)
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card premium-border p-8 md:p-10 rounded-3xl border border-white/10"
      >
        {preview && (
          <div className="mb-8 p-6 bg-white/5 border border-[#00FF94]/20 rounded-2xl">
            <h4 className="text-[#00FF94] font-bold mb-3 flex items-center gap-2 uppercase tracking-wider text-sm">
              <Sparkles size={16} /> Preview de tu auditoría
            </h4>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{preview}</p>
          </div>
        )}
        <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#00FF94]/30 bg-[#00FF94]/5">
          <Mail className="text-[#00FF94] shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg mb-1 text-white">Informe completo en camino</h3>
            <p className="text-gray-400 text-sm">
              En 2-3 minutos recibirás por email un informe detallado: diagnóstico, 3
              oportunidades concretas y un plan de 30 días para tu negocio.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="glass-card premium-border p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Nombre de tu negocio *</label>
          <input
            name="business_name"
            type="text"
            required
            placeholder="Ej. Hotel Casa del Mar"
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Tipo de negocio</label>
          <select
            name="business_type"
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none transition-colors"
            defaultValue=""
          >
            <option value="">Selecciona...</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">URL de tu web *</label>
        <input
          name="website"
          type="text"
          required
          placeholder="https://tuwebsite.com"
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Cuéntanos tu caso *</label>
        <textarea
          name="case_description"
          required
          minLength={20}
          maxLength={1500}
          rows={4}
          placeholder="Ej. Recibimos muchas reservas por WhatsApp fuera de horario y perdemos huéspedes porque no respondemos a tiempo..."
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Tu email *</label>
        <input
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#00FF94] focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#00FF94] text-black font-bold py-4 rounded-xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-effect flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Analizando tu caso...
          </>
        ) : (
          <>
            <Sparkles size={20} /> Quiero mi auditoría gratis
          </>
        )}
      </button>

      {status === 'error' && <p className="text-sm text-red-400 text-center">{errorMsg}</p>}

      <p className="text-xs text-white/30 text-center flex items-center justify-center gap-1.5">
        <Clock size={12} /> Preview al momento · Informe completo por email en 2-3 minutos
      </p>
    </form>
  )
}
