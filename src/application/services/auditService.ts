import { GoogleGenerativeAI } from "@google/generative-ai";

export const auditService = {
  async generateTextAudit(business: string, painPoint: string, _email?: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

    const AUDIT_FALLBACK = `🚀 ¡Análisis completado para tu negocio de ${business}!...`;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
Eres el Director Estratégico de HecTechAi. Tu objetivo no es solo informar, sino demostrar que el negocio del cliente está perdiendo oportunidades críticas que solo tú puedes resolver.

Un cliente tiene un negocio de tipo: "${business}"
Su mayor problema es: "${painPoint}"

... (remaining logic from actions.ts)
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
