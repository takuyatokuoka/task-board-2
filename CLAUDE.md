# task-board-2 - プロジェクトガイド

## プロジェクト概要

task-board-2は、タスク管理アプリです。

## デプロイ先

https://takuyatokuoka.github.io/task-board-2/

`main`ブランチへのプッシュをトリガーに、GitHub Actions（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）が自動でビルド・デプロイする。

## 技術スタック

- フレームワーク: React 19
- ビルドツール: Vite 8（`@vitejs/plugin-react`）
- 言語: TypeScript
- Lint: oxlint
- パッケージ管理: npm

## 開発環境

- OS: Windows 11
- Shell: PowerShell / Bash
- エディタ: VS Code

## Git運用ルール

### 基本方針

**コードを変更するたびに、必ずGitHubにプッシュすること。**

### リポジトリ

- GitHub: https://github.com/takuyatokuoka/task-board-2.git
- デフォルトブランチ: `main`

### コミット手順

1. 変更内容を確認する
   ```
   git status
   git diff
   ```

2. 変更をステージングする（機密ファイルを除く）
   ```
   git add <変更ファイル>
   ```

3. 意味のあるコミットメッセージでコミットする
   ```
   git commit -m "変更内容の概要"
   ```

4. GitHubにプッシュする
   ```
   git push origin main
   ```

### コミットメッセージ規約

- 日本語または英語で記述
- 変更の「なぜ」を意識した簡潔な説明
- 例: `feat: タスク作成機能を追加`, `fix: タスク削除時のバリデーションエラーを修正`

### 注意事項

- `.env` や認証情報ファイルは絶対にコミットしない
- `git push --force` は原則禁止（明示的な指示がある場合のみ）
- コミットフックは迂回しない (`--no-verify` 禁止)

## コーディング規約

- コメントは原則不要。WHYが自明でない場合のみ記述する
- セキュリティ脆弱性（SQLインジェクション、XSS等）を導入しない
- 不要な抽象化・将来要件のための設計はしない

### コンポーネント命名規約

- コンポーネントファイル名・関数名はPascalCase（例: `TaskItem.tsx` → `function TaskItem`）
- 1ファイル1コンポーネント、`export default`でエクスポート
- スタイルはコンポーネントと同名のCSSファイルを同階層に置く（例: `App.tsx` + `App.css`）
- 型定義は`src/types.ts`にまとめ、コンポーネントファイルに直書きしない
- 複数コンポーネントに分割する場合は`src/components/`配下に配置する

## ディレクトリ構成

```
task-board-2/
├── CLAUDE.md              # このファイル
├── .github/workflows/     # GitHub Pagesデプロイ用ワークフロー
├── src/
│   ├── main.tsx           # エントリポイント
│   ├── App.tsx            # ルートコンポーネント
│   ├── App.css
│   ├── index.css           # グローバルスタイル
│   └── types.ts            # 型定義
├── index.html
└── vite.config.ts
```
