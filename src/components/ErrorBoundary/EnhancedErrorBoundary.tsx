import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Enhanced Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Auto-recovery attempt after 3 seconds
    setTimeout(() => {
      if (this.state.retryCount < 3) {
        this.handleRetry();
      }
    }, 3000);
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <Card className="max-w-2xl w-full border-red-200 dark:border-red-800">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl text-red-700 dark:text-red-300">
                System Error Detected
              </CardTitle>
              <p className="text-red-600 dark:text-red-400 mt-2">
                The application encountered an unexpected error. Our recovery system is attempting to restore functionality.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Details */}
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">
                    Error Details
                  </span>
                </div>
                <div className="text-sm text-red-600 dark:text-red-400 font-mono">
                  {this.state.error?.message || 'Unknown error occurred'}
                </div>
                {this.state.retryCount > 0 && (
                  <div className="text-xs text-red-500 dark:text-red-400 mt-1">
                    Retry attempts: {this.state.retryCount}/3
                  </div>
                )}
              </div>

              {/* Recovery Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={this.handleRetry}
                  variant="outline"
                  className="flex items-center gap-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                  disabled={this.state.retryCount >= 3}
                >
                  <RefreshCw className="h-4 w-4" />
                  {this.state.retryCount >= 3 ? 'Max Retries' : 'Try Again'}
                </Button>

                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Reset App
                </Button>

                <Button
                  onClick={this.handleReload}
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reload Page
                </Button>
              </div>

              {/* Auto-Recovery Status */}
              {this.state.retryCount > 0 && this.state.retryCount < 3 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Auto-recovery system active - attempting to restore functionality
                  </div>
                </div>
              )}

              {/* Technical Details (collapsible) */}
              {this.state.errorInfo && (
                <details className="mt-4">
                  <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    Show Technical Details
                  </summary>
                  <div className="mt-2 p-3 bg-muted rounded-lg text-xs font-mono overflow-auto max-h-40">
                    <pre>{this.state.errorInfo.componentStack}</pre>
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}