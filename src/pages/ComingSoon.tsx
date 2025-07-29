
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction, Clock, Lightbulb } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-cyan-300 hover:text-white hover:bg-purple-600/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <Card className="bg-gray-800/50 border-purple-500/30 max-w-2xl mx-auto backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full">
                  <Construction className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {title}
              </CardTitle>
              <Badge className="bg-orange-500 text-white mb-4">
                Coming Soon
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-gray-300 text-lg">
                This feature is currently under development and will be available in a future update.
              </div>
              
              <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 p-6 rounded-lg border border-purple-500/20">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-purple-300 mr-2" />
                  <span className="text-purple-300 font-semibold">Development Status</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Our development team is working hard to bring you this feature. 
                  Stay tuned for updates and new releases!
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-800/30 to-blue-800/30 p-6 rounded-lg border border-cyan-500/20">
                <div className="flex items-center justify-center mb-3">
                  <Lightbulb className="w-6 h-6 text-cyan-300 mr-2" />
                  <span className="text-cyan-300 font-semibold">Have Suggestions?</span>
                </div>
                <p className="text-gray-300 text-sm">
                  We'd love to hear your ideas for this feature. Your feedback helps us build better tools for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                >
                  Return to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/infrastructure')}
                  className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-600/20"
                >
                  Explore Available Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Features */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Available Features You Can Try
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="bg-gray-800/50 border-green-500/30 cursor-pointer hover:border-green-400/50 transition-all backdrop-blur-sm"
              onClick={() => navigate('/infrastructure')}
            >
              <CardContent className="p-4 text-center">
                <div className="text-green-300 font-semibold mb-1">Infrastructure</div>
                <div className="text-sm text-gray-400">System Management</div>
              </CardContent>
            </Card>
            
            <Card 
              className="bg-gray-800/50 border-blue-500/30 cursor-pointer hover:border-blue-400/50 transition-all backdrop-blur-sm"
              onClick={() => navigate('/security')}
            >
              <CardContent className="p-4 text-center">
                <div className="text-blue-300 font-semibold mb-1">Security Center</div>
                <div className="text-sm text-gray-400">Privacy & Protection</div>
              </CardContent>
            </Card>
            
            <Card 
              className="bg-gray-800/50 border-purple-500/30 cursor-pointer hover:border-purple-400/50 transition-all backdrop-blur-sm"
              onClick={() => navigate('/miora-develop')}
            >
              <CardContent className="p-4 text-center">
                <div className="text-purple-300 font-semibold mb-1">MIORA Develop</div>
                <div className="text-sm text-gray-400">AI Development</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
