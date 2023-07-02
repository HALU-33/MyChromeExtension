var scrollSpeed, refreshInterval; // スクロール速度と更新間隔を保存する変数を宣言

// ストレージからスクロール速度と更新間隔を取得
chrome.storage.sync.get(['scrollSpeed', 'refreshInterval'], function(result) {
    scrollSpeed = result.scrollSpeed;
    refreshInterval = result.refreshInterval;
});

// 1秒ごとにページを指定したピクセルだけスクロール、スクロール速度はユーザーが設定
setInterval(function() {
    window.scrollBy(0, scrollSpeed);
}, 1000);

// 指定した間隔（分）でページをリロード、更新間隔はユーザーが設定
setInterval(function() {
    location.reload();
}, refreshInterval * 60 * 1000);