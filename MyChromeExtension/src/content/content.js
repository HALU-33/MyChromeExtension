var scrollSpeed, refreshInterval; // スクロール速度と更新間隔を格納する変数を宣言

// ストレージからスクロール速度と更新間隔を取得
chrome.storage.sync.get(['scrollSpeed', 'refreshInterval'], function(result) {
    scrollSpeed = result.scrollSpeed;
    refreshInterval = result.refreshInterval;
});

// 1秒ごとにページを指定したピクセルだけスクロールするように設定
setInterval(function() {
    window.scrollBy(0, scrollSpeed);
}, 1000);

// 指定した間隔でページをリロードするように設定
setInterval(function() {
    location.reload();
}, refreshInterval * 60 * 1000);