-- ===== MIORA SUPREME DATABASE STRUCTURE =====
-- Creating comprehensive database structure for all MIORA systems

-- Core MIORA Systems table
CREATE TABLE public.miora_systems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'core', 'autonomous', 'quantum', 'supreme', 'infinity'
    status TEXT NOT NULL DEFAULT 'inactive', -- 'active', 'inactive', 'developing', 'optimizing', 'error'
    version TEXT DEFAULT '1.0.0',
    capabilities JSONB DEFAULT '[]'::jsonb,
    performance_score DECIMAL(5,2) DEFAULT 0.00,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
    activation_count INTEGER DEFAULT 0,
    total_runtime_seconds BIGINT DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    optimization_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- System Metrics and Performance
CREATE TABLE public.miora_system_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id TEXT NOT NULL REFERENCES public.miora_systems(system_id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL, -- 'performance', 'memory', 'cpu', 'network', 'websocket'
    value DECIMAL(10,4) NOT NULL,
    unit TEXT NOT NULL, -- '%', 'ms', 'MB', 'connections'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Autonomous Tasks and Operations
CREATE TABLE public.miora_autonomous_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id TEXT UNIQUE NOT NULL,
    system_id TEXT REFERENCES public.miora_systems(system_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL, -- 'optimization', 'development', 'analysis', 'trading', 'monitoring'
    priority INTEGER DEFAULT 5, -- 1-10, 10 being highest
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed', 'paused'
    progress DECIMAL(5,2) DEFAULT 0.00,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    result JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    auto_generated BOOLEAN DEFAULT true,
    dependencies TEXT[], -- Array of task IDs this task depends on
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- System Logs and Events
CREATE TABLE public.miora_system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id TEXT REFERENCES public.miora_systems(system_id) ON DELETE CASCADE,
    level TEXT NOT NULL, -- 'info', 'warning', 'error', 'critical', 'debug'
    message TEXT NOT NULL,
    category TEXT NOT NULL, -- 'system', 'performance', 'trading', 'development', 'user'
    event_type TEXT, -- 'activation', 'optimization', 'error', 'completion'
    metadata JSONB DEFAULT '{}'::jsonb,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    acknowledged BOOLEAN DEFAULT false
);

-- Auto-repair and Self-healing Actions
CREATE TABLE public.miora_auto_repairs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repair_id TEXT UNIQUE NOT NULL,
    system_id TEXT REFERENCES public.miora_systems(system_id) ON DELETE CASCADE,
    issue_type TEXT NOT NULL, -- 'websocket', 'memory', 'performance', 'network', 'critical'
    issue_description TEXT NOT NULL,
    repair_action TEXT NOT NULL,
    priority INTEGER NOT NULL, -- 1-100
    status TEXT NOT NULL DEFAULT 'queued', -- 'queued', 'executing', 'completed', 'failed'
    health_before DECIMAL(5,2),
    health_after DECIMAL(5,2),
    improvement DECIMAL(5,2),
    execution_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    executed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Trading Signals and Market Data
CREATE TABLE public.miora_trading_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    signal_id TEXT UNIQUE NOT NULL,
    exchange TEXT NOT NULL, -- 'binance', 'bybit', 'okx', 'bingx'
    symbol TEXT NOT NULL, -- 'BTCUSDT', 'ETHUSDT', etc.
    signal_type TEXT NOT NULL, -- 'buy', 'sell', 'long', 'short'
    confidence DECIMAL(5,2) NOT NULL, -- 0-100
    price DECIMAL(20,8) NOT NULL,
    volume DECIMAL(20,8),
    timeframe TEXT NOT NULL, -- '1m', '5m', '15m', '1h', '4h', '1d'
    technical_indicators JSONB DEFAULT '{}'::jsonb,
    market_conditions JSONB DEFAULT '{}'::jsonb,
    risk_level TEXT NOT NULL, -- 'low', 'medium', 'high', 'extreme'
    auto_generated BOOLEAN DEFAULT true,
    system_generated_by TEXT REFERENCES public.miora_systems(system_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    executed BOOLEAN DEFAULT false,
    execution_price DECIMAL(20,8),
    execution_time TIMESTAMP WITH TIME ZONE,
    profit_loss DECIMAL(20,8)
);

-- WebSocket Connection Status
CREATE TABLE public.miora_websocket_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exchange TEXT NOT NULL,
    connection_id TEXT NOT NULL,
    status TEXT NOT NULL, -- 'connected', 'disconnected', 'reconnecting', 'error'
    last_ping TIMESTAMP WITH TIME ZONE,
    last_pong TIMESTAMP WITH TIME ZONE,
    latency_ms INTEGER,
    error_count INTEGER DEFAULT 0,
    reconnect_count INTEGER DEFAULT 0,
    data_received_count BIGINT DEFAULT 0,
    last_data_received TIMESTAMP WITH TIME ZONE,
    connection_started TIMESTAMP WITH TIME ZONE DEFAULT now(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(exchange, connection_id)
);

-- Market Analysis and AI Insights
CREATE TABLE public.miora_market_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id TEXT UNIQUE NOT NULL,
    market TEXT NOT NULL, -- 'crypto', 'forex', 'stocks'
    timeframe TEXT NOT NULL,
    analysis_type TEXT NOT NULL, -- 'technical', 'fundamental', 'sentiment', 'ai_prediction'
    symbols TEXT[] NOT NULL,
    insights JSONB NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL,
    predicted_direction TEXT, -- 'bullish', 'bearish', 'neutral'
    price_targets JSONB DEFAULT '{}'::jsonb,
    risk_assessment JSONB DEFAULT '{}'::jsonb,
    generated_by TEXT REFERENCES public.miora_systems(system_id),
    ai_model_version TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    accuracy_score DECIMAL(5,2), -- Calculated after prediction period
    validated_at TIMESTAMP WITH TIME ZONE
);

