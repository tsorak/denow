import { std_path } from "./deps.ts";
const { resolve } = std_path;

function hasExtensionOf(self: string, extensions: string[]) {
  return extensions.some((ext) => self.endsWith(ext));
}

async function getSourceFilesFromDir(
  dir: string,
  CWD: string,
  targetExtensions: string[]
): Promise<string[]> {
  const targetDir = resolve(CWD, dir);

  let srcFiles: string[] = [];

  for await (const etr of Deno.readDir(targetDir)) {
    if (etr.isDirectory) {
      const subdir = resolve(targetDir, etr.name);
      srcFiles = [
        ...srcFiles,
        ...(await getSourceFilesFromDir(subdir, CWD, targetExtensions)),
      ];
      continue;
    }
    if (etr.isFile && hasExtensionOf(etr.name, targetExtensions)) {
      srcFiles.push(resolve(targetDir, etr.name));
    }
  }

  return srcFiles;
}

export async function gatherSourceFiles(
  dir: string,
  targetExtensions: string[]
): Promise<string[]> {
  const CWD = Deno.cwd();

  return await getSourceFilesFromDir(dir, CWD, targetExtensions);
}
