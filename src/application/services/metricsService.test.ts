import { describe, it, expect, vi, beforeEach } from 'vitest';
import { metricsService } from './metricsService';

// Mock adapters/supabase
vi.mock('../../adapters/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  },
}));

// Mock next/headers cookies con hoisting correcto
const { mockCookieStore } = vi.hoisted(() => ({
  mockCookieStore: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue(mockCookieStore),
}));

describe('metricsService - Test de Integridad de Métricas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.DEMO_PASSWORD; // Reset variable de entorno por test
  });

  describe('Validación de Sesión y Demo', () => {
    it('debe retornar error si no hay clientId ni sesión cookie', async () => {
      mockCookieStore.get.mockReturnValue(undefined);
      const result = await metricsService.getAutomationMetrics();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Sesión no iniciada');
    });

    it('debe retornar datos demo correctamente con la clave por defecto', async () => {
      const result = await metricsService.getAutomationMetrics('DEMO123', 'hector2024');
      expect(result.success).toBe(true);
      expect(result.data?.client_name).toBe('Héctor (Demo)');
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'hectech_session',
        'DEMO123',
        expect.any(Object)
      );
    });

    it('debe fallar la demo si la clave es incorrecta', async () => {
      const result = await metricsService.getAutomationMetrics('DEMO123', 'clave_incorrecta');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Contraseña incorrecta');
    });

    it('debe respetar la variable de entorno DEMO_PASSWORD si está definida', async () => {
      process.env.DEMO_PASSWORD = 'super_secreto_2026';
      
      // Clave vieja debe fallar
      const resultVieja = await metricsService.getAutomationMetrics('DEMO123', 'hector2024');
      expect(resultVieja.success).toBe(false);

      // Clave nueva debe tener éxito
      const resultNueva = await metricsService.getAutomationMetrics('DEMO123', 'super_secreto_2026');
      expect(resultNueva.success).toBe(true);
      expect(resultNueva.data?.total_actions).toBeGreaterThan(0);
    });
  });
});
