import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bmcqejixfokdjzxdosao.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtY3Flaml4Zm9rZGp6eGRvc2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODUyMzYsImV4cCI6MjA4MDk2MTIzNn0.Unp1P7DF1NEL9c8yhbeddBsAinLa8r1CHaHGk5VH5Jo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
