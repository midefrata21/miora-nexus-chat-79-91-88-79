
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  GitPullRequest, 
  FileText,
  Clock,
  Users,
  Activity
} from 'lucide-react';

const VersionControl = () => {
  const recentCommits = [
    { 
      id: '1a2b3c4', 
      message: 'Enhanced MIORA Infinity UI components', 
      author: 'AI Developer', 
      time: '2 hours ago',
      branch: 'feature/infinity-ui'
    },
    { 
      id: '5d6e7f8', 
      message: 'Fixed navigation routing issues', 
      author: 'System Auto-Repair', 
      time: '4 hours ago',
      branch: 'bugfix/navigation'
    },
    { 
      id: '9g0h1i2', 
      message: 'Updated analytics dashboard components', 
      author: 'MIORA Core', 
      time: '6 hours ago',
      branch: 'feature/analytics'
    },
    { 
      id: '3j4k5l6', 
      message: 'Implemented quantum processing modules', 
      author: 'Quantum Engine', 
      time: '1 day ago',
      branch: 'experimental/quantum'
    }
  ];

  const branches = [
    { name: 'main', status: 'protected', commits: 247, active: true },
    { name: 'development', status: 'active', commits: 189, active: false },
    { name: 'feature/infinity-ui', status: 'active', commits: 12, active: false },
    { name: 'experimental/quantum', status: 'experimental', commits: 8, active: false }
  ];

  const getBranchStatusBadge = (status: string) => {
    switch (status) {
      case 'protected':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500">Protected</Badge>;
      case 'active':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">Active</Badge>;
      case 'experimental':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">Experimental</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">Inactive</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            MIORA Version Control
          </h1>
          <p className="text-gray-300 text-lg">Advanced Git Integration & Project Management</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <GitCommit className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Total Commits</h3>
              <p className="text-3xl font-bold text-blue-300">1,247</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <GitBranch className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Active Branches</h3>
              <p className="text-3xl font-bold text-green-300">4</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <GitPullRequest className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Pull Requests</h3>
              <p className="text-3xl font-bold text-purple-300">8</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Contributors</h3>
              <p className="text-3xl font-bold text-orange-300">12</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Commits */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <GitCommit className="w-6 h-6" />
              Recent Commits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCommits.map((commit, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <GitCommit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{commit.message}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-gray-400 text-sm">#{commit.id}</span>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {commit.branch}
                        </Badge>
                        <span className="text-gray-400 text-sm">{commit.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {commit.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branches */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <GitBranch className="w-6 h-6" />
              Repository Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branches.map((branch, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <GitBranch className={`w-6 h-6 ${branch.active ? 'text-green-400' : 'text-gray-400'}`} />
                    <div>
                      <h3 className="text-white font-semibold">{branch.name}</h3>
                      <p className="text-gray-400 text-sm">{branch.commits} commits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getBranchStatusBadge(branch.status)}
                    <Button 
                      size="sm" 
                      variant={branch.active ? "default" : "outline"}
                      className={branch.active ? "bg-green-600 hover:bg-green-700" : "border-gray-600"}
                    >
                      {branch.active ? 'Current' : 'Switch'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Git Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Quick Git Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <GitCommit className="w-4 h-4 mr-2" />
                Create New Commit
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <GitBranch className="w-4 h-4 mr-2" />
                Create New Branch
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <GitMerge className="w-4 h-4 mr-2" />
                Merge Branch
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <GitPullRequest className="w-4 h-4 mr-2" />
                Create Pull Request
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Repository Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Repository:</span>
                  <span className="text-white font-semibold">MIORA-System</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Branch:</span>
                  <span className="text-green-400 font-semibold">main</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Commit:</span>
                  <span className="text-white font-semibold">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Repository Size:</span>
                  <span className="text-white font-semibold">247 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Files Tracked:</span>
                  <span className="text-white font-semibold">1,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Remote Origin:</span>
                  <span className="text-white font-semibold">Connected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VersionControl;
