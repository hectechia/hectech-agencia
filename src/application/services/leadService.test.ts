import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail: vi.fn() })),
  },
}));

import { leadService } from './leadService';

describe('leadService.submitAuditRequest', () => {
  const originalEnv = { ...process.env };
  const originalFetch = global.fetch;

  const basePayload = {
    email: 'test@test.com',
    businessName: 'Hotel Test',
    website: 'https://hotel-test.com',
    caseDescription: 'Recibimos muchas reservas fuera de horario y no llegamos a responder a tiempo.',
  };

  beforeEach(() => {
    process.env.N8N_AUDIT_WEBHOOK_URL = 'https://n8n.hectechai.com/webhook/audit-hosteleria';
    process.env.AUDIT_FORM_SECRET = 'test-secret';
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  it('envía el header x-audit-token y el payload correcto', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ jobId: 'abc-123' }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await leadService.submitAuditRequest(basePayload);

    expect(result).toEqual({ jobId: 'abc-123' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://n8n.hectechai.com/webhook/audit-hosteleria');
    expect(options.headers['x-audit-token']).toBe('test-secret');

    const body = JSON.parse(options.body);
    expect(body).toMatchObject({
      email: basePayload.email,
      business_name: basePayload.businessName,
      website: basePayload.website,
      case_description: basePayload.caseDescription,
    });
  });

  it('devuelve error sin lanzar excepción si el webhook responde 4xx/5xx', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch;

    const result = await leadService.submitAuditRequest(basePayload);

    expect('error' in result).toBe(true);
    if ('error' in result) {
      expect(result.error).toContain('500');
    }
  });

  it('devuelve error sin lanzar excepción si fetch rechaza (red caída)', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network down')) as unknown as typeof fetch;

    const result = await leadService.submitAuditRequest(basePayload);

    expect('error' in result).toBe(true);
  });

  it('devuelve error si falta N8N_AUDIT_WEBHOOK_URL', async () => {
    delete process.env.N8N_AUDIT_WEBHOOK_URL;

    const result = await leadService.submitAuditRequest(basePayload);

    expect('error' in result).toBe(true);
  });
});
