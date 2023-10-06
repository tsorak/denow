function fileChanged() {
  console.clear();
  const TS = new Date().toTimeString().split(" ").at(0);

  console.log(
    `[${TS}] %cDenoW%c Detected file change, rerunning!`,
    "color: #09f; font-weight: bold",
    "color: unset"
  );
}

function warnNoExts() {
  console.warn(
    "%cNOTE%c: No watch extensions specified. Will only run once.",
    "color: #f90",
    "color: unset"
  );
}

function processEnded() {
  console.log(
    `%cDenoW%c Process ended. Waiting for file changes...`,
    "color: #09f; font-weight: bold",
    "color: unset"
  );
}

export { fileChanged, warnNoExts, processEnded };
