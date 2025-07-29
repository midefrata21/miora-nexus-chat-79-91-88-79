
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, MessageSquare, Code, Palette, Upload, Zap } from 'lucide-react';

interface MultimodalInterfaceProps {
  currentQuery: string;
  onQueryUpdate: (query: string) => void;
  selectedMode: 'agent' | 'reflective';
}

export const MultimodalInterface: React.FC<MultimodalInterfaceProps> = ({
  currentQuery,
  onQueryUpdate,
  selectedMode
}) => {
  const [activeTab, setActiveTab] = useState('text');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const fileNames = files.map(file => file.name);
    setUploadedFiles(prev => [...prev, ...fileNames]);
  };

  const quickPrompts = {
    text: [
      "Jelaskan konsep AI dalam bahasa sederhana",
      "Buat outline presentasi tentang teknologi masa depan",
      "Analisis tren bisnis digital 2024"
    ],
    image: [
      "Generate image: futuristic AI workspace",
      "Create infographic: AI vs Human capabilities", 
      "Design logo: tech startup modern minimalist"
    ],
    code: [
      "Buat React component untuk dashboard",
      "Optimasi algoritma sorting terbaru",
      "Implementasi API integration pattern"
    ],
    creative: [
      "Tulis puisi tentang teknologi dan alam",
      "Cerita pendek: AI yang belajar empati",
      "Script video: pengenalan AI untuk pemula"
    ]
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="text-indigo-300 flex items-center justify-between">
          <div className="flex items-center">
            <Palette className="h-6 w-6 mr-2" />
            Multimodal Interface
          </div>
          <Badge className="bg-indigo-500">
            Mode: {selectedMode.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="creative" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Creative
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 mt-4">
            <div>
              <h4 className="text-white font-medium mb-2">Text Generation & Analysis</h4>
              <p className="text-gray-400 text-sm mb-3">
                Gunakan Gemini API untuk analisis mendalam, DeepAI untuk generasi cepat
              </p>
              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.text.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onQueryUpdate(prompt)}
                    className="justify-start text-left h-auto p-2"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="image" className="space-y-4 mt-4">
            <div>
              <h4 className="text-white font-medium mb-2">Image Generation & Analysis</h4>
              <p className="text-gray-400 text-sm mb-3">
                Pollinations untuk generasi gambar, Gemini untuk analisis visual
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Image for Analysis
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                />
                {uploadedFiles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {uploadedFiles.map((fileName, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {fileName}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.image.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onQueryUpdate(prompt)}
                    className="justify-start text-left h-auto p-2"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4 mt-4">
            <div>
              <h4 className="text-white font-medium mb-2">Code Generation & Review</h4>
              <p className="text-gray-400 text-sm mb-3">
                Hugging Face Local untuk reasoning code, Gemini untuk code analysis
              </p>
              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.code.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onQueryUpdate(prompt)}
                    className="justify-start text-left h-auto p-2"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="creative" className="space-y-4 mt-4">
            <div>
              <h4 className="text-white font-medium mb-2">Creative Content Generation</h4>
              <p className="text-gray-400 text-sm mb-3">
                Kombinasi semua providers untuk konten kreatif dan thematic
              </p>
              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.creative.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onQueryUpdate(prompt)}
                    className="justify-start text-left h-auto p-2"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Processing Indicators */}
        <div className="mt-6 p-4 bg-black/20 rounded-lg border border-gray-700/50">
          <h4 className="text-gray-300 font-medium mb-3 flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Provider Processing Order
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center space-x-2 p-2 bg-blue-900/20 rounded">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="text-blue-300">1. Gemini API</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-purple-900/20 rounded">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span className="text-purple-300">2. DeepAI</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-green-900/20 rounded">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-green-300">3. Hugging Face</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-orange-900/20 rounded">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-orange-300">4. Pollinations</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            🔄 Fallback otomatis jika provider tidak tersedia
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
