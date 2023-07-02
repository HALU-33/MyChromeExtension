// ブラウザのアクション（ここでは拡張機能のアイコンがクリックされたときのアクション）のリスナーを追加
chrome.browserAction.onClicked.addListener(function(tab) {
    // コンテンツスクリプトを現在のタブで実行
    chrome.tabs.executeScript(tab.id, {file: "src/content/content.js"});
});
