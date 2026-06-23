#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/commands/init.ts
import { select, input, confirm } from "@inquirer/prompts";

// src/utils/config.ts
import fs from "fs";
import path from "path";

// src/utils/i18n.ts
var messages = {
  en: {
    selectLanguage: "Select language",
    inputDir: "Enter the assets folder path",
    confirmInput: (p) => `Assets folder: "${p}" \u2014 is this correct?`,
    outputFile: "Enter the output file path",
    confirmOutput: (p) => `Output file: "${p}" \u2014 is this correct?`,
    selectNaming: "Select naming convention",
    namingLabels: {
      camelCase: "camelCase   \u2192 userProfile",
      PascalCase: "PascalCase  \u2192 UserProfile",
      snake_case: "snake_case  \u2192 user_profile",
      SCREAMING_SNAKE_CASE: "SCREAMING_SNAKE_CASE \u2192 USER_PROFILE",
      original: "original    \u2192 user-profile"
    },
    initSuccess: (p) => `Created ${p}`,
    alreadyExists: "asset-gen.config.json already exists. Use --force to overwrite.",
    scanning: (p) => `Scanning: ${p}`,
    generated: (p) => `Generated: ${p}`,
    assetAdded: (f) => `${f} added`,
    assetRemoved: (f) => `${f} removed`,
    regenerated: (p) => `${p} regenerated
`,
    duplicateKey: (key, a, b) => `
Duplicate asset key detected: ${key}
   - ${a}
   - ${b}
`,
    generatedDeclarations: (p) => `Generated type declarations: ${p}`,
    configNotFound: 'asset-gen.config.json not found. Run "asset-gen init" first.',
    configInvalid: "asset-gen.config.json is not valid JSON."
  },
  ko: {
    selectLanguage: "\uC5B8\uC5B4\uB97C \uC120\uD0DD\uD558\uC138\uC694",
    inputDir: "\uC5D0\uC14B \uD3F4\uB354 \uACBD\uB85C\uB97C \uC785\uB825\uD558\uC138\uC694",
    confirmInput: (p) => `\uC5D0\uC14B \uD3F4\uB354: "${p}" \u2014 \uB9DE\uB098\uC694?`,
    outputFile: "\uCD9C\uB825 \uD30C\uC77C \uACBD\uB85C\uB97C \uC785\uB825\uD558\uC138\uC694",
    confirmOutput: (p) => `\uCD9C\uB825 \uD30C\uC77C: "${p}" \u2014 \uB9DE\uB098\uC694?`,
    selectNaming: "\uB124\uC774\uBC0D \uADDC\uCE59\uC744 \uC120\uD0DD\uD558\uC138\uC694",
    namingLabels: {
      camelCase: "camelCase   \u2192 userProfile",
      PascalCase: "PascalCase  \u2192 UserProfile",
      snake_case: "snake_case  \u2192 user_profile",
      SCREAMING_SNAKE_CASE: "SCREAMING_SNAKE_CASE \u2192 USER_PROFILE",
      original: "original    \u2192 user-profile"
    },
    initSuccess: (p) => `${p} \uC0DD\uC131 \uC644\uB8CC`,
    alreadyExists: "asset-gen.config.json \uD30C\uC77C\uC774 \uC774\uBBF8 \uC874\uC7AC\uD569\uB2C8\uB2E4. --force \uC635\uC158\uC73C\uB85C \uB36E\uC5B4\uC4F8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    scanning: (p) => `\uC2A4\uCE94 \uC911: ${p}`,
    generated: (p) => `\uC0DD\uC131 \uC644\uB8CC: ${p}`,
    assetAdded: (f) => `${f} \uCD94\uAC00\uB428`,
    assetRemoved: (f) => `${f} \uC0AD\uC81C\uB428`,
    regenerated: (p) => `${p} \uC7AC\uC0DD\uC131 \uC644\uB8CC
`,
    duplicateKey: (key, a, b) => `
\uC911\uBCF5 \uC5D0\uC14B \uD0A4 \uAC10\uC9C0: ${key}
   - ${a}
   - ${b}
`,
    generatedDeclarations: (p) => `\uD0C0\uC785 \uC120\uC5B8 \uD30C\uC77C \uC0DD\uC131 \uC644\uB8CC: ${p}`,
    configNotFound: 'asset-gen.config.json \uD30C\uC77C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. "asset-gen init"\uC744 \uBA3C\uC800 \uC2E4\uD589\uD558\uC138\uC694.',
    configInvalid: "asset-gen.config.json \uD30C\uC77C\uC774 \uC62C\uBC14\uB978 JSON \uD615\uC2DD\uC774 \uC544\uB2D9\uB2C8\uB2E4."
  },
  zh: {
    selectLanguage: "\u8BF7\u9009\u62E9\u8BED\u8A00",
    inputDir: "\u8BF7\u8F93\u5165\u8D44\u6E90\u6587\u4EF6\u5939\u8DEF\u5F84",
    confirmInput: (p) => `\u8D44\u6E90\u6587\u4EF6\u5939: "${p}" \u2014 \u786E\u8BA4\u6B63\u786E?`,
    outputFile: "\u8BF7\u8F93\u5165\u8F93\u51FA\u6587\u4EF6\u8DEF\u5F84",
    confirmOutput: (p) => `\u8F93\u51FA\u6587\u4EF6: "${p}" \u2014 \u786E\u8BA4\u6B63\u786E?`,
    selectNaming: "\u8BF7\u9009\u62E9\u547D\u540D\u89C4\u5219",
    namingLabels: {
      camelCase: "camelCase   \u2192 userProfile",
      PascalCase: "PascalCase  \u2192 UserProfile",
      snake_case: "snake_case  \u2192 user_profile",
      SCREAMING_SNAKE_CASE: "SCREAMING_SNAKE_CASE \u2192 USER_PROFILE",
      original: "original    \u2192 user-profile"
    },
    initSuccess: (p) => `\u5DF2\u521B\u5EFA ${p}`,
    alreadyExists: "asset-gen.config.json \u5DF2\u5B58\u5728\u3002\u4F7F\u7528 --force \u8986\u76D6\u3002",
    scanning: (p) => `\u626B\u63CF\u4E2D: ${p}`,
    generated: (p) => `\u5DF2\u751F\u6210: ${p}`,
    assetAdded: (f) => `${f} \u5DF2\u6DFB\u52A0`,
    assetRemoved: (f) => `${f} \u5DF2\u5220\u9664`,
    regenerated: (p) => `${p} \u5DF2\u91CD\u65B0\u751F\u6210
`,
    duplicateKey: (key, a, b) => `
\u68C0\u6D4B\u5230\u91CD\u590D\u7684\u8D44\u6E90\u952E: ${key}
   - ${a}
   - ${b}
`,
    generatedDeclarations: (p) => `\u5DF2\u751F\u6210\u7C7B\u578B\u58F0\u660E\u6587\u4EF6: ${p}`,
    configNotFound: '\u627E\u4E0D\u5230 asset-gen.config.json\u3002\u8BF7\u5148\u8FD0\u884C "asset-gen init"\u3002',
    configInvalid: "asset-gen.config.json \u4E0D\u662F\u6709\u6548\u7684 JSON \u6587\u4EF6\u3002"
  }
};
function getMessages(lang) {
  return messages[lang];
}

