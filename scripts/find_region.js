const { Client } = require('pg');

const regions = [
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-northeast-2',
  'sa-east-1',
  'ca-central-1'
];

async function findRegion() {
  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    
    for (const port of [5432, 6543]) {
      console.log(`Testing region ${region} (${host}:${port}) ...`);
      
      const client = new Client({
        host: host,
        port: port,
        user: 'postgres.cqhhzaogzztklitwivky',
        password: 'Barber7rufo12!',
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 3000
      });

      try {
        await client.connect();
        console.log(`\n🎉 FOUND REGION! SUCCESS connected to ${region} on port ${port}`);
        await client.end();
        return;
      } catch (err) {
        if (err.message.includes('password authentication failed')) {
          console.log(`\n🎉 FOUND REGION! ${region} on port ${port} (but password failed)`);
          await client.end();
          return;
        } else if (err.message.includes('tenant/user') && err.message.includes('not found')) {
          // Tenant not found on this region's pooler, continue
        } else {
          console.log(`Region ${region}:${port} returned other error: ${err.message}`);
        }
      }
    }
  }
  console.log('\nFinished searching all regions. Tenant not found anywhere on either port.');
}

findRegion();
