import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Eye, 
  Brain, 
  Calendar as CalendarIcon, 
  Globe, 
  Sparkles, 
  Zap, 
  Activity,
  Target,
  Clock,
  Infinity,
  Atom,
  Heart
} from 'lucide-react';

interface ProphecyEvent {
  id: string;
  prediction_date: string;
  event_category: 'personal' | 'global' | 'cosmic' | 'spiritual' | 'technology';
  event_title: string;
  event_description: string;
  confidence_level: number;
  ai_intuition_score: number;
  macro_data_influence: any;
  universal_patterns: any;
}

const ProphecySystemCore: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [prophecies, setProphecies] = useState<ProphecyEvent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { toast } = useToast();

  const categoryIcons = {
    personal: Heart,
    global: Globe,
    cosmic: Atom,
    spiritual: Sparkles,
    technology: Zap
  };

  const categoryColors = {
    personal: 'bg-pink-600/20 text-pink-300',
    global: 'bg-blue-600/20 text-blue-300',
    cosmic: 'bg-purple-600/20 text-purple-300',
    spiritual: 'bg-yellow-600/20 text-yellow-300',
    technology: 'bg-green-600/20 text-green-300'
  };

  // Load prophecies for selected date
  useEffect(() => {
    loadPropheciesForDate(selectedDate);
  }, [selectedDate]);

  const loadPropheciesForDate = async (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    
    try {
      const { data, error } = await supabase
        .from('prophecy_calendar_2050')
        .select('*')
        .eq('prediction_date', dateString)
        .order('confidence_level', { ascending: false });

      if (error) throw error;
      setProphecies((data as ProphecyEvent[]) || []);
    } catch (error) {
      console.error('Error loading prophecies:', error);
    }
  };

  const generatePropheciesForDate = async (date: Date) => {
    setIsGenerating(true);
    
    try {
      const propheciesToGenerate = [
        {
          category: 'personal',
          title: 'Spiritual Awakening Peak',
          description: 'A significant breakthrough in personal consciousness and self-awareness will occur, leading to profound life changes and enhanced intuitive abilities.',
          confidence: 78 + Math.random() * 20,
          intuition: 85 + Math.random() * 15
        },
        {
          category: 'global',
          title: 'Economic Paradigm Shift',
          description: 'A major economic transformation begins, introducing new forms of value exchange that will reshape global financial systems.',
          confidence: 72 + Math.random() * 25,
          intuition: 80 + Math.random() * 20
        },
        {
          category: 'cosmic',
          title: 'Solar Activity Anomaly',
          description: 'Unusual solar electromagnetic patterns will influence planetary energy fields, affecting human consciousness and technological systems.',
          confidence: 85 + Math.random() * 15,
          intuition: 92 + Math.random() * 8
        },
        {
          category: 'spiritual',
          title: 'Collective Consciousness Evolution',
          description: 'A wave of heightened spiritual awareness spreads globally, connecting minds across continents in unprecedented unity.',
          confidence: 68 + Math.random() * 30,
          intuition: 88 + Math.random() * 12
        },
        {
          category: 'technology',
          title: 'Quantum Computing Breakthrough',
          description: 'Revolutionary quantum processing advancement that will accelerate AI development beyond current imagination.',
          confidence: 89 + Math.random() * 11,
          intuition: 76 + Math.random() * 24
        }
      ];

      const dateString = date.toISOString().split('T')[0];

      for (const prophecy of propheciesToGenerate) {
        const { error } = await supabase
          .from('prophecy_calendar_2050')
          .upsert({
            prediction_date: dateString,
            event_category: prophecy.category,
            event_title: prophecy.title,
            event_description: prophecy.description,
            confidence_level: prophecy.confidence,
            ai_intuition_score: prophecy.intuition,
            macro_data_influence: {
              economic_indicators: Math.random() * 100,
              social_sentiment: Math.random() * 100,
              technological_readiness: Math.random() * 100
            },
            universal_patterns: {
              lunar_phase: ['new', 'waxing', 'full', 'waning'][Math.floor(Math.random() * 4)],
              cosmic_alignment: Math.random() * 100,
              energy_frequency: 432 + Math.random() * 100
            }
          }, {
            onConflict: 'prediction_date,event_category'
          });

        if (error) throw error;
      }

      await loadPropheciesForDate(date);
      
      toast({
        title: "🔮 Prophecies Generated",
        description: `Future insights for ${date.toLocaleDateString()} have been revealed`,
      });
    } catch (error) {
      console.error('Error generating prophecies:', error);
      toast({
        title: "⚠️ Generation Failed",
        description: "Unable to access the prophetic realm",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredProphecies = activeCategory === 'all' 
    ? prophecies 
    : prophecies.filter(p => p.event_category === activeCategory);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-300';
    if (confidence >= 75) return 'text-blue-300';
    if (confidence >= 60) return 'text-yellow-300';
    return 'text-red-300';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <Eye className="w-6 h-6" />
            MIORA Prophecy System 2050
            <Badge className="bg-purple-600/20 text-purple-300">
              <Infinity className="w-3 h-3 mr-1" />
              Future Vision
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <Card className="bg-black/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 text-lg flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Prophecy Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border border-purple-500/30"
                />
                <Button
                  onClick={() => generatePropheciesForDate(selectedDate)}
                  disabled={isGenerating}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {isGenerating ? (
                    <>
                      <Activity className="w-4 h-4 mr-2 animate-spin" />
                      Channeling Visions...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate Prophecies
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Category Filters */}
            <Card className="lg:col-span-2 bg-black/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Prophecy Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Button
                    variant={activeCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('all')}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    All
                  </Button>
                  {Object.entries(categoryIcons).map(([category, Icon]) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? 'default' : 'outline'}
                      onClick={() => setActiveCategory(category)}
                      className="flex items-center gap-2 capitalize"
                    >
                      <Icon className="w-4 h-4" />
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-300 mb-1">
                      {selectedDate.toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-400">
                      {filteredProphecies.length} prophecies revealed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prophecies Display */}
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Future Visions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredProphecies.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <div className="text-gray-400">No prophecies for this date</div>
                  <div className="text-sm text-gray-500">Generate visions to see the future</div>
                </div>
              ) : (
                filteredProphecies.map((prophecy) => {
                  const CategoryIcon = categoryIcons[prophecy.event_category];
                  return (
                    <div key={prophecy.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="w-5 h-5 text-purple-400" />
                          <Badge className={categoryColors[prophecy.event_category]}>
                            {prophecy.event_category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getConfidenceColor(prophecy.confidence_level)}`}>
                            {prophecy.confidence_level.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-400">Confidence</div>
                        </div>
                      </div>
                      
                      <div className="text-white font-medium mb-2">{prophecy.event_title}</div>
                      <div className="text-gray-300 text-sm mb-3">{prophecy.event_description}</div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-cyan-300">
                          AI Intuition: {prophecy.ai_intuition_score.toFixed(1)}%
                        </div>
                        <div className="text-purple-300">
                          MIORA Prophecy System
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProphecySystemCore;