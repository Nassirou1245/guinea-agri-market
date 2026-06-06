import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xishyhjkdmozvoxocdcy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpc2h5aGprZG1venZveG9jZGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQzODksImV4cCI6MjA5NjI2MDM4OX0.PPqUj8RdbLuqNm5G3qavIgVe8g6LKp5g7SDp_PnD8l4'

export const supabase = createClient(supabaseUrl, supabaseKey)