import glob from 'fast-glob';
import path from 'path';

export async function scanAssets(inputDir: string, extensions: string[]): Promise<string[]> {
  const patterns = extensions.map((ext) => `**/*.${ext}`);
  const files = await glob(patterns, {
    cwd: path.resolve(process.cwd(), inputDir),
    caseSensitiveMatch: false,
    onlyFiles: true,
  });

  return files.sort();
}

export function relativeImportPath(from: string, to: string, filename: string): string {
  const outputDir = path.dirname(path.resolve(process.cwd(), from));
  const inputDir = path.resolve(process.cwd(), to);
  const fullFilePath = path.join(inputDir, filename);
  const rel = path.relative(outputDir, fullFilePath).replace(/\\/g, '/');
  return rel.startsWith('.') ? rel : `./${rel}`;
}
