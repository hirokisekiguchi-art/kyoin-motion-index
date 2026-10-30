# MOTION INDEX — 教員サーチ UIモーション図鑑

3つの UI/UX プロトタイプのソースコードを比較してまとめた、29項目のインタラクティブなモーション図鑑です。

## サイト構成

- `dist/index.html` — ページ構造
- `dist/styles.css` — スタイル・再現アニメーション
- `dist/app.js` — 図鑑データ・検索・フィルター・動作デモ

HTML、CSS、JavaScript のみを使用しているため、パッケージのインストールやビルドは不要です。

## Cloudflare Pages の設定

1. GitHub にこのリポジトリをプッシュし、Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git から連携。
2. GitHub でこのリポジトリを選択し、production branch を `main` に設定。
3. 以下のビルド設定を入力して Save and Deploy。

| 項目 | 設定 |
| --- | --- |
| Framework preset | `None` |
| Build command | 空欄 |
| Build output directory | `dist` |
| Root directory | `/` （初期値） |

新しいコミットを `main` にプッシュすると、自動的に再公開されます。

## アクセス解析

Cloudflare Pages のプロジェクトで **Metrics → Web Analytics → Enable** を有効にすると、Cloudflare Web Analytics でアクセス数を確認できます。Google Analytics 4 を利用する場合は、別途取得した測定IDに応じて公式のタグを `dist/index.html` に追加します。

## 注意事項

- デモは元のコードから動きの仕組みを抽出して再現したもので、オリジナル画面の録画ではありません。
- 一般的に用いられる名称を優先し、公式名が定着していないものは挙動を説明する名称を付けています。
- アニメーションを減らすOS設定と、サイト内の一時停止機能に対応しています。
