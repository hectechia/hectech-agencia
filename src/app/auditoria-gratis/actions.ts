'use server';

import { auditService } from '@/application/services/auditService';
import { leadService } from '@/application/services/leadService';

export type AuditFormPayload = {
  email: string;
  businessName: string;
  website: string;
  caseDescription: string;
  businessType?: 'hotel' | 'restaurante' | 'bar' | 'otro';
  utm?: { source?: string; medium?: string; campaign?: string };
};

export type AuditActionResult =
  | { ok: true; preview: string; jobId: string }
  | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: AuditFormPayload): string | null {
  if (!EMAIL_REGEX.test(payload.email)) return 'Introduce un email válido.';
  if (payload.businessName.trim().length < 2 || payload.businessName.trim().length > 120) {
    return 'El nombre del negocio debe tener entre 2 y 120 caracteres.';
  }
  try {
    const url = payload.website.startsWith('http') ? payload.website : `https://${payload.website}`;
    new URL(url);
  } catch {
    return 'Introduce una URL de web válida.';
  }
  const len = payload.caseDescription.trim().length;
  if (len < 20 || len > 1500) {
    return 'Cuéntanos tu caso con al menos 20 caracteres (máximo 1500).';
  }
  return null;
}

export async function submitAuditRequest(payload: AuditFormPayload): Promise<AuditActionResult> {
  const validationError = validate(payload);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const website = payload.website.startsWith('http') ? payload.website : `https://${payload.website}`;

  const [previewResult, webhookResult] = await Promise.allSettled([
    auditService.generateTextAudit(payload.businessName, payload.caseDescription, payload.email),
    leadService.submitAuditRequest({ ...payload, website }),
  ]);

  if (previewResult.status === 'rejected') {
    return { ok: false, error: 'No hemos podido generar el preview. Inténtalo de nuevo.' };
  }

  const preview = previewResult.value;
  let jobId = 'pending';

  if (webhookResult.status === 'fulfilled') {
    const webhookValue = webhookResult.value;
    if ('jobId' in webhookValue) {
      jobId = webhookValue.jobId;
    } else {
      console.error('[auditoria-gratis] webhook error:', webhookValue.error);
    }
  } else {
    console.error('[auditoria-gratis] webhook error:', webhookResult.reason);
  }

  return { ok: true, preview, jobId };
}
