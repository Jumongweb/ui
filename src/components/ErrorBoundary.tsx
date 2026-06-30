import React from "react";
import { cn } from "@/lib/utils";

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((error: Error, reset: () => void) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
  isolate?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  resetKey: number;
}

/**
 * ErrorBoundary Component
 *
 * React error boundary that catches errors in child components and displays
 * a user-friendly error message instead of crashing the entire application.
 *
 * @component
 * @example
 * ```tsx
 * import { ErrorBoundary } from 'sorokit-ui';
 * import { MyComponent } from './MyComponent';
 *
 * export function App() {
 *   return (
 *     <ErrorBoundary>
 *       <MyComponent />
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      resetKey: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  reset = () => {
    this.setState((state) => ({
      hasError: false,
      error: null,
      resetKey: state.resetKey + 1,
    }));
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const fallbackContent =
        typeof this.props.fallback === "function"
          ? this.props.fallback(this.state.error, this.reset)
          : this.props.fallback
            ? this.props.fallback
            : this.renderDefaultFallback();

      if (this.props.isolate) {
        return (
          <div className="overflow-hidden rounded-xl bg-error-dim border border-error-dim p-4">
            {fallbackContent}
          </div>
        );
      }

      return fallbackContent;
    }

    return (
      <div key={this.state.resetKey}>
        {this.props.children}
      </div>
    );
  }

  private renderDefaultFallback() {
    return (
      <div className="rounded-lg bg-error-dim-muted border border-error-dim p-4 text-left">
        <h2 className="text-ink font-semibold mb-2">Something went wrong</h2>
        <p className="text-ink-2 text-sm mb-4">{this.state.error?.message}</p>
        <button
          onClick={this.reset}
          className="px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }
}
