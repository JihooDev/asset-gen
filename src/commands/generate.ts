import { loadConfig } from '../utils/config.js';
import { generateAssets, generateDeclarations } from '../generators/asset-generator.js';
import { getMessages } from '../utils/i18n.js';

export async function runGenerate(): Promise<void> {
  const config = loadConfig();
  const msg = getMessages(config.language);

  console.log(msg.scanning(config.input));
  await generateAssets(config);
  console.log(msg.generated(config.output));

  const declPath = await generateDeclarations(config);
  console.log(msg.generatedDeclarations(declPath));
}
