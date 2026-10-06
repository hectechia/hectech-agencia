import { GoogleGenerativeAI } from "@google/generative-ai";

export const auditService = {
  async generateTextAudit(business: string, painPoint: string, _email?: string) {
    const apiKey = process.env.GEMINI_API_KEY;

    const AUDIT_FALLBACK = `🎯 DIAGNÓSTICO OPERATIVO PARA ${business.toUpperCase()}:
• Fuga Principal Detectada: El cuello de botella en "${painPoint}" consume horas de gestión manual y hace que algunos clientes se pierdan por el camino.
• Solución Recomendada HecTechAI: Despliegue de un Agente IA 24/7 integrado con WhatsApp y calendario para automatizar el triaje y confirmación en tiempo real (<3s).
• Impacto: lo cuantificamos contigo en la auditoría gratuita, con tus datos reales (horas semanales ahorradas y leads recuperados).`;

    if (!apiKey) return AUDIT_FALLBACK;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
Eres el Director Estratégico y CTO de HecTechAI, agencia de automatización con IA y desarrollo web cinemático en Garraf / Sitges.
Tu misión es generar un diagnóstico de auditoría quirúrgico, profesional y de alto impacto para un cliente potencial.

Datos del cliente:
- Tipo de Negocio: "${business}"
- Mayor Cuello de Botella Operativo: "${painPoint}"

Genera una respuesta en texto plano (máximo 120 palabras), estructurada exactamente en estos 3 puntos:
1. 🎯 DIAGNÓSTICO DE FUGA: Identifica con precisión técnica por qué "${painPoint}" le hace perder clientes o tiempo en su sector.
2. ⚡ SOLUCIÓN HECTECHAI: Explica qué sistema concreto (Agente WhatsApp 24/7, Recepcionista de Voz Vapi o HecSite Web) resuelve este problema de raíz.
3. 📈 IMPACTO: Indica qué se mediría (horas semanales ahorradas, leads recuperados) y aclara que la cifra exacta se calcula en la auditoría con sus datos. No inventes porcentajes ni cifras.

Sé conciso, técnico, directo y sin rodeos corporativos ni relleno.
`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text() || AUDIT_FALLBACK;
    } catch (error) {
      console.error("Audit Service Error:", error);
      return AUDIT_FALLBACK;
    }
  },

  async generateVisualAudit(url: string, _email?: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

    const DEFAULT_SCREENSHOT = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";

    try {
      let imageUrl = DEFAULT_SCREENSHOT;
      let base64Image = "";

      try {
        const screenshotApiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;
        const response = await fetch(screenshotApiUrl);
        const data = await response.json();
        imageUrl = data.data.screenshot.url || DEFAULT_SCREENSHOT;

        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        base64Image = Buffer.from(imageBuffer).toString('base64');
      } catch (screenshotError) {
        console.warn("Screenshot failed, using placeholder:", screenshotError);
        const imgRes = await fetch(DEFAULT_SCREENSHOT);
        const buf = await imgRes.arrayBuffer();
        base64Image = Buffer.from(buf).toString('base64');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Analiza esta web: ${url}...`;
      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Image, mimeType: "image/png" } }
      ]);

      const fullResponse = await result.response.text();
      const analysis = fullResponse.split('[PROMPT]')[0].replace('[ANALISIS]', '').trim();
      const mockupPrompt = fullResponse.split('[PROMPT]')[1]?.trim() || 'Modern AI Web Design';

      return {
        data: analysis,
        mockupPrompt: mockupPrompt,
        screenshot: imageUrl
      };
    } catch (error) {
      console.error("Visual Audit Service Error:", error);
      throw error;
    }
  }
};
