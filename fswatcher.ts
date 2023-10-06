import { std_async } from "./deps.ts";
const { debounce } = std_async;

import * as log from "./log.ts";

function startWatching(dir: string, handler: (event: Deno.FsEvent) => void) {
  const watcher = Deno.watchFs(dir);

  (async () => {
    for await (const event of watcher) {
      if (event.kind === "modify") {
        handler(event);
      }
    }
  })();
}

const isMatchingExt = (path: string, extensions: string[]) => {
  return extensions.some((ext) => path.endsWith(ext));
};

export function init(dir: string, extensions: string[], restartFn: () => void) {
  const onFileModifiedHandler = (e: Deno.FsEvent) => {
    const modifiedFile = e.paths[0];
    if (!isMatchingExt(modifiedFile, extensions)) return;

    log.fileChanged();

    restartFn();
  };

  startWatching(dir, debounce(onFileModifiedHandler, 100));
}
