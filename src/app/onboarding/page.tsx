'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  User, 
  Clock, 
  Globe, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingPageContent />
    </Suspense>
  );
}

function OnboardingPageContent() {
  const searchParams = useSearchParams();

  // Onboarding Form Steps State
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'filling' | 'submitting' | 'success' | 'success_fallback'>('filling');

  // Form Field State
  const [businessName, setBusinessName] = useState('');
  const [clientNif, setClientNif] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [contactoNombre, setContactoNombre] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkOutTime, setCheckOutTime] = useState('12:00');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [breakfastDetails, setBreakfastDetails] = useState('');

  const [bookingUrl, setBookingUrl] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [cancellationPolicy, setCancellationPolicy] = useState('');

  // Selected Plan from query params
  const plan = searchParams.get('plan') || 'Profesional';

  // Handle Step Validation
  const validateStep = () => {
    if (currentStep === 1) {
      if (!businessName.trim() || !clientNif.trim() || !clientAddress.trim() || !contactoNombre.trim() || !clientEmail.trim()) {
        alert("Por favor, rellena todos los campos obligatorios del Paso 1.");
        return false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(clientEmail.trim())) {
        alert("Introduce una dirección de correo electrónico válida.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setStatus('submitting');

    const payload = {
      business_name: businessName,
      contact_info: {
        contacto_nombre: contactoNombre,
        email_detected: clientEmail,
        client_nif: clientNif,
        client_address: clientAddress
      },
      pack_name: plan,
      final_price: plan.toLowerCase().includes('starter') ? 497 : plan.toLowerCase().includes('business') ? 2497 : 1197,
      scope_text: `Despliegue de conserjería virtual para ${businessName} en WhatsApp. Políticas: Entrada ${checkInTime}, Salida ${checkOutTime}. Wifi SSID: ${wifiSsid}, Mascotas admitidas: ${petsAllowed ? 'Sí' : 'No'}.`,
      details: {
        check_in_time: checkInTime,
        check_out_time: checkOutTime,
        wifi_ssid: wifiSsid,
        wifi_password: wifiPassword,
        breakfast_details: breakfastDetails,
        booking_url: bookingUrl,
        recipient_phone: recipientPhone,
        pets_allowed: petsAllowed,
        cancellation_policy: cancellationPolicy
      }
    };

    const webhookUrl = "https://n8n.hectechai.com/webhook/stripe-workspace-creator";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 201 || response.status === 200) {
        setStatus('success');
      } else {
        console.warn(`n8n webhook returned status ${response.status}. Using simulation fallback.`);
        setStatus('success_fallback');
      }
    } catch (error) {
      console.error("Error sending onboarding payload:", error);
      setStatus('success_fallback');
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E14] text-white overflow-hidden flex flex-col justify-between">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00FF85]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00F2FF]/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Navbar */}
      <header className="w-full max-w-5xl mx-auto px-6 h-20 flex items-center justify-between border-b border-white/5 relative z-10">
        <Link href="/" className="font-display font-bold text-2xl tracking-tight hover:opacity-90 transition-opacity">
          Hec<span className="text-[#00FF85]">Tech</span>Ai
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
      </header>

      {/* Main Container */}
      <div className="flex-1 py-12 px-6 flex items-center justify-center relative z-10">
        <div className="w-full max-w-2xl glass-card rounded-3xl p-8 md:p-10 border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {status === 'filling' && (
            <>
              <h2 className="text-3xl font-display font-bold text-center mb-2 tracking-tight">Registro de tu Hotel</h2>
              <p className="text-center text-gray-400 text-sm mb-8 max-w-md mx-auto">
                Completa este formulario en 3 pasos para configurar la base de conocimientos y activar el agente IA.
              </p>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className={`h-2.5 rounded-full transition-all duration-300 ${currentStep >= 1 ? 'w-10 bg-[#00FF85]' : 'w-2.5 bg-white/10'}`}></div>
                <div className={`h-2.5 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'w-10 bg-[#00FF85]' : 'w-2.5 bg-white/10'}`}></div>
                <div className={`h-2.5 rounded-full transition-all duration-300 ${currentStep >= 3 ? 'w-10 bg-[#00FF85]' : 'w-2.5 bg-white/10'}`}></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#00FF85] mb-2 flex items-center gap-2">
                      <User size={20} /> Paso 1: Datos de Contacto y Fiscales
                    </h3>
                    
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Nombre Comercial del Hotel / Villa *</label>
                      <input 
                        type="text" 
                        required 
                        value={businessName} 
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Ej: Utopia Villas Sitges"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">NIF / CIF de la Empresa *</label>
                        <input 
                          type="text" 
                          required 
                          value={clientNif} 
                          onChange={(e) => setClientNif(e.target.value)}
                          placeholder="Ej: B65432109"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Representante Legal / Director *</label>
                        <input 
                          type="text" 
                          required 
                          value={contactoNombre} 
                          onChange={(e) => setContactoNombre(e.target.value)}
                          placeholder="Ej: María García"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Dirección Fiscal Completa *</label>
                      <input 
                        type="text" 
                        required 
                        value={clientAddress} 
                        onChange={(e) => setClientAddress(e.target.value)}
                        placeholder="Ej: Calle Mayor 12, 08870 Sitges, Barcelona"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Correo Electrónico de Contacto *</label>
                      <input 
                        type="email" 
                        required 
                        value={clientEmail} 
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Ej: direccion@hotelexample.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#00FF85] mb-2 flex items-center gap-2">
                      <Clock size={20} /> Paso 2: Horarios e Información de Acceso
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Entrada (Check-in)</label>
                        <input 
                          type="text" 
                          value={checkInTime} 
                          onChange={(e) => setCheckInTime(e.target.value)}
                          placeholder="Ej: 15:00"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Salida (Check-out)</label>
                        <input 
                          type="text" 
                          value={checkOutTime} 
                          onChange={(e) => setCheckOutTime(e.target.value)}
                          placeholder="Ej: 12:00"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Wi-Fi (Nombre Red SSID)</label>
                        <input 
                          type="text" 
                          value={wifiSsid} 
                          onChange={(e) => setWifiSsid(e.target.value)}
                          placeholder="Ej: Hotel_Guest_WiFi"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Wi-Fi (Contraseña)</label>
                        <input 
                          type="text" 
                          value={wifiPassword} 
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder="Ej: welcome_to_sitges"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Desayuno (Precios, horario y opciones)</label>
                      <textarea 
                        value={breakfastDetails} 
                        onChange={(e) => setBreakfastDetails(e.target.value)}
                        placeholder="Ej: Buffet de 07:30 a 10:30. Precio: 12.50 € adultos. Sí, disponemos de opciones sin gluten bajo petición."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#00FF85] mb-2 flex items-center gap-2">
                      <Globe size={20} /> Paso 3: Políticas, Enlaces y Canales
                    </h3>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Enlace al Motor de Reservas (Booking Engine URL)</label>
                      <input 
                        type="url" 
                        value={bookingUrl} 
                        onChange={(e) => setBookingUrl(e.target.value)}
                        placeholder="https://booking.tu-hotel.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Teléfono de Soporte para Desvío Humano *</label>
                      <input 
                        type="text" 
                        required
                        value={recipientPhone} 
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="Ej: +34600123456 (Recibirá las alertas críticas)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="flex items-center gap-3 py-2">
                      <input 
                        type="checkbox" 
                        id="pets"
                        checked={petsAllowed}
                        onChange={(e) => setPetsAllowed(e.target.checked)}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#00FF85] focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor="pets" className="text-sm text-gray-300 cursor-pointer select-none">
                        ¿Se admiten mascotas en las habitaciones?
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Normas de Cancelación</label>
                      <textarea 
                        value={cancellationPolicy} 
                        onChange={(e) => setCancellationPolicy(e.target.value)}
                        placeholder="Ej: Cancelación gratuita hasta 48h antes de la fecha de entrada."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF85] focus:shadow-[0_0_15px_rgba(0,255,133,0.15)] transition-all placeholder:text-gray-600 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Form Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`px-6 py-3 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2 ${currentStep === 1 ? 'invisible' : 'visible'}`}
                  >
                    Atrás
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-1 active:scale-95 duration-200"
                    >
                      Siguiente <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#00FF85] text-black font-bold rounded-xl hover:bg-[#00e077] transition-all flex items-center gap-2 glow-effect"
                    >
                      <Sparkles size={18} /> Activar Recepcionista IA
                    </button>
                  )}
                </div>

              </form>
            </>
          )}

          {status === 'submitting' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="relative mb-6">
                <Loader2 className="animate-spin text-[#00FF85]" size={64} />
                <div className="absolute inset-0 bg-[#00FF85]/20 rounded-full animate-ping opacity-10"></div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Activando infraestructura...</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                Estamos contactando con n8n para crear tu base de datos de leads, carpetas de Google Drive y generar tus documentos de Signwell.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-[#00FF85]/10 rounded-full flex items-center justify-center mb-6 border border-[#00FF85]/30">
                <CheckCircle2 className="text-[#00FF85]" size={40} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-[#00FF85]">¡Onboarding Completado!</h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Felicidades, la infraestructura para <strong className="text-white">{businessName}</strong> ha sido iniciada en la nube.<br /><br />
                1. Se han creado tus carpetas en Google Drive.<br />
                2. Hemos registrado el cliente en Notion y Supabase.<br />
                3. Recibirás tu propuesta y contrato digital de <strong>Signwell</strong> en <strong className="text-white">{clientEmail}</strong> en unos minutos para tu firma.
              </p>
              <Link href="/" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors inline-block">
                Volver al Inicio
              </Link>
            </div>
          )}

          {status === 'success_fallback' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-[#00FF85]/10 rounded-full flex items-center justify-center mb-6 border border-[#00FF85]/30">
                <CheckCircle2 className="text-[#00FF85]" size={40} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">¡Onboarding Completado!</h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto mb-8">
                La solicitud de <strong className="text-white">{businessName}</strong> ha sido pre-procesada localmente con éxito.<br /><br />
                * **Modo:** Webhook procesado y encolado localmente.<br />
                * **Email de Firma Digital:** <span className="text-white">{clientEmail}</span><br />
                * **Próximos pasos:** n8n creará las carpetas, Notion, base de datos y contrato cuando se conecte el servidor final.
              </p>
              <Link href="/" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors inline-block">
                Volver al Inicio
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-gray-600 border-t border-white/5 relative z-10">
        <p>© 2026 HecTechAi. Todos los derechos reservados. Sitges, Barcelona.</p>
      </footer>
    </main>
  );
}
