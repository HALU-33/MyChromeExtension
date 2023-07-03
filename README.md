# MyChromeExtension - GoogleChrome 自作拡張機能

このREADMEは、JavaScriptとGoogle Chrome拡張機能の学習の一環として作成した拡張機能の技術メモ。備忘録として分かりやすく解説。

## 目次
- manifest.json
- background.js
- content.js
- popup.html
- popup.js

## manifest.json
manifest.jsonは、拡張機能のメタデータを定義するJSONファイル。

- `"manifest_version": 3`: マニフェストのバージョンを3に設定。
- `"name": "Twitter Auto Scroller"`: 拡張機能の名前を設定。
- `"version": "1.0"`: 拡張機能のバージョン番号を設定。
- `"description": "Automatically scrolls and refreshes Twitter timeline."`: 拡張機能の説明を設定。
- `"permissions": ["activeTab", "storage"]`: 必要な権限を設定。activeTabとstorageへのアクセスを許可。
- `"background": { "service_worker": "src/background/background.js" }`: サービスワーカーとして実行されるバックグラウンドスクリプトを設定。
- `"action": { "default_popup": "src/popup/popup.html", "default_title": "Twitterを自動スクロール" }`: アクションのポップアップとして表示されるHTMLファイルを設定。ポップアップのタイトルも設定。
- `"icons": { "48": "img/Icon_twitter.png" }`: 48x48ピクセルのアイコンを設定。拡張機能のツールバーアイコンとして表示。
- `"content_scripts": [ { "matches": [ ... ], "js": ["src/content/content.js"] } ]`: content_scriptsが実行されるURLパターンを設定。Twitterの特定のページで実行されるコンテンツスクリプトを設定。
- `"host_permissions": [ "https://twitter.com/*" ]`: twitter.comのホストに対する権限を設定。

## background.js
background.jsは、拡張機能のバックグラウンドスクリプト。

- `chrome.action.onClicked.addListener(function(tab) { ... })`: 拡張機能のアイコンがクリックされたときのリスナーを追加。
- `chrome.scripting.executeScript({ target: {tabId: tab.id}, files: ['src/content/content.js'] })`: content.jsを現在のタブで実行するように指示。

## content.js
content.jsは、拡張機能のコンテンツスクリプト。Twitterのページで自動スクロールと自動更新を行う。

- `var scrollSpeed, refreshInterval;`: スクロール速度と更新間隔を格納する変数を宣言。
- `var scrollEnabled, refreshEnabled;`: スクロールと更新のオン・オフ状態を格納する変数を宣言。
- `chrome.storage.sync.get([...], function(result) { ... })`: ストレージから設定値を取得。
- `setInterval(function() { ... }, 1000);`: 1秒ごとにページを指定したピクセルだけスクロール（スクロールが有効な場合）。
- `setInterval(function() { ... }, refreshInterval * 60 * 1000);`: 指定した間隔でページをリロード（リロードが有効な場合）。

## popup.html
popup.htmlは、拡張機能のポップアップページ。

- `<link rel="stylesheet" type="text/css" href="style.css">`: style.cssをリンク。
- `<label for="scrollEnabled">Enable scroll:</label>`: スクロール有効化のラベルを追加。
- `<input type="checkbox" id="scrollEnabled">`: スクロール有効化のチェックボックスを追加。
- `<label for="scrollSpeed">Scroll speed:</label>`: スクロール速度のラベルを追加。
- `<input type="number" id="scrollSpeed" disabled>`: スクロール速度を入力するフィールドを追加（デフォルトで無効化）。
- `<label for="refreshEnabled">Enable refresh:</label>`: リフレッシュ有効化のラベルを追加。
- `<input type="checkbox" id="refreshEnabled">`: リフレッシュ有効化のチェックボックスを追加。
- `<label for="refreshInterval">Refresh interval (minutes):</label>`: 更新間隔のラベルを追加。
- `<input type="number" id="refreshInterval" disabled>`: 更新間隔を入力するフィールドを追加（デフォルトで無効化）。
- `<button id="save">Save</button>`: 保存ボタンを追加。
- `<script src="popup.js"></script>`: popup.jsをリンク。

## popup.js
popup.jsは、拡張機能のポップアップページのスクリプト。

- `chrome.runtime.onInstalled.addListener(function() { ... })`: 拡張機能がインストールされたときに初期設定を保存。
- `document.getElementById('save').addEventListener('click', function() { ... })`: 保存ボタンにクリックイベントリスナーを追加し、設定をストレージに保存。
- `window.onload = function() { ... }`: ページロード時にストレージから設定を読み込み、フォームに適用。
