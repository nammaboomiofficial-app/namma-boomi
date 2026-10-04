import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://scnqketdyyqdmqzfoyam.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbnFrZXRkeXlxZG1xemZveWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyODU0OTUsImV4cCI6MjEwMzg2MTQ5NX0.1skQ_DS-v-BoN6Z3k4JQmDpMlVk4C914LS3o1wxgQ_Q';

export const supabase = createClient(supabaseUrl, supabaseKey);