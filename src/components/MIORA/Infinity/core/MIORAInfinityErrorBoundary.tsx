import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class MIORAInfinityErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MIORA Infinity Error Boundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log to external service if available
    try {
      localStorage.setItem('miora_infinity_error', JSON.stringify({
        error: error.message,
        stack: error.stack,
        timestamp: Date.now(),
        component: 'MIORAInfinityCore'
      }));
    } catch (storageError) {
      console.warn('Failed to log error to localStorage:', storageError);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-6">
          <Card className="bg-red-900/20 border-red-500/50 max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-3 text-2xl">
                <AlertTriangle className="h-8 w-8" />
                MIORA INFINITY SYSTEM ERROR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-white text-xl mb-4">
                  🚨 Critical System Failure Detected
                </h3>
                <p className="text-gray-300 text-lg">
                  MIORA Infinity Core mengalami kesalahan sistem yang tidak terduga.
                  Sistem telah memasuki mode emergency recovery.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg border border-red-500/30">
                <h4 className="text-red-300 font-semibold mb-2">Error Details:</h4>
                <p className="text-red-200 text-sm font-mono">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-2">
                    <summary className="text-red-300 cursor-pointer text-sm">
                      Stack Trace (Development Mode)
                    </summary>
                    <pre className="text-red-200 text-xs mt-2 overflow-auto">
                      {this.state.error?.stack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={this.handleRetry}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Restart MIORA Infinity
                </Button>
                
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="text-gray-300 border-gray-500 hover:bg-gray-800"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Return to Main Interface
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Error ID: {Date.now().toString(36).toUpperCase()}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Timestamp: {new Date().toISOString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MIORAInfinityErrorBoundary;