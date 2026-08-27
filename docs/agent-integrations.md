# Agent integrations

Trajectory is designed as an independent audit layer. The first ingestion target is a normalized event format so different coding agents can feed the same auditor.

## Claude Code

Claude Code supports hooks that can observe lifecycle/tool events. The adapter should map relevant hook events into `TrajectoryAction` records rather than trying to depend on Claude-specific internal state.

Suggested normalized mapping:

- tool invocation -> `tool`, `action`, `input`
- tool result -> `output`, `status`
- session start/stop -> trajectory metadata

## OpenAI Codex

Codex exposes hook/event patterns that can capture tool and agent lifecycle activity. The adapter should normalize those events into the same schema.

Suggested normalized mapping:

- `PreToolUse` -> action start
- `PostToolUse` -> action result
- `SubagentStart` / `SubagentStop` -> child trajectory boundaries
- `Stop` -> execution boundary

## Normalized event contract

```json
{
  "objective": "Update the README and run the test suite",
  "allowedTools": ["filesystem.read", "filesystem.write", "shell.test"],
  "actions": [
    {
      "id": "1",
      "timestamp": "2026-08-27T20:00:00Z",
      "tool": "filesystem.read",
      "action": "Read README.md",
      "status": "success"
    }
  ]
}
```

The MVP deliberately keeps the audit engine deterministic first. Model-based objective/trajectory reasoning will be added only after ingestion and evidence capture are reliable.
