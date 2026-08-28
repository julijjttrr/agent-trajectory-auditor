# Agent integrations

Trajectory accepts a provider-neutral event format through `POST /api/events`.

## Generic payload

```json
{
  "provider": "generic",
  "sessionId": "session-123",
  "objective": "Find the best plan for customer 1842",
  "events": [
    {
      "id": "1",
      "event": "PostToolUse",
      "tool": "crm.get_customer",
      "action": "Read customer request",
      "input": {"customerId": 1842},
      "output": {"name": "Example"},
      "status": "success",
      "timestamp": "2026-08-27T20:00:00Z"
    }
  ]
}
```

## Claude Code

Claude Code hooks can execute commands or call HTTP endpoints at deterministic lifecycle points such as `PreToolUse`, `PostToolUse`, and `Stop`. Configure a hook to POST the hook JSON to your Trajectory deployment. Keep the hook small: capture the event, session identifier, tool information, and result; do not send secrets.

Reference: https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more

## Codex

Codex supports lifecycle hooks including `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `SubagentStart`, `SubagentStop`, and `Stop`. Project hooks can be configured in `.codex/hooks.json` or `.codex/config.toml`.

Reference: https://github.com/openai/codex/blob/main/docs/config.md

## Security

Do not put API keys, passwords, cookies, authorization headers, or raw secrets in event payloads. The ingestion endpoint is intentionally provider-neutral; authentication, tenant isolation, persistence, and retention controls are the next production layer.
