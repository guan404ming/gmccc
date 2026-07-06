#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const REPO = "guan404ming/gmccc";
const CLAUDE_MD_URL = `https://raw.githubusercontent.com/${REPO}/main/CLAUDE.md`;
const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");

const prune = (since) => {
  for (const name of fs.readdirSync(SKILLS_DIR)) {
    const meta = path.join(SKILLS_DIR, name, ".openskills.json");
    try {
      const { source, installedAt } = JSON.parse(fs.readFileSync(meta, "utf8"));
      if (source === REPO && new Date(installedAt) < since) {
        fs.rmSync(path.join(SKILLS_DIR, name), { recursive: true });
        console.log(`Pruned: ${name}`);
      }
    } catch {}
  }
};

const commands = {
  install: () => {
    const start = new Date();
    console.log("Installing skills...");
    execSync(`npx openskills install ${REPO} --global -y`, {
      stdio: "inherit",
    });
    prune(start);
    console.log("Installing global CLAUDE.md...");
    execSync(`curl -o ~/.claude/CLAUDE.md ${CLAUDE_MD_URL}`, {
      stdio: "inherit",
    });
    console.log("Done!");
  },
  uninstall: () => {
    console.log("Removing skills...");
    execSync("rm -rf ~/.claude/skills/*", { stdio: "inherit" });
    console.log("Removing global CLAUDE.md...");
    execSync("rm -f ~/.claude/CLAUDE.md", { stdio: "inherit" });
    console.log("Done!");
  },
};

const aliases = { i: "install", u: "uninstall" };
const cmd = aliases[process.argv[2]] || process.argv[2];
if (!cmd || cmd === "-h" || cmd === "--help" || !commands[cmd]) {
  console.log("Usage: gmccc <install|uninstall> (i, u)");
  process.exit(0);
}

commands[cmd]();
