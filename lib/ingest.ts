import type { TrajectoryAction } from './audit'

export type IngestEvent = {
  provider?: 'generic' | 'claude-code' | 'codex'
  sessionId?: string
  objective?: string
  event?: string
  tool?: string
  action?: string
  input?: unknown
  output?: unknown
  status?: 'success' | 'error' | 'blocked'
  timestamp?: string
  id?: string
  [key: string]: unknown
}

function firstString(...values: unknown[]) {
  return values.find((value): value is string => typeof value === 'string' && value.trim().length > 0)
}

export function normalizeEvent(raw: IngestEvent): TrajectoryAction {
  const tool = firstString(raw.tool, raw.tool_name, raw.name, raw.event, 'unknown')!
  const action = firstString(raw.action, raw.description, raw.command, raw.event, 'Agent event')!
  const status = raw.status ?? (raw.error ? 'error' : undefined)

  return {
    id: firstString(raw.id, raw.event_id),
    timestamp: firstString(raw.timestamp, raw.created_at, raw.time),
    tool,
    action,
    input: raw.input ?? raw.tool_input ?? raw.arguments,
    output: raw.output ?? raw.tool_output ?? raw.result,
    status,
  }
}

export function normalizeBatch(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a JSON object')
  }

  const body = payload as Record<string, unknown>
  const provider = firstString(body.provider, 'generic') as IngestEvent['provider']
  const objective = firstString(body.objective, body.goal, body.task)
  const sourceEvents = Array.isArray(body.events)
    ? body.events
    : Array.isArray(body.actions)
      ? body.actions
      : [body]

  const actions = sourceEvents.map((event) => normalizeEvent({
    ...(event as Record<string, unknown>),
    provider,
  }))

  return {
    provider,
    sessionId: firstString(body.sessionId, body.session_id),
    objective: objective ?? 'Objective not supplied; review trajectory without objective alignment scoring.',
    actions,
  }
}
