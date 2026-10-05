import nodemailer from 'nodemailer';

// Singleton transporter instance to avoid overhead in each request
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export type AuditRequestPayload = {
  email: string;
  businessName: string;
  website: string;
  caseDescription: string;
  businessType?: 'hotel' | 'restaurante' | 'bar' | 'otro';
  utm?: { source?: string; medium?: string; campaign?: string };
};

export const leadService = {
  async submitLead(leadData: { name: string; email: string; phone?: string; message?: string }) {
    const { name, email, phone, message } = leadData;
    const operations: Promise<unknown>[] = [];

    // 1. Preparar operación Webhook n8n
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      operations.push(
        fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lead_source: 'web_contact_form',
            name,
            email,
            phone: phone || 'No proporcionado',
            message: message || 'Sin mensaje',
            timestamp: new Date().toISOString(),
            url_origen: process.env.NEXT_PUBLIC_SITE_URL || 'hectechai.com'
          }),
        }).catch(n8nError => {
          console.error('Error sending lead to n8n:', n8nError);
        })
      );
    }

    // 2. Preparar operación de Correo Electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL || 'hectechia@gmail.com',
      subject: `🚀 Nuevo Lead: ${name}`,
      text: `Has recibido un nuevo mensaje desde la web:\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || 'No proporcionado'}\nMensaje: ${message || 'Sin mensaje'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #00FF94;">🚀 Nuevo Lead Recibido</h2>
          <p>Has recibido un nuevo mensaje desde la web <strong>HecTechAi</strong>:</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #00FF94;">
            ${message || 'Sin mensaje'}
          </blockquote>
        </div>
      `
    };

    operations.push(
      transporter.sendMail(mailOptions).catch(emailError => {
        console.error('Error sending email:', emailError);
      })
    );

    // 3. Ejecución en paralelo no bloqueante secuencialmente
    await Promise.allSettled(operations);

    return { success: true };
  },

  // Dispara el workflow n8n `audit_hosteleria`, que genera el informe completo con
  // Claude y lo envía por email. Usa un webhook y secreto propios (no N8N_WEBHOOK_URL)
  // para no disparar también el pipeline general de leads / notify_jarvis.
  async submitAuditRequest(payload: AuditRequestPayload): Promise<{ jobId: string } | { error: string }> {
    const webhookUrl = process.env.N8N_AUDIT_WEBHOOK_URL;
    if (!webhookUrl) {
      return { error: 'N8N_AUDIT_WEBHOOK_URL no configurado' };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-audit-token': process.env.AUDIT_FORM_SECRET || '',
        },
        body: JSON.stringify({
          email: payload.email,
          business_name: payload.businessName,
          website: payload.website,
          case_description: payload.caseDescription,
          business_type: payload.businessType,
          utm: payload.utm || {},
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        return { error: `Webhook respondió ${response.status}` };
      }

      const data = await response.json();
      if (!data.jobId) {
        return { error: 'Respuesta del webhook sin jobId' };
      }

      return { jobId: data.jobId };
    } catch (error) {
      console.error('Error sending audit request to n8n:', error);
      return { error: error instanceof Error ? error.message : 'Error de conexión con n8n' };
    } finally {
      clearTimeout(timeout);
    }
  }
};
