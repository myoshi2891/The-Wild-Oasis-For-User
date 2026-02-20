# Spec: 006 - クライアントサイド i18n (日英翻訳)

> ステータス: **完了**（2026-02-20）

## 背景 / 目的

- ポートフォリオとして日本語話者にも利用可能なUIを提供する
- 英語をデフォルトとし、日本語への切替をサポート

## ユーザーストーリー

- ユーザーとして、UIを日本語に切り替えて利用したい
- ユーザーとして、言語設定がブラウザを閉じても保持されてほしい

## 要件

- 英語(en)・日本語(ja)の2言語対応
- ブラウザ `localStorage` による言語設定の永続化
- 言語切替ボタンをナビゲーションに配置
- 翻訳カバレッジ: ナビゲーション、ホーム、アバウト、キャビン一覧/詳細、予約フォーム、予約カード、確認画面

## 非要件

- サーバーサイド翻訳（Server Component 内の翻訳）
- URL ベースのロケール（`/ja/cabins` 等）
- 3言語以上の対応
- 翻訳管理ツール（i18n SaaS）との連携

## 制約

- i18n はクライアント Context (`LanguageContext`) 依存
- 翻訳対象コンポーネントは `"use client"` ディレクティブが必須
- Server Component（`reservations/page.tsx` 等）は翻訳スコープ外

## 設計

### アーキテクチャ

```
translations.ts (辞書)
    ↓
LanguageContext.tsx (Provider + useLanguage hook)
    ↓
各 Client Component (useLanguage() で翻訳取得)
```

### 翻訳辞書構造

```typescript
// app/_lib/translations.ts
export const translations = {
  en: { nav: {...}, home: {...}, ... },
  ja: { nav: {...}, home: {...}, ... },
} as const;
```

### 太字マーカーパターン

翻訳文中の `**text**` を `split('**')` + 奇数インデックス判定で太字にレンダリング。
言語に依存しない汎用的な太字処理を実現。

## 受入基準

- [x] ナビゲーションに言語切替ボタンが表示される
- [x] 切替で全対象コンポーネントの表示言語が即座に変わる
- [x] ブラウザリロード後も言語設定が維持される
- [x] `document.documentElement.lang` が言語に応じて更新される
- [x] SSR 時の Hydration ミスマッチが発生しない
- [x] 既存のコンポーネントテストが全て通過する
- [x] ビルドが正常に完了する

## リスク

- `"use client"` の増加による First Load JS サイズ増大 → 許容範囲内（+2KB程度）
- 将来のサーバーサイド i18n 移行時に大規模リファクタリングが必要 → TODO コメントで明示済み
