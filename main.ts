import * as fswatcher from "./fswatcher.ts";
import * as log from "./log.ts";
import { parseArgs } from "./args.ts";
import { commandRunner } from "./runner.ts";

function main() {
  const args = parseArgs(Deno.args);
  if (args.watchExtensions.length === 0) log.warnNoExts();

  const p = commandRunner(args.command);

  fswatcher.init(args.watchDir, args.watchExtensions, p.restart);
}

main();
