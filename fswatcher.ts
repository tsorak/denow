export function init(dir: string, handler: (event: Deno.FsEvent) => void) {
  const watcher = Deno.watchFs(dir);

  (async () => {
    for await (const event of watcher) {
      if (event.kind === "modify") {
        handler(event);
      }
    }
  })();
}
