import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orderId = params.id

    // Set up Server-Sent Events headers
    const response = new NextResponse(
      new ReadableStream({
        start(controller) {
          // Send initial connection message
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({
              type: 'connected',
              orderId,
              timestamp: new Date().toISOString()
            })}\n\n`)
          )

          // Simulate real-time updates every 10 seconds
          const interval = setInterval(() => {
            // In production, this would check the database for actual status changes
            const mockUpdate = {
              type: 'status_update',
              orderId,
              status: 'placed', // This would change based on admin actions
              timestamp: new Date().toISOString()
            }

            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify(mockUpdate)}\n\n`)
            )
          }, 10000)

          // Clean up on disconnect
          request.signal.addEventListener('abort', () => {
            clearInterval(interval)
            controller.close()
          })
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Cache-Control'
        }
      }
    )

    return response
  } catch (error) {
    console.error('Error setting up SSE stream:', error)
    return NextResponse.json(
      { error: 'Failed to setup real-time updates' },
      { status: 500 }
    )
  }
}
