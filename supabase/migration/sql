-- supabase/migrations/20260405_init.sql
CREATE TABLE telemetry_logs (
  id SERIAL PRIMARY KEY,
  hardware_id TEXT NOT NULL,
  metric TEXT NOT NULL,
  value NUMERIC NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
