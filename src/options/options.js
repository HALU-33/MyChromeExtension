// 保存ボタンにクリックイベントリスナーを追加
document.getElementById('save').addEventListener('click', function() {
    // 数値入力フィールドから値を取得
    var scrollSpeed = document.getElementById('scrollSpeed').value;
    var refreshInterval = document.getElementById('refreshInterval').value;

    // 取得した値をストレージに保存
    chrome.storage.sync.set({
        scrollSpeed: scrollSpeed,
        refreshInterval: refreshInterval
    }, function() {
        console.log('Settings saved');
    });
});

// ページロード時にストレージから設定を読み込む
window.onload = function() {
    chrome.storage.sync.get(['scrollSpeed', 'refreshInterval'], function(result) {
        // ストレージから取得した設定値をフォームに適用
        document.getElementById('scrollSpeed').value = result.scrollSpeed || '';
        document.getElementById('refreshInterval').value = result.refreshInterval || '';
    });
};