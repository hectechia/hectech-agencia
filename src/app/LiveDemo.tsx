'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Building2, Stethoscope, Utensils, Sparkles, Bot, Send } from 'lucide-react';

type MessageType = {
    id: string;
    role: 'bot' | 'user';
    text?: string;
    type: 'text' | 'image' | 'custom';
    imageUrl?: string;
    imageCaption?: string;
    options?: string[];
};

type Scenario = {
    id: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
    botName: string;
    botRole: string;
    avatar: string;
    themeColor: string;
    steps: {
        botMessages: Omit<MessageType, 'id'>[];
        userOptions?: string[];
    }[];
};

const SCENARIOS: Scenario[] = [
    {
        id: 'inmobiliaria',
        icon: <Building2 size={24} />,
        title: 'Inmobiliaria',
        desc: 'Agendamiento y pre-cualificación',
        botName: 'Laura',
        botRole: 'Agente Inmobiliaria',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-U7EaROV4OPsXAzuurdij-wy7gQqEy5l9czWEleSJVxWuUHeOXKSZMZgEqxarOGcoZ-Whjz6smLUTIIOVueCL1WAkd0KgDBUXV5-ZajdhMyKSIvn2NnCZtDv5N9aa8GxKlg_Z_GJQCXucNkWom4BdgLc6ltin17yCZQyRR-N_teqqkFGuh3X6A_u5SrPS2v0mm7gceg74d2aMla6uarD-bDEg88KuHXJSAY35xRjo9NXcfCr0cO282mLR0qgSWjEk9Z7rvJ5LoIcq',
        themeColor: 'primary',
        steps: [
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: '¡Hola! Bienvenido a Luxury Homes. 👋 Soy Laura, tu agente IA. ¿Buscas comprar o alquilar?' }
                ],
                userOptions: ['Busco alquilar', 'Quiero comprar']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: 'Perfecto. Tengo un par de opciones exclusivas que aún no hemos subido a portales. ¿Qué zonas te interesan y cuál es tu presupuesto mensual?' }
                ],
                userOptions: ['Centro, máx 1200€', 'Avenidas, máx 900€']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: 'Justo acaba de entrar este ático en el centro. 2 habitaciones, terraza amplia y mucha luz natural.' },
                    { role: 'bot', type: 'image', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy30TK20YTGauAORjMEHK5vxoq1h8EYsf8f5pvrTberwMapYrlgMqJiNaQlBZvAyfj1_FZq8b5f8s6nfkiU42XJzaDwYRlKf2JmnNsA6uK_bPqw-2Wgx3R1HJ7ULxCUDtjvv3c3Zbba4wbSSdt0fWqXJ2tIdMxYIGmzK0236VtelTWueFnbCP95EF-HLEq9tLwK4qh0LqO66ca-MBi2J59AvfbxR1JATq4HnBvsEAGxBN5NVmQnK70qSeo-B_-rHpXnjKTyjzsieVi', imageCaption: 'Edificio Skyline - 1,150€/mes' },
                    { role: 'bot', type: 'text', text: '¿Te gustaría agendar una visita presencial para este viernes?' }
                ],
                userOptions: ['Sí, viernes por la mañana', 'Prefiero el jueves']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: '¡Genial! Visita confirmada para el viernes a las 10:30 AM ✅. Te acabo de enviar un WhatsApp automático con la ubicación exacta.' }
                ]
            }
        ]
    },
    {
        id: 'clinicas',
        icon: <Stethoscope size={24} />,
        title: 'Clínicas',
        desc: 'Gestión de citas y triaje',
        botName: 'Clínica Sanitas',
        botRole: 'Recepción 24/7',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2BUNj5MUEF7mc57eBwNCgtI4Hy9mS3_ou1dUgEdEdD7LZvXMe4XcKZpYHFYg5S86JoqR_IvXurSHTaZgMNrZc2NwZVE2ak41h1KAo0UWWXQ0hhEd5rk3bF_wAcaXFT_ckOryNrPxNChkbAVe2KKmU3g4oXyADtO-CYjnbWwHOikKcYRXb_g_CrWsKbiGWL3T4S8Q7bt9gNxc8Q2uhA5HRQLR5-qhjVnWvNPF9EhT2WXftZlfT18k7CNWh1lCGt_OGdqne236Og6V1',
        themeColor: 'teal-400',
        steps: [
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: 'Buenas tardes. Gracias por contactar con Clínica Sanitas. ¿En qué podemos ayudarte hoy?' }
                ],
                userOptions: ['Agendar nueva cita', 'Modificar mi cita', 'Precios']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: 'Para agendar, por favor indícame la especialidad o el nombre del doctor si lo conoces.' }
                ],
                userOptions: ['Dermatología', 'Odontología']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: 'La Dra. Martínez (Dermatología) tiene los siguientes huecos libres esta semana:' },
                    { role: 'bot', type: 'custom', options: ['Jueves 10:00 AM', 'Viernes 4:30 PM'] }
                ],
                userOptions: ['El viernes a las 4:30 PM']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: 'Cita reservada con éxito ✅. Acabo de enviarte un WhatsApp con las indicaciones para llegar y tu código de reserva. ¡Te esperamos!' }
                ]
            }
        ]
    },
    {
        id: 'restaurantes',
        icon: <Utensils size={24} />,
        title: 'Restaurantes',
        desc: 'Reservas y menú inteligente',
        botName: 'Bistro Central',
        botRole: 'Maitre Virtual',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClKIidRlBRKjgzZgHvAUdUt62uKXL043heUu2on_6VTdjinUqp5FHO2ozHaur0EZMDqZ8IScbgRSkZ7OtsEyZhnKZZwCZVvyEFSorVxiCu0ZnVCfVcqhG4nFYMCMM8OsKklZQLYGC6TcxFQvkXJUANGbd9BOgpcnfJ-Gmp3CWs_5XZxyflMkEHHKq3jJQYN14K0VwJhUZtpmK-e1FEs82A1COn8YxXzCtwDwJPRpQKvenzZf1B0OxVUCgKhwrwpaFhoqRAfk0XIPyQ',
        themeColor: 'orange-500',
        steps: [
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: '¡Hola! 🍷 Bienvenido a Bistro Central. ¿Deseas hacer una reserva o consultar nuestra carta?' }
                ],
                userOptions: ['Mesa para 4, este sábado', 'Ver la carta de vinos']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: '¡Claro! Tengo mesas disponibles en nuestra Terraza Climatizada a las 20:00 y a las 21:30. ¿Cuál prefieres?' }
                ],
                userOptions: ['A las 21:30 en terraza']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: '¡Perfecto! Mesa para 4 reservada. 🎉 Además, mencionarte que este finde tenemos 2x1 en cócteles.' },
                    { role: 'bot', type: 'text', text: '¿Hay alguna alergia o intolerancia alimentaria que debamos saber en tu grupo?' }
                ],
                userOptions: ['Una persona es celíaca', 'Todo bien, sin alergias']
            },
            {
                botMessages: [
                    { role: 'bot', type: 'text', text: 'Anotado. Nuestro chef preparará opciones sin gluten (contaminación cruzada controlada). ¡Nos vemos el sábado!' }
                ]
            }
        ]
    }
];

