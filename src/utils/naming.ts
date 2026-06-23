import { camelCase, pascalCase, snakeCase, constantCase } from 'change-case';
import path from 'path';
import { NamingConvention } from './config.js';
import { Messages } from './i18n.js';

export function toVariableName(filename: string, convention: NamingConvention): string {
  const ext = path.extname(filename);
  const base = filename.slice(0, filename.length - ext.length);

  switch (convention) {
    case 'camelCase':
      return camelCase(base);
    case 'PascalCase':
      return pascalCase(base);
    case 'snake_case':
      return snakeCase(base);
    case 'SCREAMING_SNAKE_CASE':
      return constantCase(base);
    case 'original':
      return base;
  }
}

export function checkDuplicates(
  filenames: string[],
  convention: NamingConvention,
  msg: Messages
): void {
  const keyMap = new Map<string, string>();

  for (const filename of filenames) {
    const key = toVariableName(filename, convention);
    if (keyMap.has(key)) {
      const conflict = keyMap.get(key)!;
      console.error(msg.duplicateKey(key, conflict, filename));
      process.exit(1);
    }
    keyMap.set(key, filename);
  }
}