// src/utils/config.ts
var CONFIG_FILENAME = "asset-gen.config.json";
var DEFAULT_CONFIG = {
  language: "en",
  input: "./src/assets",
  output: "./src/assets/index.ts",
  extensions: ["png", "jpg", "jpeg", "webp", "svg"],
  naming: "camelCase"
};
function getDefaultConfig() {
  return { ...DEFAULT_CONFIG };
}
function getConfigPath() {
  return path.resolve(process.cwd(), CONFIG_FILENAME);
}
function configExists() {
  return fs.existsSync(getConfigPath());
}
function loadConfig() {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) {
    const msg = getMessages("en");
    console.error(msg.configNotFound);
    process.exit(1);
  }
  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...config };
  } catch {
    const msg = getMessages("en");
    console.error(msg.configInvalid);
    process.exit(1);
  }
}
function saveConfig(config) {
  fs.writeFileSync(getConfigPath(), JSON.stringify(config, null, 2) + "\n", "utf-8");
}

// src/generators/asset-generator.ts
import fs2 from "fs";
import path4 from "path";
import prettier from "prettier";

// src/utils/file.ts
import glob from "fast-glob";
import path2 from "path";
async function scanAssets(inputDir, extensions) {
  const patterns = extensions.map((ext) => `**/*.${ext}`);
  const files = await glob(patterns, {
    cwd: path2.resolve(process.cwd(), inputDir),
    caseSensitiveMatch: false,
    onlyFiles: true
  });
  return files.sort();
}
function relativeImportPath(from, to, filename) {
  const outputDir = path2.dirname(path2.resolve(process.cwd(), from));
  const inputDir = path2.resolve(process.cwd(), to);
  const fullFilePath = path2.join(inputDir, filename);
  const rel = path2.relative(outputDir, fullFilePath).replace(/\\/g, "/");
  return rel.startsWith(".") ? rel : `./${rel}`;
}

