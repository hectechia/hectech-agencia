export interface Lead {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  timestamp?: string;
  source: string;
}

export interface AuditResult {
  analysis: string;
  mockupPrompt?: string;
  screenshot?: string;
}

export interface ClientMetrics {
  client_name: string;
  status: string;
  total_actions: number;
  hours_saved: number;
  roi_euros: string;
  avg_response_time: number;
  qualified_leads: number;
  after_hours_actions: number;
  history: Array<{ month: string; value: number }>;
}
