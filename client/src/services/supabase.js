import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tafcgyvqkicufcdlqmkr.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZmNneXZxa2ljdWZjZGxxbWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTg3NDMsImV4cCI6MjA2Nzg5NDc0M30.OUoSqQyXq8CO_bdzTR1ri76OqXmyDTBYx_2nQ9LQPLk`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
