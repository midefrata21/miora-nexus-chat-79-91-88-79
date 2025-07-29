import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Crown, Building, Users, Target, TrendingUp, Shield, 
  ChevronDown, ChevronRight, Star, Award, Briefcase,
  Clock, DollarSign, BarChart3, Settings, AlertTriangle,
  CheckCircle, Activity, Globe, MapPin, Vote, FileText
} from 'lucide-react';
import { useAdvancedGovernment } from '../hooks/useAdvancedGovernment';
import { GovernmentLevel, AuthorityLevel } from '../types/GovernmentHierarchy';

export const GovernmentHierarchy: React.FC = () => {
  const { state, conductElection, promoteOfficial, updateSecurityLevel, getAdvancedStats } = useAdvancedGovernment();
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set(['level_1_supreme']));
  const [selectedLevel, setSelectedLevel] = useState<string>('level_1_supreme');

  const stats = getAdvancedStats();

  const toggleLevel = (levelId: string) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(levelId)) {
      newExpanded.delete(levelId);
    } else {
      newExpanded.add(levelId);
    }
    setExpandedLevels(newExpanded);
  };

  const getAuthorityColor = (authority: AuthorityLevel) => {
    const colors = {
      supreme: 'bg-purple-500',
      federal: 'bg-blue-500',
      regional: 'bg-green-500',
      provincial: 'bg-yellow-500',
      municipal: 'bg-orange-500',
      district: 'bg-red-500',
      local: 'bg-pink-500',
      community: 'bg-indigo-500',
      neighborhood: 'bg-gray-500',
      citizen: 'bg-slate-500'
    };
    return colors[authority] || 'bg-gray-500';
  };

  const getLevelIcon = (level: number) => {
    if (level === 1) return Crown;
    if (level <= 3) return Building;
    if (level <= 6) return Users;
    if (level <= 8) return MapPin;
    return Target;
  };

  const renderLevelTree = (levels: GovernmentLevel[], parentId?: string, depth = 0) => {
    const filteredLevels = levels.filter(level => level.parentId === parentId);
    
    return filteredLevels.map(level => {
      const hasChildren = levels.some(l => l.parentId === level.id);
      const isExpanded = expandedLevels.has(level.id);
      const LevelIcon = getLevelIcon(level.level);
      
      return (
        <div key={level.id} className={`ml-${depth * 4}`}>
          <div 
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
              selectedLevel === level.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary/50'
            }`}
            onClick={() => setSelectedLevel(level.id)}
          >
            <div className="flex items-center flex-1">
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLevel(level.id);
                  }}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
              
              <div className={`w-3 h-3 rounded-full mr-3 ${getAuthorityColor(level.authority)}`} />
              
              <LevelIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              
              <div className="flex-1">
                <div className="font-medium">{level.name}</div>
                <div className="text-sm text-muted-foreground">
                  {level.leader.name} • Population: {level.population.toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant={level.status === 'active' ? 'default' : 'secondary'}>
                  Level {level.level}
                </Badge>
                <Badge variant="outline">
                  {level.authority}
                </Badge>
              </div>
            </div>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="mt-2">
              {renderLevelTree(levels, level.id, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const selectedLevelData = state.levels.find(l => l.id === selectedLevel);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Levels</p>
                <p className="text-2xl font-bold">{stats.totalLevels}</p>
              </div>
              <Building className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Officials</p>
                <p className="text-2xl font-bold">{stats.totalOfficials}</p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{stats.totalDepartments}</p>
              </div>
              <Briefcase className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold">{stats.avgEfficiency}%</p>
              </div>
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security</p>
                <p className="text-lg font-bold capitalize">{stats.securityLevel}</p>
              </div>
              <Shield className={`h-6 w-6 ${
                stats.securityLevel === 'critical' ? 'text-red-500' :
                stats.securityLevel === 'high' ? 'text-orange-500' :
                stats.securityLevel === 'elevated' ? 'text-yellow-500' : 'text-green-500'
              }`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hierarchy Tree */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="h-5 w-5 mr-2" />
              Government Hierarchy (10 Levels)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {renderLevelTree(state.levels)}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Selected Level Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Level Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLevelData ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{selectedLevelData.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLevelData.jurisdiction}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Leader:</span>
                    <span className="text-sm font-medium">{selectedLevelData.leader.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Title:</span>
                    <span className="text-sm font-medium">{selectedLevelData.leader.title}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Population:</span>
                    <span className="text-sm font-medium">{selectedLevelData.population.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Budget:</span>
                    <span className="text-sm font-medium">{selectedLevelData.budget.toLocaleString()} MRC</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Approval:</span>
                      <span className="text-sm font-medium">{selectedLevelData.leader.approval}%</span>
                    </div>
                    <Progress value={selectedLevelData.leader.approval} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Performance:</span>
                      <span className="text-sm font-medium">{selectedLevelData.leader.performance}%</span>
                    </div>
                    <Progress value={selectedLevelData.leader.performance} className="h-2" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Actions</h4>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => conductElection(selectedLevelData.id)}
                    >
                      <Vote className="h-4 w-4 mr-2" />
                      Conduct Election
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => promoteOfficial(selectedLevelData.leader.id, selectedLevelData.level - 1)}
                      disabled={selectedLevelData.level === 1}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Promote Leader
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Children Levels</h4>
                  <div className="text-sm text-muted-foreground">
                    {selectedLevelData.childrenIds.length} subordinate levels
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Select a level to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Governance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Governance Quality Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Transparency</span>
                <span className="text-sm">{stats.governance.transparency}%</span>
              </div>
              <Progress value={stats.governance.transparency} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Accountability</span>
                <span className="text-sm">{stats.governance.accountability}%</span>
              </div>
              <Progress value={stats.governance.accountability} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Participation</span>
                <span className="text-sm">{stats.governance.participation}%</span>
              </div>
              <Progress value={stats.governance.participation} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Stability</span>
                <span className="text-sm">{stats.governance.stability}%</span>
              </div>
              <Progress value={stats.governance.stability} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Level Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Level Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Security Level: <span className="capitalize">{stats.securityLevel}</span></p>
              <p className="text-sm text-muted-foreground">
                Adjust national security level based on current threats
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={stats.securityLevel === 'normal' ? 'default' : 'outline'}
                onClick={() => updateSecurityLevel('normal')}
              >
                Normal
              </Button>
              <Button
                size="sm"
                variant={stats.securityLevel === 'elevated' ? 'default' : 'outline'}
                onClick={() => updateSecurityLevel('elevated')}
              >
                Elevated
              </Button>
              <Button
                size="sm"
                variant={stats.securityLevel === 'high' ? 'default' : 'outline'}
                onClick={() => updateSecurityLevel('high')}
              >
                High
              </Button>
              <Button
                size="sm"
                variant={stats.securityLevel === 'critical' ? 'default' : 'outline'}
                onClick={() => updateSecurityLevel('critical')}
              >
                Critical
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};