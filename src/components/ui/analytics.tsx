'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface AnalyticsEvent {
  event: string
  properties?: Record<string, unknown>
  timestamp: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private isInitialized = false

  init() {
    if (this.isInitialized) return
    this.isInitialized = true
    
    // Track page views
    this.track('page_view', {
      url: window.location.href,
      title: document.title,
      referrer: document.referrer
    })

    // Track user interactions
    this.setupEventListeners()
  }

  track(event: string, properties?: Record<string, unknown>) {
    const eventData: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now()
    }

    this.events.push(eventData)
    
    // In production, you would send this to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventData)
    }

    // Send to analytics service (example with Google Analytics)
    if (typeof window !== 'undefined' && (window as { gtag?: unknown }).gtag) {
      // Safe to ignore type error for external analytics
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', event, properties)
    }
  }

  private setupEventListeners() {
    // Track button clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button')
        if (button) {
          const text = button.textContent?.trim() || 'Unknown Button'
          const href = button.getAttribute('href')
          
          this.track('button_click', {
            button_text: text,
            button_href: href,
            button_type: button.getAttribute('type') || 'button'
          })
        }
      }
    })

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement
      this.track('form_submit', {
        form_action: form.action,
        form_method: form.method,
        form_id: form.id || 'unknown'
      })
    })

          // Track external links
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const link = target.tagName === 'A' ? target : target.closest('a')
        if (link && (link as HTMLAnchorElement).hostname !== window.location.hostname) {
          this.track('external_link_click', {
            url: (link as HTMLAnchorElement).href,
            link_text: link.textContent?.trim() || 'Unknown Link'
          })
        }
      })
  }

  getEvents() {
    return [...this.events]
  }

  clearEvents() {
    this.events = []
  }
}

export const analytics = new Analytics()

// Hook for tracking page views
export function usePageTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      analytics.track('page_view', {
        path: pathname,
        url: window.location.href,
        title: document.title
      })
    }
  }, [pathname])
}

// Hook for tracking custom events
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    getEvents: analytics.getEvents.bind(analytics),
    clearEvents: analytics.clearEvents.bind(analytics)
  }
}

// Component for automatic analytics initialization
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    analytics.init()
  }, [])

  return <>{children}</>
}
