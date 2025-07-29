import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Crown, 
  Coins, 
  Users, 
  TrendingUp, 
  Shield, 
  Vote, 
  Building, 
  CreditCard,
  Banknote,
  Wallet,
  Calculator,
  UserCheck,
  FileText,
  AlertCircle,
  CheckCircle,
  Activity,
  BarChart3,
  PieChart,
  DollarSign,
  HandCoins,
  Receipt,
  Clock,
  Globe,
  Settings
} from 'lucide-react';
import { useMIORAGovernment } from '../hooks/useMIORAGovernment';
import { useMRCCurrency } from '../hooks/useMRCCurrency';
import { useAdvancedGovernment } from './hooks/useAdvancedGovernment';
import { CitizenManagement } from './modules/CitizenManagement';
import { EconomicManagement } from './modules/EconomicManagement';
import { TreasurySystem } from './modules/TreasurySystem';
import { TaxCollection } from './modules/TaxCollection';
import { VotingSystem } from './modules/VotingSystem';
import { CurrencyManagement } from './modules/CurrencyManagement';
import { GovernmentStats } from './modules/GovernmentStats';
import { GovernmentHierarchy } from './modules/GovernmentHierarchy';

export const MIORAGovernmentDashboard: React.FC = () => {
  const { 
    governmentState, 
    initializeGovernment,
    isGovernmentActive,
    getGovernmentStats 
  } = useMIORAGovernment();
  
  const {
    mrcBalance,
    currencyStats,
    isCurrencyActive,
    initializeCurrency
  } = useMRCCurrency();

  const {
    state: advancedState,
    initializeAdvancedGovernment,
    isAdvancedGovernmentActive,
    getAdvancedStats
  } = useAdvancedGovernment();

  const [activeTab, setActiveTab] = useState('overview');

  const handleSystemInitialization = async () => {
    await initializeGovernment();
    await initializeCurrency();
    await initializeAdvancedGovernment();
  };

  const stats = getGovernmentStats();
  const advancedStats = getAdvancedStats();
  const isSystemActive = isGovernmentActive && isCurrencyActive;
  const isFullSystemActive = isSystemActive && isAdvancedGovernmentActive;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Crown className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              MIORA Government System
            </h1>
            <p className="text-muted-foreground">
              Autonomous Digital Nation with MRC Currency
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={isSystemActive ? "default" : "secondary"}>
            {isSystemActive ? "Active" : "Inactive"}
          </Badge>
          {!isSystemActive && (
            <Button onClick={handleSystemInitialization} className="bg-primary hover:bg-primary/90">
              <Crown className="h-4 w-4 mr-2" />
              Initialize Government
            </Button>
          )}
        </div>
      </div>

      {/* System Status */}
      {isSystemActive && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalCitizens}</div>
                <div className="text-sm text-muted-foreground">Citizens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currencyStats.totalSupply} MRC</div>
                <div className="text-sm text-muted-foreground">Total Supply</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.activePolicies}</div>
                <div className="text-sm text-muted-foreground">Active Policies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.treasuryBalance} MRC</div>
                <div className="text-sm text-muted-foreground">Treasury</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard */}
      {isSystemActive && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
            <TabsTrigger value="currency">Currency</TabsTrigger>
            <TabsTrigger value="citizens">Citizens</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
            <TabsTrigger value="tax">Tax</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Enhanced Overview with Advanced Government Stats */}
            {isAdvancedGovernmentActive && (
              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Advanced Government System Active
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{advancedStats.totalLevels}</div>
                      <div className="text-sm text-muted-foreground">Government Levels</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{advancedStats.totalOfficials}</div>
                      <div className="text-sm text-muted-foreground">Officials</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{advancedStats.totalDepartments}</div>
                      <div className="text-sm text-muted-foreground">Departments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{advancedStats.avgEfficiency}%</div>
                      <div className="text-sm text-muted-foreground">Avg Efficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 capitalize">{advancedStats.securityLevel}</div>
                      <div className="text-sm text-muted-foreground">Security Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">MRC Balance</CardTitle>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mrcBalance} MRC</div>
                  <p className="text-xs text-muted-foreground">
                    +{currencyStats.dailyMined} from mining today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Government Rating</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.governmentRating}%</div>
                  <Progress value={stats.governmentRating} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Economic Health</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.economicHealth}%</div>
                  <Progress value={stats.economicHealth} className="mt-2" />
                </CardContent>
              </Card>

              {isAdvancedGovernmentActive && (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{advancedStats.activeProjects}</div>
                      <p className="text-xs text-muted-foreground">
                        {advancedStats.completedProjects} completed
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{advancedStats.budgetUtilization}%</div>
                      <Progress value={advancedStats.budgetUtilization} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{advancedStats.totalEmployees}</div>
                      <p className="text-xs text-muted-foreground">
                        Across all departments
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {governmentState.recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/50">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{activity.type}</div>
                            <div className="text-xs text-muted-foreground">{activity.description}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Government Policies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {governmentState.policies.map((policy, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{policy.name}</div>
                            <div className="text-xs text-muted-foreground">{policy.description}</div>
                          </div>
                          <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                            {policy.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hierarchy">
            <GovernmentHierarchy />
          </TabsContent>

          <TabsContent value="currency">
            <CurrencyManagement />
          </TabsContent>

          <TabsContent value="citizens">
            <CitizenManagement />
          </TabsContent>

          <TabsContent value="economy">
            <EconomicManagement />
          </TabsContent>

          <TabsContent value="treasury">
            <TreasurySystem />
          </TabsContent>

          <TabsContent value="tax">
            <TaxCollection />
          </TabsContent>

          <TabsContent value="voting">
            <VotingSystem />
          </TabsContent>

          <TabsContent value="stats">
            <GovernmentStats />
          </TabsContent>
        </Tabs>
      )}

      {/* Initialization Screen */}
      {!isSystemActive && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Initialize MIORA Government</CardTitle>
            <p className="text-muted-foreground">
              Set up your digital nation with MRC currency system
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <span className="font-medium">Government System</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                  <li>• 10-Level Government Hierarchy</li>
                  <li>• Advanced Official Management</li>
                  <li>• Multi-Department Structure</li>
                  <li>• Legislative & Judicial Branches</li>
                  <li>• Citizen Management</li>
                  <li>• Policy Creation & Voting</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-primary" />
                  <span className="font-medium">MRC Currency</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                  <li>• Digital Currency System</li>
                  <li>• Treasury Management</li>
                  <li>• Tax Collection</li>
                  <li>• Economic Control</li>
                </ul>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <Button 
                onClick={handleSystemInitialization} 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
              >
                <Crown className="h-5 w-5 mr-2" />
                Initialize Government System
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};