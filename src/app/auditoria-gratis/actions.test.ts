import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/application/services/auditService', () => ({
  auditService: {
    generateTextAudit: vi.fn(),
  },
}));

vi.mock('@/application/services/leadService', () => ({
  leadService: {
    submitAuditRequest: vi.fn(),
  },
}));

import { auditService } from '@/application/services/auditService';
import { leadService } from '@/application/services/leadService';
import { submitAuditRequest } from './actions';

const validPayload = {
  email: 'test@test.com',
  businessName: 'Hotel Test',
  website: 'https://hotel-test.com',
  caseDescription: 'Recibimos muchas reservas fuera de horario y no llegamos a responder a tiempo.',
};

describe('submitAuditRequest server action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rechaza email inválido sin llamar a los servicios', async () => {
    const result = await submitAuditRequest({ ...validPayload, email: 'no-es-un-email' });

    expect(result.ok).toBe(false);
    expect(auditService.generateTextAudit).not.toHaveBeenCalled();
    expect(leadService.submitAuditRequest).not.toHaveBeenCalled();
  });

  it('rechaza case_description demasiado corta', async () => {
    const result = await submitAuditRequest({ ...validPayload, caseDescription: 'muy corto' });

    expect(result.ok).toBe(false);
    expect(auditService.generateTextAudit).not.toHaveBeenCalled();
  });

  it('rechaza website inválida', async () => {
    const result = await submitAuditRequest({ ...validPayload, website: 'esto no es una url' });

    expect(result.ok).toBe(false);
  });

  it('devuelve preview + jobId cuando todo funciona', async () => {
    vi.mocked(auditService.generateTextAudit).mockResolvedValue('Preview generado.');
    vi.mocked(leadService.submitAuditRequest).mockResolvedValue({ jobId: 'job-1' });

    const result = await submitAuditRequest(validPayload);

    expect(result).toEqual({ ok: true, preview: 'Preview generado.', jobId: 'job-1' });
  });

  it('devuelve preview con jobId pending si el webhook falla pero el preview funciona', async () => {
    vi.mocked(auditService.generateTextAudit).mockResolvedValue('Preview generado.');
    vi.mocked(leadService.submitAuditRequest).mockResolvedValue({ error: 'webhook down' });

    const result = await submitAuditRequest(validPayload);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.preview).toBe('Preview generado.');
      expect(result.jobId).toBe('pending');
    }
  });

  it('devuelve error si el preview falla', async () => {
    vi.mocked(auditService.generateTextAudit).mockRejectedValue(new Error('gemini down'));
    vi.mocked(leadService.submitAuditRequest).mockResolvedValue({ jobId: 'job-1' });

    const result = await submitAuditRequest(validPayload);

    expect(result.ok).toBe(false);
  });
});
