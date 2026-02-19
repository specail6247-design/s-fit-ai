'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-full w-full bg-black/80 text-red-500 font-mono text-xs p-4 text-center border border-red-900 rounded-lg">
          <div className="flex flex-col gap-2">
            <span>⚠️ 3D ENGINE RELOADING...</span>
            {this.state.error && <span className="text-[10px] opacity-50">{this.state.error.message}</span>}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
