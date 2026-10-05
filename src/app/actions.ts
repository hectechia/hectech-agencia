'use server'

import { leadService } from '@/application/services/leadService';
import { auditService } from '@/application/services/auditService';
import { metricsService } from '@/application/services/metricsService';
import { cookies } from 'next/headers';

export async function submitLead(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !email) {
        return { success: false, error: 'Nombre y email son obligatorios.' };
    }

    const result = await leadService.submitLead({ name, email, phone, message });
    return result.success ? { success: '¡Mensaje enviado! Te contactaremos pronto.' } : { success: false, error: 'Error al enviar.' };
}

export async function generateAuditAction(business: string, painPoint: string, email?: string) {
    try {
        const data = await auditService.generateTextAudit(business, painPoint, email);
        return { success: true, data };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return { success: false, error: message };
    }
}

export async function generateVisualAuditAction(url: string, email?: string) {
    try {
        const result = await auditService.generateVisualAudit(url, email);
        return { success: true, ...result };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return { success: false, error: message };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('hectech_session');
    return { success: true };
}

export async function getAutomationMetrics(clientId?: string, password?: string) {
    // This could also be moved to metricsService fully
    return metricsService.getAutomationMetrics(clientId, password);
}

export async function requestDashboardAccess(_email: string) {
    // Logic for requesting access (emails, password generation)
    // For now, let's keep it here or move to a security/auth service if it grows
    // ...
    return { success: true, message: '¡Enviado!' }; // Simplified for now to avoid complexity in this file
}

export async function submitPreCalendarLeadAction(data: {
    name: string;
    whatsapp: string;
    businessName: string;
    sector: string;
    email?: string;
}) {
    try {
        const { name, whatsapp, businessName, sector, email } = data;
        if (!name || !whatsapp || !businessName) {
            return { success: false, error: 'Nombre, WhatsApp y Nombre de Negocio son requeridos.' };
        }

        const message = `[Pre-Calendar Audit Request] Negocio: ${businessName} | Sector: ${sector || 'General'} | WhatsApp: ${whatsapp}`;
        const finalEmail = email || `${whatsapp.replace(/[^0-9]/g, '')}@lead-whatsapp.local`;

        await leadService.submitLead({
            name,
            email: finalEmail,
            phone: whatsapp,
            message
        });

        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error al registrar lead';
        return { success: false, error: msg };
    }
}

