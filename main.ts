import { std_async } from "./deps.ts";
const { debounce } = std_async;

import * as fswatcher from "./fswatcher.ts";
import { parseArgs } from "./args.ts";
import { commandRunner } from "./runner.ts";

function main() {
  const args = parseArgs(Deno.args);
  if (args.watchExtensions.length === 0) {
    console.warn(
      "%cNOTE%c: No watch extensions specified. Will only run once.",
      "color: #f90",
      "color: unset"
    );
  }

  const p = commandRunner(args.command);

  const isMatchingExt = (path: string) => {
    return args.watchExtensions.some((ext) => path.endsWith(ext));
  };

  const debouncer = debounce((e: Deno.FsEvent) => {
    const modifiedFile = e.paths[0];
    if (!isMatchingExt(modifiedFile)) return;

    console.clear();
    const TS = new Date().toTimeString().split(" ").at(0);

    console.log(
      `[${TS}] %cDenoW%c Detected file change, rerunning!`,
      "color: #09f; font-weight: bold",
      "color: unset"
    );

    p.restart();
  }, 100);

  const _watcher = fswatcher.init(Deno.cwd(), debouncer);
}

main();
