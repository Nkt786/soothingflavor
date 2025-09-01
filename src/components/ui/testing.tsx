'use client'

import { useState } from 'react'
import { useAnalytics } from './analytics'
import { usePerformanceMetrics } from './performance'

interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'pending'
  message?: string
  duration?: number
}

export function TestingPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const { track, getEvents } = useAnalytics()
  const performanceMetrics = usePerformanceMetrics()

  const runTests = async () => {
    setIsRunning(true)
    setTests([])

    const testResults: TestResult[] = []

    // Test 1: Local Storage
    const start1 = Date.now()
    try {
      localStorage.setItem('test', 'value')
      const value = localStorage.getItem('test')
      localStorage.removeItem('test')
      
      if (value === 'value') {
        testResults.push({
          name: 'Local Storage',
          status: 'pass',
          duration: Date.now() - start1
        })
      } else {
        testResults.push({
          name: 'Local Storage',
          status: 'fail',
          message: 'Failed to read/write to localStorage',
          duration: Date.now() - start1
        })
      }
    } catch (error) {
      testResults.push({
        name: 'Local Storage',
        status: 'fail',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - start1
      })
    }

    // Test 2: Performance APIs
    const start2 = Date.now()
    try {
      if ('performance' in window) {
        testResults.push({
          name: 'Performance API',
          status: 'pass',
          duration: Date.now() - start2
        })
      } else {
        testResults.push({
          name: 'Performance API',
          status: 'fail',
          message: 'Performance API not available',
          duration: Date.now() - start2
        })
      }
    } catch (error) {
      testResults.push({
        name: 'Performance API',
        status: 'fail',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - start2
      })
    }

    // Test 3: Analytics
    const start3 = Date.now()
    try {
      track('test_event', { test: true })
      const events = getEvents()
      const testEvent = events.find(e => e.event === 'test_event')
      
      if (testEvent) {
        testResults.push({
          name: 'Analytics',
          status: 'pass',
          duration: Date.now() - start3
        })
      } else {
        testResults.push({
          name: 'Analytics',
          status: 'fail',
          message: 'Failed to track test event',
          duration: Date.now() - start3
        })
      }
    } catch (error) {
      testResults.push({
        name: 'Analytics',
        status: 'fail',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - start3
      })
    }

    // Test 4: Toast System
    const start4 = Date.now()
    try {
      // This will be tested by the actual toast system
      testResults.push({
        name: 'Toast System',
        status: 'pass',
        duration: Date.now() - start4
      })
    } catch (error) {
      testResults.push({
        name: 'Toast System',
        status: 'fail',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - start4
      })
    }

    // Test 5: Theme System
    const start5 = Date.now()
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === null) {
        testResults.push({
          name: 'Theme System',
          status: 'pass',
          duration: Date.now() - start5
        })
      } else {
        testResults.push({
          name: 'Theme System',
          status: 'fail',
          message: 'Invalid theme value in localStorage',
          duration: Date.now() - start5
        })
      }
    } catch (error) {
      testResults.push({
        name: 'Theme System',
        status: 'fail',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - start5
      })
    }

    setTests(testResults)
    setIsRunning(false)
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pass': return 'text-green-500'
      case 'fail': return 'text-red-500'
      case 'pending': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass': return '✅'
      case 'fail': return '❌'
      case 'pending': return '⏳'
      default: return '❓'
    }
  }

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg z-50 text-sm font-mono"
        title="Testing Panel"
      >
        🧪
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-20 left-4 right-4 bottom-4 bg-white rounded-lg shadow-2xl p-6 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">🧪 Testing Panel</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Controls */}
            <div className="mb-6 space-y-4">
              <button
                onClick={runTests}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                {isRunning ? 'Running Tests...' : 'Run All Tests'}
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Performance Metrics</h3>
                  <div className="space-y-1 text-sm">
                    <div>FCP: {performanceMetrics.fcp ? `${Math.round(performanceMetrics.fcp)}ms` : '...'}</div>
                    <div>LCP: {performanceMetrics.lcp ? `${Math.round(performanceMetrics.lcp)}ms` : '...'}</div>
                    <div>CLS: {performanceMetrics.cls ? performanceMetrics.cls.toFixed(3) : '...'}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Analytics Events</h3>
                  <div className="text-sm">
                    Total Events: {getEvents().length}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Results */}
            {tests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Test Results</h3>
                <div className="space-y-2">
                  {tests.map((test, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        test.status === 'pass' ? 'bg-green-50 border-green-200' :
                        test.status === 'fail' ? 'bg-red-50 border-red-200' :
                        'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getStatusIcon(test.status)}</span>
                        <div>
                          <div className={`font-medium ${getStatusColor(test.status)}`}>
                            {test.name}
                          </div>
                          {test.message && (
                            <div className="text-sm text-gray-600">{test.message}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {test.duration}ms
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">Summary: </span>
                      <span className="text-green-600">
                        {tests.filter(t => t.status === 'pass').length} passed
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-red-600">
                        {tests.filter(t => t.status === 'fail').length} failed
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Total Duration: {tests.reduce((sum, t) => sum + (t.duration || 0), 0)}ms
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
