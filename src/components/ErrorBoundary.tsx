
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Log error untuk debugging
    if (typeof window !== 'undefined') {
      console.group('🔴 MIORA System Error');
      console.error('Error:', error.message);
      console.error('Stack:', error.stack);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  private handleRestart = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Reload halaman untuk fresh start
    window.location.reload();
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-6">
          <Card className="w-full max-w-2xl bg-gray-800/90 border-red-500/50">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <CardTitle className="text-2xl text-red-300">
                  MIORA System Error
                </CardTitle>
              </div>
              <p className="text-gray-300">
                Terjadi kesalahan sistem yang tidak terduga. MIORA sedang melakukan recovery.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-red-500/30">
                <h3 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <Bug className="w-4 h-4" />
                  Error Details
                </h3>
                <p className="text-sm text-gray-300 font-mono">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-400 cursor-pointer">
                      Stack Trace (Development)
                    </summary>
                    <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={this.handleRetry}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Coba Lagi
                </Button>
                
                <Button
                  onClick={this.handleRestart}
                  className="bg-gradient-to-r from-red-600 to-orange-600 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restart MIORA
                </Button>
              </div>

              <div className="text-center text-sm text-gray-400">
                <p>
                  Jika masalah berlanjut, MIORA akan beralih ke mode safe dan tetap berfungsi 
                  dengan fitur dasar untuk memastikan kontinuitas layanan.
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

export default ErrorBoundary;
