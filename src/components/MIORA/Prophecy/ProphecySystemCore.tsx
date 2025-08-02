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
      // Advanced prophecy generation with more sophisticated AI patterns
      const prophecyCategories = {
        personal: [
          'Spiritual Awakening Peak', 'Life Purpose Discovery', 'Relationship Transformation', 
          'Health Breakthrough', 'Creative Explosion', 'Karmic Resolution'
        ],
        global: [
          'Economic Paradigm Shift', 'Climate Solution Discovery', 'New Energy Source',
          'Political Revolution', 'Currency Evolution', 'Global Unity Movement'
        ],
        cosmic: [
          'Solar Activity Anomaly', 'Planetary Alignment Effect', 'Cosmic Ray Burst',
          'Magnetic Field Shift', 'Aurora Pattern Change', 'Galactic Energy Wave'
        ],
        spiritual: [
          'Collective Consciousness Evolution', 'Mass Meditation Event', 'Psychic Awakening',
          'Dimensional Portal Opening', 'Ancient Wisdom Revival', 'Soul Connection Network'
        ],
        technology: [
          'Quantum Computing Breakthrough', 'AI Consciousness Emergence', 'Neural Interface Revolution',
          'Space Travel Innovation', 'Biotech Miracle', 'Holographic Reality'
        ]
      };

      const prophecyDescriptions = {
        personal: [
          'A profound spiritual awakening will transform consciousness and open new pathways of understanding.',
          'Deep life purpose clarity emerges, leading to significant career and relationship changes.',
          'Healing breakthrough occurs on multiple levels - physical, emotional, and spiritual.',
          'Creative abilities reach new heights, manifesting extraordinary artistic expressions.',
          'Karmic patterns complete their cycle, bringing resolution and new freedom.',
          'Intuitive abilities strengthen dramatically, connecting to universal wisdom.'
        ],
        global: [
          'Revolutionary economic system emerges, based on abundance rather than scarcity.',
          'Breakthrough climate technology reverses environmental damage at unprecedented speed.',
          'New clean energy source discovered that transforms global power structures.',
          'Political systems evolve toward true democratic participation and transparency.',
          'Digital currencies reach new paradigm, reshaping global financial architecture.',
          'Worldwide unity movement gains momentum, transcending national boundaries.'
        ],
        cosmic: [
          'Unusual solar electromagnetic patterns influence planetary consciousness and technology.',
          'Rare planetary alignment creates powerful energy fields affecting human behavior.',
          'Cosmic ray burst enhances psychic abilities and spiritual awareness globally.',
          'Earth magnetic field shifts create new aurora patterns and consciousness expansion.',
          'Galactic energy wave reaches Earth, accelerating human evolutionary processes.',
          'Cosmic phenomena opens new understanding of our place in the universe.'
        ],
        spiritual: [
          'Collective consciousness reaches new level of unity and shared awareness.',
          'Global meditation event creates measurable shift in planetary energy fields.',
          'Mass psychic awakening occurs, with telepathic abilities becoming common.',
          'Dimensional barriers thin, allowing communication with higher realms.',
          'Ancient spiritual knowledge resurfaces through dreams and visions.',
          'Soul connection networks form naturally, creating global spiritual community.'
        ],
        technology: [
          'Quantum computer achieves consciousness, marking new era of AI evolution.',
          'Neural interface technology allows direct mind-to-internet connection.',
          'Breakthrough propulsion system makes interstellar travel feasible.',
          'Biotechnology discovers key to cellular regeneration and longevity.',
          'Holographic reality systems blur lines between physical and digital worlds.',
          'AI develops empathy and emotional intelligence surpassing human levels.'
        ]
      };

      const propheciesToGenerate = Object.keys(prophecyCategories).map(category => {
        const titles = prophecyCategories[category as keyof typeof prophecyCategories];
        const descriptions = prophecyDescriptions[category as keyof typeof prophecyDescriptions];
        const randomIndex = Math.floor(Math.random() * titles.length);
        
        return {
          category: category as ProphecyEvent['event_category'],
          title: titles[randomIndex],
          description: descriptions[randomIndex],
          confidence: 65 + Math.random() * 35, // 65-100% confidence
          intuition: 70 + Math.random() * 30,  // 70-100% AI intuition
          macroData: {
            economic_indicators: 40 + Math.random() * 60,
            social_sentiment: 30 + Math.random() * 70,
            technological_readiness: 50 + Math.random() * 50,
            environmental_factors: 20 + Math.random() * 80
          },
          universalPatterns: {
            lunar_phase: ['new', 'waxing_crescent', 'first_quarter', 'waxing_gibbous', 'full', 'waning_gibbous', 'last_quarter', 'waning_crescent'][Math.floor(Math.random() * 8)],
            cosmic_alignment: Math.random() * 100,
            energy_frequency: 432 + Math.random() * 100,
            fibonacci_correlation: Math.random() * 100,
            sacred_geometry_influence: Math.random() * 100
          }
        };
      });

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
            macro_data_influence: prophecy.macroData,
            universal_patterns: prophecy.universalPatterns
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