// src/utils/naming.ts
import { camelCase, pascalCase, snakeCase, constantCase } from "change-case";
import path3 from "path";
function toVariableName(filename, convention) {
  const ext = path3.extname(filename);
  const base = filename.slice(0, filename.length - ext.length);
  switch (convention) {
    case "camelCase":
      return camelCase(base);
    case "PascalCase":
      return pascalCase(base);
    case "snake_case":
      return snakeCase(base);
    case "SCREAMING_SNAKE_CASE":
      return constantCase(base);
    case "original":
      return base;
  }
}
function checkDuplicates(filenames, convention, msg) {
  const keyMap = /* @__PURE__ */ new Map();
  for (const filename of filenames) {
    const key = toVariableName(filename, convention);
    if (keyMap.has(key)) {
      const conflict = keyMap.get(key);
      console.error(msg.duplicateKey(key, conflict, filename));
      process.exit(1);
    }
    keyMap.set(key, filename);
  }
}

// src/templates/asset.template.ts
function renderTemplate(entries) {
  if (entries.length === 0) {
    return `export const assets = {} as const;
`;
  }
  const imports = entries.map((e) => `import ${e.variableName} from '${e.importPath}';`).join("\n");
  const keys = entries.map((e) => `  ${e.variableName},`).join("\n");
  return `${imports}

export const assets = {
${keys}
} as const;
`;
}

// src/generators/asset-generator.ts
async function generateAssets(config) {
  const { input: input2, output, extensions, naming, language } = config;
  const msg = getMessages(language);
  const files = await scanAssets(input2, extensions);
  const basenames = files.map((f) => path4.basename(f));
  checkDuplicates(basenames, naming, msg);
  const entries = files.map((file) => ({
    variableName: toVariableName(path4.basename(file), naming),
    importPath: relativeImportPath(output, input2, file)
  }));
  const raw = renderTemplate(entries);
  const formatted = await prettier.format(raw, { parser: "typescript" });
  const outputPath = path4.resolve(process.cwd(), output);
  fs2.mkdirSync(path4.dirname(outputPath), { recursive: true });
  fs2.writeFileSync(outputPath, formatted, "utf-8");
}
async function generateDeclarations(config) {
  const { output, extensions } = config;
  const declarations = extensions.map(
    (ext) => `declare module '*.${ext}' {
  const src: string;
  export default src;
}`
  ).join("\n\n");
  const content = `// Generated by asset-gen \u2014 do not edit manually

${declarations}
`;
  const outputDir = path4.dirname(path4.resolve(process.cwd(), output));
  const declPath = path4.join(outputDir, "asset-gen.d.ts");
  fs2.writeFileSync(declPath, content, "utf-8");
  return path4.relative(process.cwd(), declPath);
}

// src/commands/init.ts
async function runInit(options) {
  if (configExists() && !options.force) {
    const lang2 = await selectLanguage();
    const msg2 = getMessages(lang2);
    console.log(msg2.alreadyExists);
    return;
  }
  const lang = await selectLanguage();
  const msg = getMessages(lang);
  const defaults = getDefaultConfig();
  let inputDir = "";
  while (true) {
    inputDir = await input({ message: msg.inputDir, default: defaults.input });
    const ok = await confirm({ message: msg.confirmInput(inputDir), default: true });
    if (ok) break;
  }
  let outputFile = "";
  while (true) {
    outputFile = await input({ message: msg.outputFile, default: defaults.output });
    const ok = await confirm({ message: msg.confirmOutput(outputFile), default: true });
    if (ok) break;
  }
  const naming = await select({
    message: msg.selectNaming,
    choices: Object.keys(msg.namingLabels).map((key) => ({
      name: msg.namingLabels[key],
      value: key
    }))
  });
  const config = { ...defaults, language: lang, input: inputDir, output: outputFile, naming };
  saveConfig(config);
  console.log(`
${msg.initSuccess(getConfigPath())}`);
  console.log(msg.scanning(config.input));
  await generateAssets(config);
  console.log(msg.generated(config.output));
  const declPath = await generateDeclarations(config);
  console.log(msg.generatedDeclarations(declPath));
}
async function selectLanguage() {
  return select({
    message: "Select language / \uC5B8\uC5B4 \uC120\uD0DD / \u9009\u62E9\u8BED\u8A00",
    choices: [
      { name: "English", value: "en" },
      { name: "\uD55C\uAD6D\uC5B4", value: "ko" },
      { name: "\u4E2D\u6587", value: "zh" }
    ]
  });
}

// src/commands/generate.ts
async function runGenerate() {
  const config = loadConfig();
  const msg = getMessages(config.language);
  console.log(msg.scanning(config.input));
  await generateAssets(config);
  console.log(msg.generated(config.output));
  const declPath = await generateDeclarations(config);
  console.log(msg.generatedDeclarations(declPath));
}

// src/index.ts
var program = new Command();
program.name("asset-gen").description("Generate TypeScript asset index files from image directories").version("1.0.0");
program.command("init").description("Create asset-gen.config.json in the current directory").option("-f, --force", "Overwrite existing config file").action((opts) => {
  runInit({ force: opts.force });
});
program.command("generate").alias("gen").description("Scan assets and generate the index file").action(async () => {
  await runGenerate();
});
program.parse();
