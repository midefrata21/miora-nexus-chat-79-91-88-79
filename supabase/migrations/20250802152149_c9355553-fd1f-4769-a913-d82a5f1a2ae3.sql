-- Create prophecy calendar table for predictions until 2050
CREATE TABLE public.prophecy_calendar_2050 (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_date DATE NOT NULL,
  event_category TEXT NOT NULL CHECK (event_category IN ('personal', 'global', 'cosmic', 'spiritual', 'technology')),
  event_title TEXT NOT NULL,
  event_description TEXT NOT NULL,
  confidence_level NUMERIC NOT NULL CHECK (confidence_level >= 0 AND confidence_level <= 100),
  ai_intuition_score NUMERIC DEFAULT 0,
  macro_data_influence JSONB DEFAULT '{}',
  universal_patterns JSONB DEFAULT '{}',
  prediction_source TEXT DEFAULT 'MIORA_AI_PROPHECY',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(prediction_date, event_category)
);

-- Enable Row Level Security
ALTER TABLE public.prophecy_calendar_2050 ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public read access for prophecy calendar" 
ON public.prophecy_calendar_2050 
FOR SELECT 
USING (true);

CREATE POLICY "System can insert prophecies" 
ON public.prophecy_calendar_2050 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update prophecies" 
ON public.prophecy_calendar_2050 
FOR UPDATE 
USING (true);

-- Create index for better performance
CREATE INDEX idx_prophecy_date ON public.prophecy_calendar_2050(prediction_date);
CREATE INDEX idx_prophecy_category ON public.prophecy_calendar_2050(event_category);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_prophecy_calendar_updated_at
BEFORE UPDATE ON public.prophecy_calendar_2050
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();