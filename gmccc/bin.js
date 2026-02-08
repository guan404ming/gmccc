#!/usr/bin/env node

const { execSync } = require("child_process");

const REPO = "guan404ming/claude-code-skills";
const CLAUDE_MD_URL = `https://raw.githubusercontent.com/${REPO}/main/CLAUDE.md`;

const commands = {
  install: () => {
    console.log("Installing skills...");
    execSync(`npx openskills install ${REPO} --global -y`, {
      stdio: "inherit",
    });
    console.log("Installing global CLAUDE.md...");
    execSync(`curl -o ~/.claude/CLAUDE.md ${CLAUDE_MD_URL}`, {
      stdio: "inherit",
    });
    console.log("Done!");
  },
};

const cmd = process.argv[2];
if (!cmd || !commands[cmd]) {
  console.log("Usage: gmccc install");
  process.exit(1);
}

commands[cmd]();
