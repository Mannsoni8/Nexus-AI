#!/usr/bin/env node
const [command, ...args] = process.argv.slice(2);

function main() {
  switch (command) {
    case "chat":
      console.log("Prompt:", args.join(" "));
      break;

    case "--version":
      console.log("NEXUS AI v0.1.0");
      break;

    case "--help":
    case undefined:
      console.log(`
NEXUS AI — AI Engineering CLI

Usage:
  nexus chat <prompt>
  nexus --version
  nexus --help
      `);
      break;

    default:
      console.error(`Unknown command: ${command}`);
      process.exitCode = 1;
  }
}

main();