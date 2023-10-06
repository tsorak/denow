import * as log from "./log.ts";

const commandRunner = function (command: string) {
  let process: Deno.ChildProcess | undefined;

  const cmd = command.split(" ");
  const bin = cmd.shift();
  const args = cmd;

  if (!bin) throw new Error("No binary specified");

  if (!process) start();

  function start() {
    process = new Deno.Command(bin!, {
      args,
      stdout: "inherit",
      stderr: "inherit",
    }).spawn();

    (async () => {
      await process!.output();
      log.processEnded();
    })();
  }

  function restart() {
    try {
      process!.kill("SIGKILL");
    } catch (_) {
      //
    }
    start();
  }

  return { process: process!, restart };
};

export { commandRunner };
