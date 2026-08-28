import { NextResponse } from 'next/server'

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5'

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Claude is not configured. Add ANTHROPIC_API_KEY to Vercel Environment Variables.' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : ''
    if (!prompt) return NextResponse.json({ error: 'prompt is required' }, { status: 400 })

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 12000,
        output_config: { effort: 'high' },
        system: 'You are the senior engineer behind Trajectory. Analyze AI-agent executions rigorously. Return concise, actionable engineering findings. Never claim an action happened unless it is supported by the supplied trajectory.',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      const message = data?.error?.message || 'Claude API request failed'
      return NextResponse.json({ error: message }, { status: response.status })
    }

    const text = Array.isArray(data.content)
      ? data.content.filter((part: { type?: string }) => part.type === 'text').map((part: { text?: string }) => part.text || '').join('\n')
      : ''

    return NextResponse.json({ ok: true, model: MODEL, text, usage: data.usage ?? null })
  } catch {
    return NextResponse.json({ error: 'Invalid request or Claude API failure' }, { status: 400 })
  }
}
