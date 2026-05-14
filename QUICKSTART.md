# Agent Team Starter Kit — Quick Start Guide

## What's In This Kit

```
starter-kit/
├── .claude/
│   └── agents/                        # Agent definitions (YAML frontmatter + system prompts)
│       ├── project-manager.md         # Orchestrator — coordinates all agents
│       ├── it-solution-architect.md   # Discovery & architecture planning
│       ├── requirements-agent.md      # Backlog decomposition & user stories
│       ├── coding-agent.md            # Implementation
│       ├── code-review-agent.md       # AC verification & standards compliance
│       ├── security-review-agent.md   # Security audit & deployment readiness
│       ├── cicd-integration-agent.md  # Git branching, commits, PRs
│       └── project-summary-agent.md   # Non-technical README generation
├── docs/
│   ├── backlog/                       # Requirements Agent outputs task files here
│   ├── reviews/                       # Code Review Agent outputs findings here
│   ├── security-reviews/              # Security Review Agent outputs findings here
│   └── task-log.md                    # Project Manager tracks all state transitions
├── CLAUDE.md                          # Shared conventions loaded by all agents
├── .gitignore
└── QUICKSTART.md                      # This file
```

## Prerequisites

1. **Claude Code installed**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Agent Teams enabled** — Add to your environment:
   ```bash
   export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
   ```
   Or add to your Claude Code `settings.json`:
   ```json
   {
     "env": {
       "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
     }
   }
   ```

3. **Opus model access** — The Project Manager and IT Solution Architect agents are configured to use Opus. Make sure your plan supports it (Max plan recommended for agent team workloads).

## Setup

1. **Create your project directory and initialize git:**
   ```bash
   mkdir my-portfolio && cd my-portfolio
   git init
   ```

2. **Copy the starter kit contents into your project:**
   ```bash
   # Copy everything from the starter-kit/ directory into your project root
   cp -r /path/to/starter-kit/. .
   ```

3. **Verify the agent files are in place:**
   ```bash
   ls .claude/agents/
   ```
   You should see all 8 agent `.md` files.

4. **Launch Claude Code:**
   ```bash
   claude
   ```

## Running the Pipeline

### Step 1: Kick Off the IT Solution Architect

In your Claude Code session, type:

```
Use the it-solution-architect agent. I want to build a personal portfolio website. 
It should be a static site deployable to GitHub Pages using vanilla HTML, CSS, and 
JavaScript. I want it to showcase my projects, skills, and professional background 
with a clean, modern design.
```

The IT Solution Architect will start asking you questions. Answer them — this is your discovery conversation. Push back on it if you disagree, and it will push back on you if your ideas have issues.

### Step 2: Automatic Handoff

Once the Architect finishes and saves `docs/project-plan.md`, it will automatically report to the Project Manager, who will spawn the Requirements Agent. You don't need to do anything here.

### Step 3: Backlog Review Checkpoint

The Project Manager will notify you when the backlog is ready and ask if you want to review it before coding begins. Check `docs/backlog/index.md` to see the full task list.

### Step 4: Watch It Build

Once you approve, the Project Manager starts assigning tasks to the Coding Agent. Each completed task flows through Code Review → Security Review → Integration automatically. You'll get progress updates at milestones.

### Step 5: README Generation

After all phases are complete, the Project Manager can spawn the Project Summary Agent to generate the public-facing README.md.

## Tips

- **Monitor token usage**: Run `/usage` in Claude Code periodically. Agent teams consume tokens across all teammates.
- **Start small**: For your first run, you might tell the Architect to keep it to 2-3 phases max.
- **Review the backlog**: The checkpoint after requirements decomposition is your best leverage point. Catching scope issues here saves the most tokens.
- **Check task-log.md**: The Project Manager maintains a running log of all state transitions — useful for understanding what happened if something goes wrong.

## Customizing for Other Projects

This kit is pre-configured for a static portfolio site, but the agents are project-agnostic. To use for a different project:

1. Update `CLAUDE.md` with the new project's conventions (language, framework, naming, etc.)
2. Launch with a different prompt to the IT Solution Architect
3. Everything else adapts automatically — the pipeline is the same regardless of what's being built

## Troubleshooting

**Agents not showing up?**
- Verify files are in `.claude/agents/` (not `.claude/agent/` or other paths)
- Check that the YAML frontmatter is valid (no tab characters, proper indentation)

**Agent Teams not working?**
- Confirm `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set
- Agent Teams requires Opus model access

**Token budget running out?**
- Consider switching Coding Agent to Haiku for simple HTML/CSS tasks
- Reduce backlog scope — tell the Architect to limit phases
- Review tasks in the backlog and remove any that are nice-to-have
