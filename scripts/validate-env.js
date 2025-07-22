require('dotenv').config({ path: '.env.local' });

console.log("Environment Variables Check:");
console.log("----------------------------");

// Debug: Show loaded variables
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "***" : "MISSING");
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "***" : "MISSING");

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('\n❌ Error: NEXT_PUBLIC_SUPABASE_URL is not set');
  process.exit(1);
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('\n❌ Error: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  process.exit(1);
}

try {
  const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('\n✅ URL is valid:', url.hostname);
} catch (e) {
  console.error('\n❌ Invalid Supabase URL:', e.message);
  process.exit(1);
}
