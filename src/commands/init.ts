import { select, input, confirm } from '@inquirer/prompts';
import {
  configExists,
  saveConfig,
  getDefaultConfig,
  getConfigPath,
  NamingConvention,
} from '../utils/config.js';
import { Language, getMessages } from '../utils/i18n.js';
import { generateAssets, generateDeclarations } from '../generators/asset-generator.js';

export async function runInit(options: { force?: boolean }): Promise<void> {
  if (configExists() && !options.force) {
    const lang = await selectLanguage();
    const msg = getMessages(lang);
    console.log(msg.alreadyExists);
    return;
  }

  const lang = await selectLanguage();
  const msg = getMessages(lang);
  const defaults = getDefaultConfig();

  let inputDir = '';
  while (true) {
    inputDir = await input({ message: msg.inputDir, default: defaults.input });
    const ok = await confirm({ message: msg.confirmInput(inputDir), default: true });
    if (ok) break;
  }

  let outputFile = '';
  while (true) {
    outputFile = await input({ message: msg.outputFile, default: defaults.output });
    const ok = await confirm({ message: msg.confirmOutput(outputFile), default: true });
    if (ok) break;
  }

  const naming = await select<NamingConvention>({
    message: msg.selectNaming,
    choices: (Object.keys(msg.namingLabels) as NamingConvention[]).map((key) => ({
      name: msg.namingLabels[key],
      value: key,
    })),
  });

  const config = { ...defaults, language: lang, input: inputDir, output: outputFile, naming };

  saveConfig(config);
  console.log(`\n${msg.initSuccess(getConfigPath())}`);

  console.log(msg.scanning(config.input));
  await generateAssets(config);
  console.log(msg.generated(config.output));

  const declPath = await generateDeclarations(config);
  console.log(msg.generatedDeclarations(declPath));
}

async function selectLanguage(): Promise<Language> {
  return select<Language>({
    message: 'Select language / 언어 선택 / 选择语言',
    choices: [
      { name: 'English', value: 'en' },
      { name: '한국어', value: 'ko' },
      { name: '中文', value: 'zh' },
    ],
  });
}
