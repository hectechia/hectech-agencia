import { supabase } from '../../adapters/supabase';
import { cookies } from 'next/headers';

export const metricsService = {
  async getAutomationMetrics(clientId?: string, password?: string) {
    const cookieStore = await cookies();

    // 1. Determine effective Client ID
    let effectiveClientId = clientId;
    const isLoginAttempt = !!(clientId && password);

    if (!effectiveClientId) {
      const sessionCookie = cookieStore.get('hectech_session');
      if (sessionCookie) {
        effectiveClientId = sessionCookie.value;
      } else {
        return { success: false, error: 'Sesión no iniciada.' };
      }
    }

    if (!effectiveClientId) return { success: false, error: 'Identificador requerido' };

    // 2. Demo logic
    if (effectiveClientId.toUpperCase() === 'DEMO123') {
      const demoPassword = process.env.DEMO_PASSWORD || 'hector2024';
      if (isLoginAttempt && password !== demoPassword) {
        return { success: false, error: 'Contraseña incorrecta para la Demo.' };
      }
      if (isLoginAttempt) {
        cookieStore.set('hectech_session', 'DEMO123', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
      }
      return {
        success: true,
        data: {
          client_name: 'Héctor (Demo)',
          status: 'ACTIVE',
          total_actions: 2840,
          hours_saved: 124,
          roi_euros: "6200",
          avg_response_time: 4.8
        }
      };
    }

    try {
      let query = supabase
        .from('automation_metrics')
        .select('*');

      const isEmail = effectiveClientId.includes('@');
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(effectiveClientId);

      if (isEmail) {
        query = query.eq('client_email', effectiveClientId);
      } else if (isUuid) {
        query = query.eq('client_id', effectiveClientId);
      } else {
        query = query.eq('client_email', effectiveClientId);
      }

      if (isLoginAttempt) {
        query = query.eq('password', password);
      }

      const { data, error } = await query.single();
      if (error || !data) return { success: false, error: 'Credenciales inválidas.' };

      if (isLoginAttempt) {
        cookieStore.set('hectech_session', effectiveClientId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
      }

      return {
        success: true,
        data: {
          client_name: data.client_name || 'Cliente HecTechAi',
          status: data.status || 'ONBOARDING',
          total_actions: data.total_actions || 0,
          hours_saved: Math.floor((data.total_time_saved || 0) / 60),
          roi_euros: ((data.total_time_saved || 0) / 60 * 50).toFixed(0),
        }
      };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error desconocido';
      return { success: false, error: message };
    }
  }
};
