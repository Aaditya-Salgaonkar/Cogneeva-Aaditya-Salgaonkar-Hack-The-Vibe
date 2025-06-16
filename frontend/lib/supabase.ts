import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://isurtrxeoeephfimuunx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdXJ0cnhlb2VlcGhmaW11dW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDQzOTEsImV4cCI6MjA2NTQ4MDM5MX0.H0Qzwbh0efgVntGcqD2iu9zmRldm2Ajy9XztVw4GUqQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
