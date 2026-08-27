import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trajectory — Agent Execution Auditor',
  description: 'Audit autonomous AI-agent trajectories against their declared objectives.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
