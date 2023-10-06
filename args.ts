import { std_path } from "./deps.ts";
const { resolve } = std_path;

function ensureStartsWithDot(ext: string): string {
  if (!ext.startsWith(".")) {
    return `.${ext}`;
  }
  return ext;
}

function parseExtensionSpecifier(specifier: string): string[] {
  if (!specifier) {
    throw new Error("Expected file extension specifier after '-e='");
  }

  if (!specifier.includes(",")) {
    return [specifier];
  }

  return specifier.split(",").map((ext) => ensureStartsWithDot(ext));
}

function parseArgs(args: string[]): {
  watchExtensions: string[];
  command: string;
  watchDir: string;
} {
  const parsed: ReturnType<typeof parseArgs> = {
    watchExtensions: [],
    command: "",
    watchDir: resolve(Deno.cwd(), Deno.env.get("DENOW_WATCHDIR") ?? ""),
  };

  args.forEach((arg) => {
    const opt = arg.slice(0, 3);
    switch (opt) {
      case "-c=":
        parsed.command = arg.slice(3);
        return;
      case "-e=":
        parsed.watchExtensions = parseExtensionSpecifier(arg.slice(3));
        return;
      case "-d=":
        parsed.watchDir = resolve(Deno.cwd(), arg.slice(3));
        return;
      default:
        break;
    }
  });

  return parsed;
}

export { parseArgs };
