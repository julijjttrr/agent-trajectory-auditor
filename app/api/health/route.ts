import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'agent-trajectory-auditor',
    version: '0.1.0',
    status: 'ready',
  })
}
