import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Search, 
  Filter,
  IdCard,
  MapPin,
  Briefcase,
  Star,
  Clock,
  Coins,
  Receipt,
  Activity,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { useMIORAGovernment, type Citizen } from '../../hooks/useMIORAGovernment';
import { useMRCCurrency } from '../../hooks/useMRCCurrency';

export const CitizenManagement: React.FC = () => {
  const { governmentState, registerCitizen } = useMIORAGovernment();
  const { sendMRC, receiveMRC } = useMRCCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [newCitizen, setNewCitizen] = useState({
    name: '',
    email: '',
    profession: '',
    district: '',
    mrcBalance: 100,
    taxesPaid: 0,
    votingPower: 1,
    reputation: 50,
    status: 'active' as const
  });

  const filteredCitizens = governmentState.citizens.filter(citizen => {
    const matchesSearch = citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.digitalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || citizen.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleRegisterCitizen = () => {
    if (newCitizen.name && newCitizen.email) {
      registerCitizen(newCitizen);
      setNewCitizen({
        name: '',
        email: '',
        profession: '',
        district: '',
        mrcBalance: 100,
        taxesPaid: 0,
        votingPower: 1,
        reputation: 50,
        status: 'active'
      });
      setIsRegisterOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getReputationLevel = (reputation: number) => {
    if (reputation >= 90) return { level: 'Excellent', color: 'text-green-600' };
    if (reputation >= 70) return { level: 'Good', color: 'text-blue-600' };
    if (reputation >= 50) return { level: 'Average', color: 'text-yellow-600' };
    if (reputation >= 30) return { level: 'Poor', color: 'text-orange-600' };
    return { level: 'Critical', color: 'text-red-600' };
  };

  const citizenStats = {
    total: governmentState.citizens.length,
    active: governmentState.citizens.filter(c => c.status === 'active').length,
    inactive: governmentState.citizens.filter(c => c.status === 'inactive').length,
    suspended: governmentState.citizens.filter(c => c.status === 'suspended').length,
    totalMRC: governmentState.citizens.reduce((sum, c) => sum + c.mrcBalance, 0),
    totalTaxes: governmentState.citizens.reduce((sum, c) => sum + c.taxesPaid, 0),
    avgReputation: governmentState.citizens.reduce((sum, c) => sum + c.reputation, 0) / governmentState.citizens.length || 0
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citizens</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citizenStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {citizenStats.active} active, {citizenStats.inactive} inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total MRC Holdings</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citizenStats.totalMRC.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Combined citizen wealth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxes Collected</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citizenStats.totalTaxes.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total MRC in taxes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Reputation</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citizenStats.avgReputation.toFixed(1)}</div>
            <Progress value={citizenStats.avgReputation} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search citizens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Register Citizen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Register New Citizen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newCitizen.name}
                  onChange={(e) => setNewCitizen({ ...newCitizen, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCitizen.email}
                  onChange={(e) => setNewCitizen({ ...newCitizen, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={newCitizen.profession}
                  onChange={(e) => setNewCitizen({ ...newCitizen, profession: e.target.value })}
                  placeholder="Enter profession"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Select value={newCitizen.district} onValueChange={(value) => setNewCitizen({ ...newCitizen, district: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central">Central District</SelectItem>
                    <SelectItem value="North">North District</SelectItem>
                    <SelectItem value="South">South District</SelectItem>
                    <SelectItem value="East">East District</SelectItem>
                    <SelectItem value="West">West District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialBalance">Initial MRC Balance</Label>
                <Input
                  id="initialBalance"
                  type="number"
                  value={newCitizen.mrcBalance}
                  onChange={(e) => setNewCitizen({ ...newCitizen, mrcBalance: Number(e.target.value) })}
                  placeholder="100"
                />
              </div>
              <Button onClick={handleRegisterCitizen} className="w-full">
                <UserCheck className="h-4 w-4 mr-2" />
                Register Citizen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Citizens List */}
      <Card>
        <CardHeader>
          <CardTitle>Citizens Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredCitizens.map((citizen) => (
                <div
                  key={citizen.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 cursor-pointer"
                  onClick={() => setSelectedCitizen(citizen)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(citizen.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{citizen.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {citizen.digitalId}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <IdCard className="h-3 w-3 mr-1" />
                          {citizen.email}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {citizen.profession}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {citizen.district}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{citizen.mrcBalance.toFixed(2)} MRC</div>
                      <div className="text-xs text-muted-foreground">
                        Rep: {citizen.reputation}/100
                      </div>
                    </div>
                    <Badge variant={citizen.status === 'active' ? 'default' : 'secondary'}>
                      {citizen.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Citizen Details Dialog */}
      {selectedCitizen && (
        <Dialog open={!!selectedCitizen} onOpenChange={() => setSelectedCitizen(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Citizen Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="p-2 bg-secondary/50 rounded">{selectedCitizen.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Digital ID</Label>
                    <div className="p-2 bg-secondary/50 rounded font-mono">{selectedCitizen.digitalId}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="p-2 bg-secondary/50 rounded">{selectedCitizen.email}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Badge variant={selectedCitizen.status === 'active' ? 'default' : 'secondary'}>
                      {selectedCitizen.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Profession</Label>
                    <div className="p-2 bg-secondary/50 rounded">{selectedCitizen.profession}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>District</Label>
                    <div className="p-2 bg-secondary/50 rounded">{selectedCitizen.district}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Reputation Score</Label>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className={getReputationLevel(selectedCitizen.reputation).color}>
                        {getReputationLevel(selectedCitizen.reputation).level}
                      </span>
                      <span>{selectedCitizen.reputation}/100</span>
                    </div>
                    <Progress value={selectedCitizen.reputation} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">MRC Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedCitizen.mrcBalance.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Taxes Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedCitizen.taxesPaid.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Voting Power</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedCitizen.votingPower}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Registration Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        {new Date(selectedCitizen.registrationDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-2">
                  <Label>Last Activity</Label>
                  <div className="p-2 bg-secondary/50 rounded">
                    {new Date(selectedCitizen.lastActivity).toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Activity Summary</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2" />
                        Account Status
                      </div>
                      <Badge variant={selectedCitizen.status === 'active' ? 'default' : 'secondary'}>
                        {selectedCitizen.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Member Since
                      </div>
                      <span className="text-sm">
                        {new Date(selectedCitizen.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};