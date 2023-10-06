// function parseToArray(extensionSpecifier: string): string[] | null {
//   try {
//     const parsed = JSON.parse(extensionSpecifier);
//     if (Array.isArray(parsed)) {
//       return parsed;
//     }
//     return null;
//   } catch (_) {
//     throw new Error(`${extensionSpecifier} is not parsable as an array`);
//   }
// }

function parseExtensionSpecifier(specifier: string): string[] {
  if (!specifier) {
    throw new Error("Expected file extension specifier after '-e='");
  }

  if (!specifier.includes(",")) {
    return [specifier];
  }

  return specifier.split(",");
}

function parseArgs(args: string[]): {
  watchExtensions: string[];
  command: string;
} {
  const parsed: ReturnType<typeof parseArgs> = {
    watchExtensions: [],
    command: "",
  };

  args.forEach((arg) => {
    if (arg.startsWith("-c=")) {
      parsed.command = arg.slice(3);
    } else if (arg.startsWith("-e=")) {
      parsed.watchExtensions = parseExtensionSpecifier(arg.slice(3));
    }
  });

  parsed.watchExtensions = parsed.watchExtensions.map((ext) => {
    if (!ext.startsWith(".")) {
      return `.${ext}`;
    }
    return ext;
  });

  return parsed;
}

export { parseArgs };
