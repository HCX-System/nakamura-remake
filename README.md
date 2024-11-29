## アプリケーション名
中村調理製菓専門学校 視聴画面

## 概要
中村調理製菓専門学校様の配信動画の視聴と資料をダウンロードすることができます。

## 機能
・ユーザーログイン機能: ユーザーIDとパスワードによりログイン認証を行います。
・ユーザ別の動画再生機能：各ユーザーに対してコースやクラス、選択した科目を設定し、それに基づいた中村調理製菓専門学校の配信動画を視聴できます。
・資料ダウンロード機能: ご提供いただいた資料をダウンロードできます。

## 使用技術一覧

### バックエンドのフレームワーク
・laravel

### フロントエンドのフレームワーク
・Vue.js 2.5.17
・Vuex
・vue-router
・Axios

### ビデオプレーヤー
・video.js

## サーバー環境
・Ubuntu 18.04.6 LTS
・Apache/2.4.29
・mysqlVer 14.14
・PHP 7.2.24

## ファイル構成
・app
・bootstrap
・config
・database
・public
・resources
・routes
・storage
・.env
・.package.json

### nakamura-remakeフォルダを丸ごとコピー

### .envファイルの設定　以下を変更
APP_NAME=アプリケーションの名前
APP_ENV=local
APP_KEY=アプリケーションキー（後で生成）
APP_DEBUG=true（本番運用後falseに変更）
APP_URL=サイトのURL
DB_CONNECTION=mysql
DB_HOST=DBサーバアドレス
DB_PORT=3306
DB_DATABASE=DB名
DB_USERNAME=DBユーザ名
DB_PASSWORD=DBパスワード

MIX_S3_URL=https://s3-ap-northeast-1.amazonaws.com/svpcloud2/contents

### パッケージをダウンロード
npm install 

### プロジェクトのソースコードをビルド
npm run build

## トラブルシューティング
https://drive.google.com/drive/folders/1SB3WxVp4cbEzkHvdm0eecjT7OChoS4YW?usp=drive_link
