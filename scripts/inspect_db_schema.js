const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Barber7rufo12!@db.cqhhzaogzztklitwivky.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  await client.connect();
  console.log("Connected directly to PostgreSQL database.");

  // List all tables in public schema
  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);

  console.log("\nTABLES:");
  console.table(tablesRes.rows);

  // Describe the columns of automation_metrics
  const colsRes = await client.query(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'automation_metrics'
    ORDER BY ordinal_position;
  `);

  console.log("\nCOLUMNS of automation_metrics:");
  console.table(colsRes.rows);

  await client.end();
}

main().catch(err => {
  console.error("Error:", err);
});
