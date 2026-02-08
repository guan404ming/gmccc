# Guan-Ming's Claude Code Skills

[![PyPI](https://img.shields.io/pypi/v/gmccc)](https://pypi.org/project/gmccc/)
[![npm](https://img.shields.io/npm/v/gmccc)](https://www.npmjs.com/package/gmccc)

Custom skills for Claude Code.

## Install Skills with npx

```bash
npx gmccc install
npx gmccc uninstall
```

## gmccc CLI

```bash
uv tool install gmccc
```

| Command | Alias | Description |
|---|---|---|
| `gmccc install` | `gmccc i` | Install skills via openskills |
| `gmccc run <name>` | `gmccc r <name>` | Run a specific job |
| `gmccc config` | `gmccc c` | Create default config file |
| `gmccc config <path>` | `gmccc c <path>` | Create config at custom path |
| `gmccc start` | | Start scheduler daemon |
| `gmccc stop` | | Stop scheduler daemon |
| `gmccc status` | | Check scheduler status |
| `gmccc logs` | | Tail scheduler logs |
| `gmccc list` | `gmccc l` | List available jobs |
| `gmccc test` | `gmccc t` | Simulate execution |