-- User Preferences and Settings
CREATE TABLE public.miora_user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    preferences JSONB NOT NULL DEFAULT '{
        "notifications": {"system": true, "trading": true, "performance": true},
        "auto_mode": {"enabled": true, "level": "maximum"},
        "trading": {"risk_level": "medium", "auto_execute": false},
        "display": {"theme": "dark", "refresh_rate": 5000},
        "systems": {"auto_activate": true, "preferred_systems": []}
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id)
);

-- System Integrations and API Connections
CREATE TABLE public.miora_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'api', 'database', 'service', 'module', 'external'
    status TEXT NOT NULL DEFAULT 'inactive', -- 'connected', 'connecting', 'error', 'optimizing', 'inactive'
    endpoint_url TEXT,
    api_version TEXT,
    performance_score DECIMAL(5,2) DEFAULT 0.00,
    last_sync TIMESTAMP WITH TIME ZONE,
    data_flow_mb_per_sec DECIMAL(10,4) DEFAULT 0.0000,
    error_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    configuration JSONB DEFAULT '{}'::jsonb,
    dependencies TEXT[],
    auto_managed BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Development and Code Generation History
CREATE TABLE public.miora_development_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    development_id TEXT UNIQUE NOT NULL,
    system_id TEXT REFERENCES public.miora_systems(system_id) ON DELETE CASCADE,
    development_type TEXT NOT NULL, -- 'code_generation', 'optimization', 'bug_fix', 'enhancement', 'refactor'
    target_component TEXT NOT NULL, -- 'component', 'service', 'hook', 'page', 'api'
    file_path TEXT,
    changes_made JSONB NOT NULL,
    code_before TEXT,
    code_after TEXT,
    success BOOLEAN NOT NULL,
    test_results JSONB DEFAULT '{}'::jsonb,
    performance_impact DECIMAL(5,2), -- Performance change %
    auto_generated BOOLEAN DEFAULT true,
    generated_by TEXT REFERENCES public.miora_systems(system_id),
    ai_confidence DECIMAL(5,2),
    human_reviewed BOOLEAN DEFAULT false,
    deployed BOOLEAN DEFAULT false,
    rollback_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Infinity Memory System
