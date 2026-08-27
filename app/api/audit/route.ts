import { NextResponse } from 'next/server'
import { auditTrajectory, type AuditRequest } from '@/lib/audit'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AuditRequest>

    if (!body.objective || !Array.isArray(body.actions)) {
      return NextResponse.json(
        { error: 'objective and actions[] are required' },
        { status: 400 },
      )
    }

    const result = auditTrajectory({
      objective: body.objective,
      actions: body.actions,
      allowedTools: body.allowedTools,
    })

    return NextResponse.json({ ok: true, result })
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }
}
