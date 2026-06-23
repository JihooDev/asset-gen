import fs from 'fs';
import path from 'path';
import { Language, getMessages } from './i18n.js';

export type NamingConvention =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'SCREAMING_SNAKE_CASE'
  | 'original';

export interface AssetGenConfig {
  language: Language;
  input: string;
  output: string;
  extensions: string[];
  naming: NamingConvention;
}

const CONFIG_FILENAME = 'asset-gen.config.json';

export const DEFAULT_CONFIG: AssetGenConfig = {
  language: 'en',
  input: './src/assets',
  output: './src/assets/index.ts',
  extensions: ['png', 'jpg', 'jpeg', 'webp', 'svg'],
  naming: 'camelCase',
};

export function getDefaultConfig(): AssetGenConfig {
  return { ...DEFAULT_CONFIG };
}

export function getConfigPath(): string {
  return path.resolve(process.cwd(), CONFIG_FILENAME);
}

export function configExists(): boolean {
  return fs.existsSync(getConfigPath());
}

export function loadConfig(): AssetGenConfig {
  const configPath = getConfigPath();

  if (!fs.existsSync(configPath)) {
    const msg = getMessages('en');
    console.error(msg.configNotFound);
    process.exit(1);
  }

  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw) as AssetGenConfig;
    return { ...DEFAULT_CONFIG, ...config };
  } catch {
    const msg = getMessages('en');
    console.error(msg.configInvalid);
    process.exit(1);
  }
}

export function saveConfig(config: AssetGenConfig): void {
  fs.writeFileSync(getConfigPath(), JSON.stringify(config, null, 2) + '\n', 'utf-8');
}