export default function LiveDemo() {
    const [activeTab, setActiveTab] = useState(SCENARIOS[0].id);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [inputText, setInputText] = useState('');
    
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const activeScenario = SCENARIOS.find(s => s.id === activeTab) || SCENARIOS[0];

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initialize conversation when tab changes
    useEffect(() => {
        setMessages([]);
        setCurrentStep(0);
        setIsTyping(true);
        
        const timer = setTimeout(() => {
            const initialMessages = activeScenario.steps[0].botMessages.map(m => ({ ...m, id: Math.random().toString() }));
            setMessages(initialMessages);
            setIsTyping(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [activeTab, activeScenario]);

    const handleUserMessage = (text: string) => {
        if (!text.trim() || isTyping) return;

        // Add user message
        const newUserMsg: MessageType = { id: Math.random().toString(), role: 'user', type: 'text', text };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');
        setIsTyping(true);

        // Calculate next step
        const nextStepIdx = currentStep + 1;
        
        if (nextStepIdx < activeScenario.steps.length) {
            const nextStep = activeScenario.steps[nextStepIdx];
            
            // Simulate variable typing delay based on message length
            const textLen = nextStep.botMessages[0]?.text?.length || 20;
            const delay = Math.max(800, Math.min(2500, textLen * 18));

            setTimeout(() => {
                const botMsgs = nextStep.botMessages.map(m => ({ ...m, id: Math.random().toString() }));
                setMessages(prev => [...prev, ...botMsgs]);
                setCurrentStep(nextStepIdx);
                setIsTyping(false);
            }, delay);
        } else {
            // End of script
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Math.random().toString(), role: 'bot', type: 'text', text: '¡Gracias por probar esta demo! Así de rápido y efectivo podría ser el asistente IA de tu negocio. Agenda una auditoría gratuita y hablemos.' }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUserMessage(inputText);
    };

    return (
        <section id="demo" className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-circuit-pattern opacity-[0.15] pointer-events-none"></div>
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-[#00FF94]/10 rounded-full blur-[150px] pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block text-[#00FF94] text-xs font-black uppercase tracking-[0.3em] mb-4 px-4 py-2 rounded-full border border-[#00FF94]/20 bg-[#00FF94]/5">
                        Interactivo
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
                        Prueba nuestros <br />
                        <span className="text-gradient">Agentes de IA en vivo</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-400">
                        Selecciona tu industria, elige una opción rápida o escribe tu mensaje. Siente la experiencia que tendrán tus clientes.
                    </p>
                </div>

                <div className="bg-[#050505] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,255,148,0.05)] overflow-hidden premium-border max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">
                        
                        {/* Sidebar */}
                        <div className="lg:col-span-4 bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-white/5 p-6 flex flex-col">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Elige el sector</h3>
                            <div className="space-y-3 flex-1">
                                {SCENARIOS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-4 transition-all duration-300 group
                                            ${activeTab === tab.id
                                                ? 'bg-white/10 shadow-lg border border-white/10'
                                                : 'hover:bg-white/5 border border-transparent'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors 
                                            ${activeTab === tab.id ? 'bg-[#00FF94]/20 text-[#00FF94]' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                            {tab.icon}
                                        </div>
                                        <div>
                                            <span className={`block font-bold text-sm ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                {tab.title}
                                            </span>
                                            <span className="text-xs text-gray-500 mt-0.5 block">{tab.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 p-5 bg-gradient-to-br from-[#00FF94]/10 to-transparent border border-[#00FF94]/20 rounded-2xl">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="text-[#00FF94]" size={20} />
                                    <div>
                                        <p className="text-sm font-bold text-white">100% Personalizable</p>
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Entrenamos a la IA con los datos y el tono exacto de tu empresa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="lg:col-span-8 bg-[#111111] relative flex flex-col h-[500px] lg:h-auto">
                            {/* Header */}
                            <div className="p-4 px-6 border-b border-white/5 flex items-center justify-between bg-[#111] z-10 sticky top-0 backdrop-blur-md">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Image alt={activeScenario.botName} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" src={activeScenario.avatar} width={48} height={48} />
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00FF94] border-2 border-[#111] rounded-full animate-pulse"></span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">{activeScenario.botName}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{activeScenario.botRole}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                    <span className="w-2 h-2 rounded-full bg-[#00FF94]"></span>
                                    Simulación
                                </div>
                            </div>
                            
                            {/* Messages */}
                            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 scroll-smooth bg-[#0a0a0a]/50">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                        {msg.role === 'bot' && (
                                            <div className="w-8 h-8 rounded-full bg-[#00FF94]/20 flex items-center justify-center text-[#00FF94] flex-shrink-0 mb-1">
                                                <Bot size={16} />
                                            </div>
                                        )}
                                        
                                        <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            {msg.type === 'text' && (
                                                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm
                                                    ${msg.role === 'user' 
                                                        ? 'bg-[#00FF94] text-black rounded-br-sm' 
                                                        : 'bg-[#1a1a1a] text-gray-200 rounded-bl-sm border border-white/5'}`}>
                                                    <p>{msg.text}</p>
                                                </div>
                                            )}
                                            
                                            {msg.type === 'image' && (
                                                <div className="bg-[#1a1a1a] p-2 rounded-2xl rounded-bl-sm border border-white/5 overflow-hidden group w-64 shadow-xl">
                                                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-2">
                                                        <Image src={msg.imageUrl!} alt="Imagen enviada" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                    {msg.imageCaption && <p className="text-xs text-gray-400 px-2 pb-1 font-medium">{msg.imageCaption}</p>}
                                                </div>
                                            )}

                                            {msg.type === 'custom' && msg.options && (
                                                <div className="flex flex-col gap-2 mt-1 w-full max-w-[250px]">
                                                    {msg.options.map((opt, i) => (
                                                        <button key={i} disabled className="px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm font-medium text-white text-center">
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="flex items-end gap-3 animate-in fade-in">
                                        <div className="w-8 h-8 rounded-full bg-[#00FF94]/20 flex items-center justify-center text-[#00FF94] flex-shrink-0 mb-1">
                                            <Bot size={16} />
                                        </div>
                                        <div className="bg-[#1a1a1a] px-4 py-5 rounded-2xl rounded-bl-sm border border-white/5 flex gap-1.5 shadow-sm">
                                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Options (Suggested Replies) */}
                            {!isTyping && activeScenario.steps[currentStep]?.userOptions && (
                                <div className="px-6 py-3 border-t border-white/5 bg-[#111] flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
                                    {activeScenario.steps[currentStep].userOptions.map((opt, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleUserMessage(opt)}
                                            className="whitespace-nowrap px-4 py-2 bg-[#1a1a1a] hover:bg-[#00FF94]/10 border border-white/10 hover:border-[#00FF94]/30 rounded-full text-xs font-bold text-gray-300 hover:text-[#00FF94] transition-all duration-300 shadow-sm"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="p-4 px-6 border-t border-white/5 bg-[#111] mt-auto">
                                <form onSubmit={handleFormSubmit} className="relative flex items-center">
                                    <input
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        disabled={isTyping}
                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-[#00FF94]/50 transition-colors disabled:opacity-50"
                                        placeholder={isTyping ? "El agente está escribiendo..." : "Escribe tu mensaje o selecciona una opción..."}
                                        type="text"
                                    />
                                    <button 
                                        type="submit"
                                        disabled={!inputText.trim() || isTyping}
                                        className="absolute right-2 bg-[#00FF94] text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00cc76] transition-colors disabled:opacity-50 disabled:hover:bg-[#00FF94]"
                                    >
                                        <Send size={16} className="ml-1" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
