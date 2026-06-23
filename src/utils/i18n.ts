export type Language = 'en' | 'ko' | 'zh';

export const messages = {
  en: {
    selectLanguage: 'Select language',
    inputDir: 'Enter the assets folder path',
    confirmInput: (p: string) => `Assets folder: "${p}" — is this correct?`,
    outputFile: 'Enter the output file path',
    confirmOutput: (p: string) => `Output file: "${p}" — is this correct?`,
    selectNaming: 'Select naming convention',
    namingLabels: {
      camelCase: 'camelCase   → userProfile',
      PascalCase: 'PascalCase  → UserProfile',
      snake_case: 'snake_case  → user_profile',
      SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE → USER_PROFILE',
      original: 'original    → user-profile',
    },
    initSuccess: (p: string) => `Created ${p}`,
    alreadyExists: 'asset-gen.config.json already exists. Use --force to overwrite.',
    scanning: (p: string) => `Scanning: ${p}`,
    generated: (p: string) => `Generated: ${p}`,
    assetAdded: (f: string) => `${f} added`,
    assetRemoved: (f: string) => `${f} removed`,
    regenerated: (p: string) => `${p} regenerated\n`,
    duplicateKey: (key: string, a: string, b: string) =>
      `\nDuplicate asset key detected: ${key}\n   - ${a}\n   - ${b}\n`,
    generatedDeclarations: (p: string) => `Generated type declarations: ${p}`,
    configNotFound: 'asset-gen.config.json not found. Run "asset-gen init" first.',
    configInvalid: 'asset-gen.config.json is not valid JSON.',
  },
  ko: {
    selectLanguage: '언어를 선택하세요',
    inputDir: '에셋 폴더 경로를 입력하세요',
    confirmInput: (p: string) => `에셋 폴더: "${p}" — 맞나요?`,
    outputFile: '출력 파일 경로를 입력하세요',
    confirmOutput: (p: string) => `출력 파일: "${p}" — 맞나요?`,
    selectNaming: '네이밍 규칙을 선택하세요',
    namingLabels: {
      camelCase: 'camelCase   → userProfile',
      PascalCase: 'PascalCase  → UserProfile',
      snake_case: 'snake_case  → user_profile',
      SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE → USER_PROFILE',
      original: 'original    → user-profile',
    },
    initSuccess: (p: string) => `${p} 생성 완료`,
    alreadyExists:
      'asset-gen.config.json 파일이 이미 존재합니다. --force 옵션으로 덮어쓸 수 있습니다.',
    scanning: (p: string) => `스캔 중: ${p}`,
    generated: (p: string) => `생성 완료: ${p}`,
    assetAdded: (f: string) => `${f} 추가됨`,
    assetRemoved: (f: string) => `${f} 삭제됨`,
    regenerated: (p: string) => `${p} 재생성 완료\n`,
    duplicateKey: (key: string, a: string, b: string) =>
      `\n중복 에셋 키 감지: ${key}\n   - ${a}\n   - ${b}\n`,
    generatedDeclarations: (p: string) => `타입 선언 파일 생성 완료: ${p}`,
    configNotFound:
      'asset-gen.config.json 파일을 찾을 수 없습니다. "asset-gen init"을 먼저 실행하세요.',
    configInvalid: 'asset-gen.config.json 파일이 올바른 JSON 형식이 아닙니다.',
  },
  zh: {
    selectLanguage: '请选择语言',
    inputDir: '请输入资源文件夹路径',
    confirmInput: (p: string) => `资源文件夹: "${p}" — 确认正确?`,
    outputFile: '请输入输出文件路径',
    confirmOutput: (p: string) => `输出文件: "${p}" — 确认正确?`,
    selectNaming: '请选择命名规则',
    namingLabels: {
      camelCase: 'camelCase   → userProfile',
      PascalCase: 'PascalCase  → UserProfile',
      snake_case: 'snake_case  → user_profile',
      SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE → USER_PROFILE',
      original: 'original    → user-profile',
    },
    initSuccess: (p: string) => `已创建 ${p}`,
    alreadyExists: 'asset-gen.config.json 已存在。使用 --force 覆盖。',
    scanning: (p: string) => `扫描中: ${p}`,
    generated: (p: string) => `已生成: ${p}`,
    assetAdded: (f: string) => `${f} 已添加`,
    assetRemoved: (f: string) => `${f} 已删除`,
    regenerated: (p: string) => `${p} 已重新生成\n`,
    duplicateKey: (key: string, a: string, b: string) =>
      `\n检测到重复的资源键: ${key}\n   - ${a}\n   - ${b}\n`,
    generatedDeclarations: (p: string) => `已生成类型声明文件: ${p}`,
    configNotFound: '找不到 asset-gen.config.json。请先运行 "asset-gen init"。',
    configInvalid: 'asset-gen.config.json 不是有效的 JSON 文件。',
  },
};

export type Messages = typeof messages.en;

export function getMessages(lang: Language): Messages {
  return messages[lang];
}
