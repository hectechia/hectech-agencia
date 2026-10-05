const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Barber7rufo12!@db.cqhhzaogzztklitwivky.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  await client.connect();
  console.log("Connected to Supabase Postgres.");
  
  const query = `
    alter table public.leads drop constraint if exists leads_status_check;

    alter table public.leads add constraint leads_status_check
      check (status in (
        'prospecto',
        'cualificado_medio',
        'cualificado_alto',
        'contactado',
        'en_conversacion',
        'discovery_agendada',
        'propuesta_enviada',
        'propuesta',
        'cerrado',
        'descartado',
        'outreach_pendiente_envio_manual',
        'outreach_rechazado',
        'outreach_failed',
        'descartado_sin_canales',
        'contrato_enviado'
      ));

    comment on constraint leads_status_check on public.leads is
      'Pipeline completo del enjambre Sales con contrato_enviado.';
  `;
  
  try {
    const res = await client.query(query);
    console.log("Migration executed successfully!");
  } catch (err) {
    console.error("Error executing migration:", err);
  } finally {
    await client.end();
  }
}

main();
