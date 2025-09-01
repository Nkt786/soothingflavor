'use client'

import { useEffect } from 'react'

interface ErrorLog {
  id: string
  timestamp: number
  error: string
  stack?: string
  url: string
  userAgent: string
  componentStack?: string
  additionalInfo?: Record<string, unknown>
}

class ErrorLogger {
  private logs: ErrorLog[] = []
  private isInitialized = false

  init() {
    if (this.isInitialized) return
    this.isInitialized = true

    // Global error handler
    window.addEventListener('error', (event) => {
      this.logError('Global Error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    })

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', event.reason, {
        promise: event.promise
      })
    })

    // React error boundary errors (if using error boundaries)
    if (typeof window !== 'undefined') {
      // Safe to ignore type error for global error handler
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__REACT_ERROR_BOUNDARY_ERROR__ = (error: Error, componentStack: string) => {
        this.logError('React Error Boundary', error, {
          componentStack
        })
      }
    }
  }

  logError(type: string, error: Error | string, additionalInfo?: Record<string, unknown>) {
    const errorLog: ErrorLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      error: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      componentStack: additionalInfo?.componentStack as string,
      additionalInfo
    }

    this.logs.push(errorLog)

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 ${type}`)
      console.error('Error:', errorLog.error)
      if (errorLog.stack) console.error('Stack:', errorLog.stack)
      if (errorLog.componentStack) console.error('Component Stack:', errorLog.componentStack)
      console.error('Additional Info:', additionalInfo)
      console.groupEnd()
    }

    // Send to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorLog)
    }
  }

  private sendToErrorService(errorLog: ErrorLog) {
    // Example: Send to Sentry, LogRocket, or custom error service
    try {
      // You can replace this with your preferred error reporting service
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorLog)
      }).catch(() => {
        // Fallback: store locally if API fails
        this.storeLocally(errorLog)
      })
    } catch {
      this.storeLocally(errorLog)
    }
  }

  private storeLocally(errorLog: ErrorLog) {
    try {
      const existingLogs = localStorage.getItem('error_logs')
      const logs = existingLogs ? JSON.parse(existingLogs) : []
      logs.push(errorLog)
      
      // Keep only last 100 errors
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100)
      }
      
      localStorage.setItem('error_logs', JSON.stringify(logs))
    } catch {
      // If localStorage fails, just keep in memory
    }
  }

  getLogs() {
    return [...this.logs]
  }

  getLocalLogs() {
    try {
      const logs = localStorage.getItem('error_logs')
      return logs ? JSON.parse(logs) : []
    } catch {
      return []
    }
  }

  clearLogs() {
    this.logs = []
    try {
      localStorage.removeItem('error_logs')
    } catch {
      // Ignore localStorage errors
    }
  }

  // Export logs for debugging
  exportLogs() {
    const allLogs = [...this.logs, ...this.getLocalLogs()]
    const blob = new Blob([JSON.stringify(allLogs, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `error-logs-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
}

export const errorLogger = new ErrorLogger()

// Hook for component error logging
export function useErrorLogger() {
  useEffect(() => {
    errorLogger.init()
  }, [])

  return {
    logError: errorLogger.logError.bind(errorLogger),
    getLogs: errorLogger.getLogs.bind(errorLogger),
    clearLogs: errorLogger.clearLogs.bind(errorLogger),
    exportLogs: errorLogger.exportLogs.bind(errorLogger)
  }
}

// Component for automatic error logging initialization
export function ErrorLoggerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    errorLogger.init()
  }, [])

  return <>{children}</>
}

// Development error log viewer
export function ErrorLogViewer() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const logs = errorLogger.getLogs()
  const localLogs = errorLogger.getLocalLogs()

  if (logs.length === 0 && localLogs.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-900 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-sm">
      <div className="font-bold mb-2">🚨 Error Logs</div>
      <div className="space-y-1 text-xs">
        <div>Memory: {logs.length}</div>
        <div>Local: {localLogs.length}</div>
        <button
          onClick={() => errorLogger.exportLogs()}
          className="bg-red-700 hover:bg-red-600 px-2 py-1 rounded text-xs"
        >
          Export
        </button>
        <button
          onClick={() => errorLogger.clearLogs()}
          className="bg-red-700 hover:bg-red-600 px-2 py-1 rounded text-xs ml-2"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
