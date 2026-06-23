export interface AssetEntry {
  variableName: string;
  importPath: string;
}

export function renderTemplate(entries: AssetEntry[]): string {
  if (entries.length === 0) {
    return `export const assets = {} as const;\n`;
  }

  const imports = entries
    .map((e) => `import ${e.variableName} from '${e.importPath}';`)
    .join('\n');

  const keys = entries.map((e) => `  ${e.variableName},`).join('\n');

  return `${imports}\n\nexport const assets = {\n${keys}\n} as const;\n`;
}
