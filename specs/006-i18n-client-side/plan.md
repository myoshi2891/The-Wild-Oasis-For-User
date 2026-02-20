# Plan: 006 - クライアントサイド i18n

> ステータス: **完了**（2026-02-20）

## 実装計画

### Phase 1: 基盤構築

1. `app/_lib/translations.ts` — 翻訳辞書の作成（en/ja）
2. `app/_components/LanguageContext.tsx` — `LanguageProvider` + `useLanguage` hook
3. `app/_components/LanguageToggle.tsx` — 言語切替ボタン
4. `app/layout.tsx` — `LanguageProvider` をルートに配置

### Phase 2: コンポーネント翻訳

翻訳対象コンポーネント（`"use client"` + `useLanguage()` 追加）:

| コンポーネント | 翻訳キー |
|---------------|---------|
| HeroClient | `home.title`, `home.cta` |
| AboutContent | `about.*` |
| CabinsHeader | `cabins.title`, `cabins.description` |
| Cabin | `cabinDetails.*` |
| CabinCard | `cabinCard.*` |
| DateSelector | `dateSelector.*` |
| LoginMessage | `loginPrompt.*` |
| ReservationForm | `reservationForm.*` |
| ReservationCard | `reservationCard.*` |
| DeleteReservation | `reservationCard.delete*` |
| NavigationMenu | `nav.*` |
| DisclaimerBanner | `warning.*` |
| thankyou/page | `thankYou.*` |

### Phase 3: レビュー対応

1. テスト基盤: `renderWithProviders()` ユーティリティ作成
2. CSS: スタッガーアニメーション `@layer` 移動、スピナー `prefers-reduced-motion` 例外
3. a11y: DOM 順序修正（`flex-col-reverse`）、`motion-safe:` プレフィックス、ローカライズ `aria-label`
4. コード品質: `toggleLanguage` 純粋化、`SUPPORTED_LANGUAGES` 導出、no-op try/catch 除去

## 変更ファイル一覧

### 新規

- `app/_lib/translations.ts`
- `app/_components/LanguageContext.tsx`
- `app/_components/LanguageToggle.tsx`
- `app/_components/DisclaimerBanner.tsx`
- `app/_components/HeroClient.tsx`
- `app/_components/AboutContent.tsx`
- `app/_components/CabinsHeader.tsx`
- `tests/helpers/render-with-providers.tsx`

### 変更

- `app/layout.tsx` — LanguageProvider 追加
- `app/_components/Cabin.tsx` — `"use client"` + 翻訳
- `app/_components/CabinCard.tsx` — `"use client"` + 翻訳
- `app/_components/ReservationCard.tsx` — 翻訳
- `app/_components/DeleteReservation.tsx` — 翻訳
- `app/_components/ReservationForm.tsx` — 翻訳
- `app/_components/NavigationMenu.tsx` — 翻訳 + gap 修正
- `app/_styles/globals.css` — `@layer`, `prefers-reduced-motion` 修正
- テストファイル 6個 — `renderWithProviders` 移行
