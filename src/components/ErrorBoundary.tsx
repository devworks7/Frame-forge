import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle size={20} className="text-rose-400" />
            <h3 className="font-sans font-bold uppercase text-white">Module Error</h3>
          </div>
          <p className="text-xs">{this.state.error?.message || "An unexpected error occurred in this module."}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-rose-500 text-white rounded text-xs font-bold"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
