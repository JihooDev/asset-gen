# asset-gen

[![npm version](https://img.shields.io/npm/v/asset-gen-cli.svg)](https://www.npmjs.com/package/asset-gen-cli)
[![license](https://img.shields.io/npm/l/asset-gen-cli.svg)](https://www.npmjs.com/package/asset-gen-cli)

<details open>
<summary>English</summary>

Generate TypeScript asset index files from image directories for frontend projects.

## Installation

```bash
npm install -g asset-gen-cli
```

## Quick Start

```bash
# 1. Create a config file interactively
asset-gen init

# 2. Generate asset files
asset-gen gen
```

## Commands

### `asset-gen init`

Creates `asset-gen.config.json` interactively and generates asset files immediately.

- Select language (English / 한국어 / 中文)
- Enter and confirm the asset directory path
- Enter and confirm the output file path
- Select a naming convention

```bash
asset-gen init           # Interactive setup
asset-gen init --force   # Overwrite an existing config file
```

### `asset-gen gen` / `asset-gen generate`

Reads the config file and generates an asset index file and TypeScript declaration file.

```bash
asset-gen gen
```

## Generated Output

Given these files in `src/assets/`:

```txt
src/assets/
├── logo.png
├── user-profile.png
└── banner.webp
```

Running `asset-gen gen` creates:

**`src/assets/index.ts`** (generated)

```ts
import banner from "./banner.webp";
import logo from "./logo.png";
import userProfile from "./user-profile.png";

export const assets = {
  banner,
  logo,
  userProfile,
} as const;
```

**`src/assets/asset-gen.d.ts`** (generated to prevent TypeScript import errors)

```ts
declare module "*.png" {
  const src: string;
  export default src;
}
// ...
```

## Config File

`asset-gen.config.json`

| Field        | Type                   | Default                             | Description                |
| ------------ | ---------------------- | ----------------------------------- | -------------------------- |
| `language`   | `"en" \| "ko" \| "zh"` | `"en"`                              | CLI output language        |
| `input`      | `string`               | `"./src/assets"`                    | Asset directory to scan    |
| `output`     | `string`               | `"./src/assets/index.ts"`           | File path to generate      |
| `extensions` | `string[]`             | `["png","jpg","jpeg","webp","svg"]` | File extensions to track   |
| `naming`     | `string`               | `"camelCase"`                       | Variable naming convention |

### Naming Conventions

| Option                 | Example        |
| ---------------------- | -------------- |
| `camelCase`            | `userProfile`  |
| `PascalCase`           | `UserProfile`  |
| `snake_case`           | `user_profile` |
| `SCREAMING_SNAKE_CASE` | `USER_PROFILE` |
| `original`             | `user-profile` |

## Duplicate Key Detection

If multiple files resolve to the same variable name, the command exits with an error.

```txt
Duplicate asset key detected: userProfile
   - user-profile.png
   - user_profile.png
```

## Requirements

- Node.js >= 18.0.0

## License

MIT

</details>

<details>
<summary>한국어</summary>

TypeScript 프론트엔드 프로젝트에서 이미지 파일을 스캔하여 import 문과 타입 안전한 상수 객체를 자동 생성하는 CLI 도구입니다.

## 설치

```bash
npm install -g asset-gen-cli
```

## 빠른 시작

```bash
# 1. 설정 파일 생성 (대화형)
asset-gen init

# 2. 에셋 파일 생성
asset-gen gen
```

## 명령어

### `asset-gen init`

대화형으로 설정 파일(`asset-gen.config.json`)을 생성하고 에셋 파일을 즉시 생성합니다.

- 언어 선택 (English / 한국어 / 中文)
- 에셋 폴더 경로 입력 및 확인
- 출력 파일 경로 입력 및 확인
- 네이밍 규칙 선택

```bash
asset-gen init           # 대화형 설정
asset-gen init --force   # 기존 설정 파일 덮어쓰기
```

### `asset-gen gen` / `asset-gen generate`

설정 파일을 읽어 에셋 인덱스 파일과 TypeScript 타입 선언 파일을 생성합니다.

```bash
asset-gen gen
```

## 생성 결과

`src/assets/` 폴더에 아래 파일들이 있을 때:

```txt
src/assets/
├── logo.png
├── user-profile.png
└── banner.webp
```

`asset-gen gen` 실행 시:

**`src/assets/index.ts`** (자동 생성)

```ts
import banner from "./banner.webp";
import logo from "./logo.png";
import userProfile from "./user-profile.png";

export const assets = {
  banner,
  logo,
  userProfile,
} as const;
```

**`src/assets/asset-gen.d.ts`** (자동 생성 — TypeScript 오류 방지)

```ts
declare module "*.png" {
  const src: string;
  export default src;
}
// ...
```

## 설정 파일

`asset-gen.config.json`

| 필드         | 타입                   | 기본값                              | 설명             |
| ------------ | ---------------------- | ----------------------------------- | ---------------- |
| `language`   | `"en" \| "ko" \| "zh"` | `"en"`                              | CLI 출력 언어    |
| `input`      | `string`               | `"./src/assets"`                    | 스캔할 에셋 폴더 |
| `output`     | `string`               | `"./src/assets/index.ts"`           | 생성할 파일 경로 |
| `extensions` | `string[]`             | `["png","jpg","jpeg","webp","svg"]` | 추적할 확장자    |
| `naming`     | `string`               | `"camelCase"`                       | 변수 네이밍 규칙 |

### 네이밍 규칙

| 옵션                   | 결과 예시      |
| ---------------------- | -------------- |
| `camelCase`            | `userProfile`  |
| `PascalCase`           | `UserProfile`  |
| `snake_case`           | `user_profile` |
| `SCREAMING_SNAKE_CASE` | `USER_PROFILE` |
| `original`             | `user-profile` |

## 중복 키 감지

같은 변수명으로 변환되는 파일이 있으면 에러를 출력하고 중단합니다.

```txt
Duplicate asset key detected: userProfile
   - user-profile.png
   - user_profile.png
```

## 요구사항

- Node.js >= 18.0.0

## 라이선스

MIT

</details>
