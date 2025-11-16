import React from 'react';
import PropTypes from 'prop-types';
import { logger } from '../utils/errorHandler';

/**
 * Error Boundary Component
 * Catches JavaScript errors in child component tree and displays a fallback UI
 * Prevents entire app from crashing due to component errors
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to our error handling service
    logger.error('Component error caught by boundary', {
      error: error.toString(),
      componentStack: errorInfo.componentStack
    });

    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 border border-red-200">
            <div className="text-center">
              <div className="text-5xl mb-4" role="img" aria-label="Error">
                ⚠️
              </div>
              <h2 className="text-xl font-bold text-red-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-4">
                An unexpected error occurred in the application. Your army composition data is safe.
              </p>

              {this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 text-left">
                  <p className="text-sm font-mono text-red-800 break-words">
                    {this.state.error.message || this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={this.handleReset}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                  aria-label="Try to recover from error"
                >
                  Try Again
                </button>
                <button
                  onClick={this.handleReload}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
                  aria-label="Reload the page"
                >
                  Reload Page
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                If this problem persists, please{' '}
                <a
                  href="https://github.com/conorbronsdon/aoe2-troop-calculator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  report an issue
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