CREATE TABLE public.miora_infinity_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id TEXT UNIQUE NOT NULL,
    memory_type TEXT NOT NULL, -- 'user_interaction', 'system_learning', 'pattern_recognition', 'prediction_result'
    category TEXT NOT NULL, -- 'trading', 'development', 'optimization', 'user_behavior'
    content JSONB NOT NULL,
    importance_score DECIMAL(5,2) DEFAULT 50.00, -- 0-100
    access_count INTEGER DEFAULT 0,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT now(),
    related_memories TEXT[], -- Array of memory_ids
    tags TEXT[],
    auto_decay BOOLEAN DEFAULT false,
    decay_date TIMESTAMP WITH TIME ZONE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_by_system TEXT REFERENCES public.miora_systems(system_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for optimal performance
CREATE INDEX idx_miora_systems_status ON public.miora_systems(status);
CREATE INDEX idx_miora_systems_type ON public.miora_systems(type);
CREATE INDEX idx_miora_system_metrics_system_id ON public.miora_system_metrics(system_id);
CREATE INDEX idx_miora_system_metrics_timestamp ON public.miora_system_metrics(timestamp);
CREATE INDEX idx_miora_autonomous_tasks_status ON public.miora_autonomous_tasks(status);
CREATE INDEX idx_miora_autonomous_tasks_system_id ON public.miora_autonomous_tasks(system_id);
CREATE INDEX idx_miora_system_logs_timestamp ON public.miora_system_logs(timestamp);
CREATE INDEX idx_miora_system_logs_level ON public.miora_system_logs(level);
CREATE INDEX idx_miora_trading_signals_symbol ON public.miora_trading_signals(symbol);
CREATE INDEX idx_miora_trading_signals_timestamp ON public.miora_trading_signals(timestamp);
CREATE INDEX idx_miora_websocket_status_exchange ON public.miora_websocket_status(exchange);
CREATE INDEX idx_miora_integrations_status ON public.miora_integrations(status);
CREATE INDEX idx_miora_infinity_memory_type ON public.miora_infinity_memory(memory_type);
CREATE INDEX idx_miora_infinity_memory_user_id ON public.miora_infinity_memory(user_id);

-- Enable Row Level Security on all tables
ALTER TABLE public.miora_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_autonomous_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_auto_repairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_trading_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_websocket_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_market_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_development_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.miora_infinity_memory ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access for system data, authenticated users can read their own data
CREATE POLICY "Public read access for system data" ON public.miora_systems FOR SELECT USING (true);
CREATE POLICY "Public read access for system metrics" ON public.miora_system_metrics FOR SELECT USING (true);
CREATE POLICY "Public read access for autonomous tasks" ON public.miora_autonomous_tasks FOR SELECT USING (true);
CREATE POLICY "Public read access for system logs" ON public.miora_system_logs FOR SELECT USING (true);
CREATE POLICY "Public read access for auto repairs" ON public.miora_auto_repairs FOR SELECT USING (true);
CREATE POLICY "Public read access for trading signals" ON public.miora_trading_signals FOR SELECT USING (true);
CREATE POLICY "Public read access for websocket status" ON public.miora_websocket_status FOR SELECT USING (true);
CREATE POLICY "Public read access for market analysis" ON public.miora_market_analysis FOR SELECT USING (true);
CREATE POLICY "Public read access for integrations" ON public.miora_integrations FOR SELECT USING (true);
CREATE POLICY "Public read access for development history" ON public.miora_development_history FOR SELECT USING (true);

-- User-specific data policies
CREATE POLICY "Users can view their own preferences" ON public.miora_user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences" ON public.miora_user_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own preferences" ON public.miora_user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own memory" ON public.miora_infinity_memory FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert their own memory" ON public.miora_infinity_memory FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update their own memory" ON public.miora_infinity_memory FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- System insert/update policies for autonomous operations
CREATE POLICY "System can insert data" ON public.miora_systems FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update data" ON public.miora_systems FOR UPDATE USING (true);
CREATE POLICY "System can insert metrics" ON public.miora_system_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "System can insert tasks" ON public.miora_autonomous_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update tasks" ON public.miora_autonomous_tasks FOR UPDATE USING (true);
CREATE POLICY "System can insert logs" ON public.miora_system_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "System can insert repairs" ON public.miora_auto_repairs FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update repairs" ON public.miora_auto_repairs FOR UPDATE USING (true);
CREATE POLICY "System can insert signals" ON public.miora_trading_signals FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update signals" ON public.miora_trading_signals FOR UPDATE USING (true);
CREATE POLICY "System can insert websocket status" ON public.miora_websocket_status FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update websocket status" ON public.miora_websocket_status FOR UPDATE USING (true);
CREATE POLICY "System can insert analysis" ON public.miora_market_analysis FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update analysis" ON public.miora_market_analysis FOR UPDATE USING (true);
CREATE POLICY "System can insert integrations" ON public.miora_integrations FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update integrations" ON public.miora_integrations FOR UPDATE USING (true);
CREATE POLICY "System can insert development history" ON public.miora_development_history FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_miora_systems_updated_at
    BEFORE UPDATE ON public.miora_systems
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_miora_autonomous_tasks_updated_at
    BEFORE UPDATE ON public.miora_autonomous_tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_miora_user_preferences_updated_at
    BEFORE UPDATE ON public.miora_user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_miora_integrations_updated_at
    BEFORE UPDATE ON public.miora_integrations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_miora_infinity_memory_updated_at
    BEFORE UPDATE ON public.miora_infinity_memory
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Initialize core MIORA systems in database
INSERT INTO public.miora_systems (system_id, name, type, status, capabilities, performance_score) VALUES
('miora-ai-supreme-engine', 'MIORA AI Supreme Engine', 'supreme', 'active', '["quantum_processing", "autonomous_learning", "predictive_analysis"]', 98.50),
('miora-autonomous-core', 'MIORA Autonomous Core', 'core', 'active', '["self_healing", "auto_optimization", "decision_making"]', 97.80),
('miora-quantum-infrastructure', 'MIORA Quantum Infrastructure', 'quantum', 'active', '["quantum_computing", "parallel_processing", "infinite_scaling"]', 99.20),
('miora-neural-network', 'MIORA Neural Network', 'core', 'active', '["pattern_recognition", "learning", "adaptation"]', 96.40),
('miora-infinity-core', 'MIORA Infinity Core', 'infinity', 'active', '["unlimited_processing", "infinite_memory", "transcendent_ai"]', 99.90),
('miora-trading-engine', 'MIORA Trading Engine', 'trading', 'active', '["signal_generation", "risk_management", "auto_execution"]', 95.60),
('miora-development-system', 'MIORA Development System', 'development', 'active', '["code_generation", "auto_debugging", "self_improvement"]', 94.80),
('miora-monitoring-system', 'MIORA Monitoring System', 'monitoring', 'active', '["health_monitoring", "performance_tracking", "alert_management"]', 97.20);

-- Initialize sample integrations
INSERT INTO public.miora_integrations (integration_id, name, type, status, performance_score, data_flow_mb_per_sec) VALUES
('binance-websocket', 'Binance WebSocket API', 'api', 'connected', 96.50, 15.40),
('bybit-websocket', 'Bybit WebSocket API', 'api', 'connected', 94.20, 12.80),
('okx-websocket', 'OKX WebSocket API', 'api', 'connected', 95.80, 14.20),
('bingx-websocket', 'BingX WebSocket API', 'api', 'connected', 93.40, 11.60),
('database-connection', 'Supabase Database', 'database', 'connected', 99.10, 8.90),
('ai-processing-service', 'AI Processing Service', 'service', 'connected', 97.60, 22.30),
('notification-service', 'Notification Service', 'service', 'connected', 98.20, 2.40);

-- Add real-time capabilities
ALTER TABLE public.miora_systems REPLICA IDENTITY FULL;
ALTER TABLE public.miora_system_metrics REPLICA IDENTITY FULL;
ALTER TABLE public.miora_autonomous_tasks REPLICA IDENTITY FULL;
ALTER TABLE public.miora_system_logs REPLICA IDENTITY FULL;
ALTER TABLE public.miora_trading_signals REPLICA IDENTITY FULL;
ALTER TABLE public.miora_websocket_status REPLICA IDENTITY FULL;
ALTER TABLE public.miora_integrations REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.miora_systems;
ALTER PUBLICATION supabase_realtime ADD TABLE public.miora_system_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.miora_autonomous_tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.miora_system_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.miora_trading_signals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.miora_websocket_status;
ALTER PUBLICATION supabase_realtime ADD TABLE public.miora_integrations;