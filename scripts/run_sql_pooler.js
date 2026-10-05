const { Client } = require('pg');

async function testConnection() {
  const hosts = [
    { host: 'aws-0-eu-central-1.pooler.supabase.com', port: 6543 },
    { host: 'aws-0-eu-central-1.pooler.supabase.com', port: 5432 },
    { host: 'aws-0-eu-west-1.pooler.supabase.com', port: 6543 }
  ];

  for (const item of hosts) {
    console.log(`Trying host: ${item.host}:${item.port} ...`);
    const client = new Client({
      connectionString: `postgresql://postgres.cqhhzaogzztklitwivky:Barber7rufo12!@${item.host}:${item.port}/postgres`,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      console.log(`SUCCESS connected to ${item.host}:${item.port}!`);
      
      // Execute the alter table statement to add the password column
      await client.query('ALTER TABLE public.automation_metrics ADD COLUMN IF NOT EXISTS password TEXT;');
      console.log('Successfully added password column to automation_metrics!');

      await client.end();
      return;
    } catch (err) {
      console.error(`Failed for host ${item.host}:${item.port}:`, err.message);
    }
  }
}

testConnection();
