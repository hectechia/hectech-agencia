
const { createClient } = require('@supabase/supabase-js');

// Hardcoded keys for testing to rule out env var issues in this script
const supabaseUrl = 'https://cqhhzaogzztklitwivky.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxaGh6YW9nenp0a2xpdHdpdmt5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTI3NjcxMiwiZXhwIjoyMDk2ODUyNzEyfQ.2srwyVcU8I8h32ZMLipaIHJ-1fZvvIfVCu8TOHmNQFQ'; // Service Role Key

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
    const clientId = 'test@onboarding.com';
    const password = 'password123';

    console.log(`Testing login for: ${clientId} with password: ${password}`);

    let query = supabase
        .from('automation_metrics')
        .select('*');

    const isEmail = clientId.includes('@');
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clientId);

    if (isEmail) {
        query = query.eq('client_email', clientId);
    } else if (isUuid) {
        query = query.eq('client_id', clientId);
    } else {
        query = query.eq('client_email', clientId);
    }

    const { data, error } = await query
        .eq('password', password)
        .single();

    if (error) {
        console.error('Login FAILED. Error:', error);
    } else if (!data) {
        console.error('Login FAILED. No data returned.');
    } else {
        console.log('Login SUCCESS!');
        console.log('User found:', data.client_name);
        console.log('Status:', data.status);
    }
}

testLogin();
