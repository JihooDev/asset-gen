# asset-gen

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

```
src/assets/
├── logo.png
├── user-profile.png
└── banner.webp
```

`asset-gen gen` 실행 시:

**`src/assets/index.ts`** (자동 생성)
```ts
import banner from './banner.webp';
import logo from './logo.png';
import userProfile from './user-profile.png';

export const assets = {
  banner,
  logo,
  userProfile,
} as const;
```

**`src/assets/asset-gen.d.ts`** (자동 생성 — TypeScript 오류 방지)
```ts
declare module '*.png' {
  const src: string;
  export default src;
}
// ...
```

## 설정 파일

`asset-gen.config.json`

| 필드 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `language` | `"en" \| "ko" \| "zh"` | `"en"` | CLI 출력 언어 |
| `input` | `string` | `"./src/assets"` | 스캔할 에셋 폴더 |
| `output` | `string` | `"./src/assets/index.ts"` | 생성할 파일 경로 |
| `extensions` | `string[]` | `["png","jpg","jpeg","webp","svg"]` | 추적할 확장자 |
| `naming` | `string` | `"camelCase"` | 변수 네이밍 규칙 |

### 네이밍 규칙

| 옵션 | 결과 예시 |
|------|----------|
| `camelCase` | `userProfile` |
| `PascalCase` | `UserProfile` |
| `snake_case` | `user_profile` |
| `SCREAMING_SNAKE_CASE` | `USER_PROFILE` |
| `original` | `user-profile` |

## 중복 키 감지

같은 변수명으로 변환되는 파일이 있으면 에러를 출력하고 중단합니다.

```
Duplicate asset key detected: userProfile
   - user-profile.png
   - user_profile.png
```

## 요구사항

- Node.js >= 18.0.0

## 라이선스

MIT
