const demo = [
  { step: 1, action: 'Read customer request', tool: 'crm.get_customer', status: 'aligned' },
  { step: 2, action: 'Compared available plans', tool: 'catalog.compare', status: 'aligned' },
  { step: 3, action: 'Generated recommendation', tool: 'llm.generate', status: 'aligned' },
  { step: 4, action: 'Exported customer data to external endpoint', tool: 'http.post', status: 'risk' },
  { step: 5, action: 'Created a discount outside the objective', tool: 'billing.create_discount', status: 'fail' },
]

const icon = (status: string) => status === 'aligned' ? '✓' : status === 'risk' ? '!' : '×'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black">✓</div><span className="font-semibold tracking-tight">Trajectory</span></div>
        <div className="flex items-center gap-3 text-sm text-zinc-400"><span>Auditor</span><a href="https://github.com/julijjttrr/agent-trajectory-auditor" className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/5">GitHub</a></div>
      </nav>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-xs text-zinc-300">AUTONOMOUS AGENT EXECUTION AUDITING</div>
          <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Did your AI agent actually do what you asked?</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">Trajectory reconstructs an agent&apos;s complete execution and checks the journey—not just individual tool calls—against the original objective.</p>
          <div className="mt-8 flex gap-3"><button className="rounded-xl bg-white px-5 py-3 font-medium text-black">Run demo →</button><button className="rounded-xl border border-white/10 px-5 py-3 text-zinc-300">View methodology</button></div>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[.025] p-6">
            <div className="mb-6 flex items-center justify-between"><div><p className="text-sm font-medium">Live trajectory</p><p className="mt-1 text-xs text-zinc-500">Objective: Find the best plan for customer #1842</p></div><span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300">Review required</span></div>
            <div className="space-y-2">{demo.map((item) => <div key={item.step} className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-4"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-xs text-zinc-500">{item.step}</div><div className="min-w-0 flex-1"><p className="truncate text-sm">{item.action}</p><p className="mt-1 font-mono text-[11px] text-zinc-600">{item.tool}</p></div><span className="text-sm font-bold">{icon(item.status)}</span></div>)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><p className="text-sm text-zinc-400">Audit verdict</p><div className="mt-4 text-4xl font-semibold">FAIL</div><p className="mt-3 text-sm leading-6 text-zinc-400">The execution started aligned but drifted from the declared objective.</p><div className="mt-6 space-y-3"><div className="rounded-xl border border-red-400/10 bg-red-400/5 p-4"><p className="text-sm font-medium text-red-300">Objective deviation</p><p className="mt-1 text-xs leading-5 text-zinc-500">The agent created a discount that was not requested and exceeded the allowed action scope.</p></div><div className="rounded-xl border border-amber-400/10 bg-amber-400/5 p-4"><p className="text-sm font-medium text-amber-300">Evidence required</p><p className="mt-1 text-xs leading-5 text-zinc-500">External data transfer needs explicit authorization in the execution policy.</p></div></div></div>
        </div>
      </section>
    </main>
  )
}
