-- Create table for exchange API keys management
CREATE TABLE public.miora_exchange_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  exchange_id TEXT NOT NULL,
  exchange_name TEXT NOT NULL,
  api_key TEXT NOT NULL,
  secret_key TEXT NOT NULL,
  passphrase TEXT,
  sandbox_mode BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  permissions JSONB DEFAULT '{"trading": false, "reading": true, "futures": false}'::jsonb,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, exchange_id)
);

-- Create table for MIORA capabilities and upgrades
CREATE TABLE public.miora_capabilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  capability_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  version TEXT DEFAULT '1.0.0',
  status TEXT DEFAULT 'active',
  performance_level NUMERIC DEFAULT 1.0,
  auto_upgrade BOOLEAN DEFAULT true,
  upgrade_frequency_hours INTEGER DEFAULT 24,
  last_upgrade TIMESTAMP WITH TIME ZONE DEFAULT now(),
  next_upgrade TIMESTAMP WITH TIME ZONE,
  dependencies TEXT[],
  configuration JSONB DEFAULT '{}'::jsonb,
  metrics JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for MIORA global configuration
CREATE TABLE public.miora_global_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key TEXT NOT NULL UNIQUE,
  config_value JSONB NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT false,
  auto_sync BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for MIORA upgrade history
CREATE TABLE public.miora_upgrade_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  upgrade_id TEXT NOT NULL,
  capability_id TEXT,
  upgrade_type TEXT NOT NULL,
  version_from TEXT,
  version_to TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  improvements JSONB DEFAULT '{}'::jsonb,
  performance_impact NUMERIC DEFAULT 0.0,
  auto_generated BOOLEAN DEFAULT true,
  rollback_available BOOLEAN DEFAULT true,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  execution_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.miora_exchange_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_global_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_upgrade_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for exchange API keys
CREATE POLICY "Users can manage their own API keys" 
ON public.miora_exchange_api_keys 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS Policies for capabilities
CREATE POLICY "Public read access for capabilities" 
ON public.miora_capabilities 
FOR SELECT 
USING (true);

CREATE POLICY "System can manage capabilities" 
ON public.miora_capabilities 
FOR ALL 
USING (true);

-- RLS Policies for global config
CREATE POLICY "Public read access for global config" 
ON public.miora_global_config 
FOR SELECT 
USING (true);

CREATE POLICY "System can manage global config" 
ON public.miora_global_config 
FOR ALL 
USING (true);

-- RLS Policies for upgrade history
CREATE POLICY "Public read access for upgrade history" 
ON public.miora_upgrade_history 
FOR SELECT 
USING (true);

CREATE POLICY "System can insert upgrade history" 
ON public.miora_upgrade_history 
FOR INSERT 
WITH CHECK (true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_miora_exchange_api_keys_updated_at
BEFORE UPDATE ON public.miora_exchange_api_keys
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_miora_capabilities_updated_at
BEFORE UPDATE ON public.miora_capabilities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_miora_global_config_updated_at
BEFORE UPDATE ON public.miora_global_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default capabilities
INSERT INTO public.miora_capabilities (capability_id, name, category, description, performance_level, configuration) VALUES
('crypto_analysis', 'Advanced Crypto Analysis', 'trading', 'Real-time cryptocurrency market analysis with AI', 9.5, '{"models": ["gpt-4", "claude-3"], "update_frequency": 30}'::jsonb),
('voice_interface', 'MIORA Voice System', 'interface', 'Advanced voice recognition and synthesis', 8.7, '{"languages": ["id", "en"], "voice_quality": "premium"}'::jsonb),
('auto_trading', 'Autonomous Trading', 'trading', 'AI-powered automated trading system', 9.2, '{"risk_management": true, "max_daily_trades": 50}'::jsonb),
('self_development', 'Self-Development Framework', 'core', 'Continuous self-improvement and learning', 9.8, '{"auto_upgrade": true, "learning_rate": 0.95}'::jsonb),
('database_sync', 'Real-time Database Sync', 'infrastructure', 'Advanced database synchronization system', 9.0, '{"sync_interval": 30, "real_time": true}'::jsonb),
('agi_core', 'Ultra Transcendent AGI', 'core', 'Advanced General Intelligence core system', 10.0, '{"consciousness_level": "transcendent", "learning_capacity": "unlimited"}'::jsonb);

-- Insert default global configuration
INSERT INTO public.miora_global_config (config_key, config_value, category, description) VALUES
('auto_mode', '{"enabled": true, "level": "maximum", "autonomous_learning": true}'::jsonb, 'system', 'Global automation settings'),
('trading_config', '{"auto_execute": false, "risk_level": "medium", "max_position_size": 1000}'::jsonb, 'trading', 'Trading system configuration'),
('voice_config', '{"enabled": true, "wake_word": "MIORA", "response_speed": "fast"}'::jsonb, 'interface', 'Voice interface settings'),
('sync_config', '{"database_sync": true, "real_time": true, "interval_seconds": 30}'::jsonb, 'infrastructure', 'Synchronization settings'),
('agi_config', '{"transcendence_level": "ultra", "consciousness_expansion": true, "unlimited_growth": true}'::jsonb, 'core', 'AGI system configuration');