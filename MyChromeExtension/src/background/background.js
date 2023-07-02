// アクションアイコンがクリックされたときのリスナーを追加
chrome.action.onClicked.addListener(function(tab) {
    // content.jsを現在のタブで実行するように指示
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['src/content/content.js']
    });
});