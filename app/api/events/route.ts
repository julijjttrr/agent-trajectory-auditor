import { NextResponse } from 'next/server'
import { auditTrajectory } from '@/lib/audit'
import { normalizeBatch } from '@/lib/ingest'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const normalized = normalizeBatch(payload)
    const result = auditTrajectory({
      objective: normalized.objective,
      actions: normalized.actions,
    })

    return NextResponse.json({
      ok: true,
      provider: normalized.provider,
      sessionId: normalized.sessionId ?? null,
      normalized,
      audit: result,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid event payload'
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
