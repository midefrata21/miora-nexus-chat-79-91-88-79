import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Video, MessageSquare, Share2, GitBranch, Eye, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RealTimeCollaboration: React.FC = () => {
  const { toast } = useToast();
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [activeUsers, setActiveUsers] = useState([
    { id: 1, name: 'Alex', avatar: '', status: 'coding', cursor: { x: 120, y: 45 } },
    { id: 2, name: 'Sarah', avatar: '', status: 'reviewing', cursor: { x: 280, y: 120 } },
    { id: 3, name: 'Mike', avatar: '', status: 'testing', cursor: { x: 180, y: 200 } }
  ]);

  const collaborationFeatures = [
    { name: 'Real-time Code Editing', status: 'Active', icon: Edit3, users: 3 },
    { name: 'Live Cursor Tracking', status: 'Active', icon: Eye, users: 3 },
    { name: 'Voice & Video Chat', status: 'Active', icon: Video, users: 2 },
    { name: 'Shared Debugging', status: 'Active', icon: GitBranch, users: 2 },
    { name: 'Live Comments', status: 'Active', icon: MessageSquare, users: 5 },
    { name: 'Screen Sharing', status: 'Active', icon: Share2, users: 1 }
  ];

  const startCollaboration = () => {
    setIsCollaborating(!isCollaborating);
    toast({
      title: isCollaborating ? "Collaboration Ended" : "🚀 Real-time Collaboration Started",
      description: isCollaborating ? 
        "Collaboration session ended" : 
        "Multi-user development environment is now active!"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-300">
            <Users className="w-6 h-6" />
            Real-time Collaboration Hub
            <Badge className="bg-blue-600/20 text-blue-300">Multi-User Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {activeUsers.map(user => (
                  <Avatar key={user.id} className="border-2 border-blue-400">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="text-white font-medium">{activeUsers.length} Active Users</div>
                <div className="text-sm text-gray-400">Working together in real-time</div>
              </div>
            </div>
            <Button 
              onClick={startCollaboration}
              className={`${isCollaborating ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              {isCollaborating ? 'End Session' : 'Start Collaboration'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collaborationFeatures.map((feature, index) => (
              <Card key={index} className="bg-black/20 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <feature.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-white">{feature.name}</span>
                    </div>
                    <Badge className="bg-green-600/20 text-green-300 text-xs">
                      {feature.users} users
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-black/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg">Live Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="text-blue-400">Alex</span> is editing UserService.tsx
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">Sarah</span> reviewed pull request #127
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-purple-400">Mike</span> deployed to staging environment
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-cyan-400">Team</span> completed sprint planning session
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeCollaboration;