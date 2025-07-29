
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  HardDrive, 
  Folder, 
  File, 
  Trash2, 
  Download,
  Upload,
  Search,
  Archive,
  BarChart3
} from 'lucide-react';

const StorageManagerPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('root');

  const storageStats = [
    { name: 'Total Storage', value: '500 GB', icon: HardDrive, color: 'text-blue-400' },
    { name: 'Used Space', value: '187 GB', icon: BarChart3, color: 'text-green-400' },
    { name: 'Available', value: '313 GB', icon: HardDrive, color: 'text-purple-400' },
    { name: 'Files Count', value: '12,847', icon: File, color: 'text-orange-400' }
  ];

  const folders = [
    { name: 'System Files', size: '45.2 GB', files: 1247, type: 'system' },
    { name: 'Voice Data', size: '89.6 GB', files: 3456, type: 'voice' },
    { name: 'Learning Models', size: '34.8 GB', files: 892, type: 'ai' },
    { name: 'Conversation Logs', size: '12.3 GB', files: 5673, type: 'logs' },
    { name: 'Backup Files', size: '5.1 GB', files: 234, type: 'backup' }
  ];

  const recentFiles = [
    { name: 'voice_session_2024.wav', size: '12.5 MB', type: 'audio', modified: '2 hours ago' },
    { name: 'learning_data.json', size: '3.2 MB', type: 'data', modified: '4 hours ago' },
    { name: 'system_backup.zip', size: '156 MB', type: 'archive', modified: '1 day ago' },
    { name: 'conversation_log.txt', size: '892 KB', type: 'text', modified: '2 days ago' }
  ];

  const cleanupStorage = () => {
    toast({
      title: "🧹 Storage Cleanup",
      description: "Temporary files and cache cleared successfully",
      duration: 3000,
    });
  };

  const createBackup = () => {
    toast({
      title: "💾 Backup Created",
      description: "System backup created and stored successfully",
      duration: 3000,
    });
  };

  const getFolderIcon = (type: string) => {
    switch (type) {
      case 'system': return HardDrive;
      case 'voice': return File;
      case 'ai': return BarChart3;
      case 'logs': return Archive;
      case 'backup': return Download;
      default: return Folder;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <HardDrive className="w-8 h-8 text-cyan-400" />
            Storage Manager
            <Archive className="w-8 h-8 text-orange-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive file and storage management system
          </p>
        </div>

        {/* Storage Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {storageStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.name} className="bg-gray-800/50 border-gray-600/30">
                <CardContent className="p-4 text-center">
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.name}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Storage Usage */}
        <Card className="bg-gray-800/50 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-300">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Used: 187 GB</span>
                <span className="text-gray-300">Available: 313 GB</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full" style={{ width: '37%' }}></div>
              </div>
              <div className="text-center text-sm text-gray-400">
                37% of total storage used
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Browser */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="w-5 h-5" />
                  Folders
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {folders.map((folder) => {
                  const IconComponent = getFolderIcon(folder.type);
                  return (
                    <div 
                      key={folder.name}
                      className="p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-all"
                      onClick={() => setSelectedFolder(folder.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-cyan-400" />
                          <div>
                            <h3 className="text-white font-medium">{folder.name}</h3>
                            <p className="text-sm text-gray-400">{folder.files} files</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{folder.size}</div>
                          <Badge className="bg-gray-600 text-gray-300 text-xs">
                            {folder.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <File className="w-5 h-5" />
                  Recent Files
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-32 h-8 bg-gray-700/50 border-gray-600/30 text-white text-sm"
                  />
                  <Button size="sm" variant="outline">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentFiles.map((file, index) => (
                  <div key={index} className="p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <File className="w-4 h-4 text-green-400" />
                        <div>
                          <h3 className="text-white text-sm font-medium">{file.name}</h3>
                          <p className="text-xs text-gray-400">{file.modified}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">{file.size}</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage Actions */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300">Storage Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button onClick={cleanupStorage} className="bg-orange-600 hover:bg-orange-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Cleanup Storage
              </Button>
              <Button onClick={createBackup} className="bg-blue-600 hover:bg-blue-700">
                <Archive className="w-4 h-4 mr-2" />
                Create Backup
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze Usage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorageManagerPage;
