import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreePine } from 'lucide-react';

interface MemoryStructureCardProps {
  folderStructure: Array<{
    key: string;
    label: string;
    icon: string;
  }>;
  onQuery: (folderKey: string, query: string) => void;
  queryResult: any;
}

export const MemoryStructureCard: React.FC<MemoryStructureCardProps> = ({
  folderStructure,
  onQuery,
  queryResult,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [queryInput, setQueryInput] = useState('');

  const handleQuery = () => {
    onQuery(selectedFolder, queryInput);
  };

  return (
    <Card className="bg-gradient-to-r from-cyan-900/30 to-green-900/30 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="flex items-center text-cyan-300">
          <TreePine className="w-5 h-5 mr-2" />
          Long-term Memory Structure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {folderStructure.map((folder) => (
            <button
              key={folder.key}
              onClick={() => setSelectedFolder(folder.key)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedFolder === folder.key
                  ? 'border-cyan-400 bg-cyan-900/20'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center text-sm">
                <span className="mr-2">{folder.icon}</span>
                <span className="text-gray-200">{folder.label}</span>
              </div>
            </button>
          ))}
        </div>

        {selectedFolder && (
          <div className="mt-4 p-4 bg-black/20 rounded-lg">
            <h4 className="text-sm font-semibold text-cyan-300 mb-2">
              Query Folder: {folderStructure.find(f => f.key === selectedFolder)?.label}
            </h4>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Apa yang kamu tahu soal...?"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-sm text-white"
              />
              <Button
                onClick={handleQuery}
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-500"
              >
                Query
              </Button>
            </div>
            
            {queryResult && (
              <div className="bg-gray-800/50 p-3 rounded text-xs text-gray-300">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(queryResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};