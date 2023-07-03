var scrollSpeed, refreshInterval; // スクロール速度と更新間隔を格納する変数を宣言
var scrollEnabled, refreshEnabled; // スクロールと更新のオン・オフ状態を格納する変数を宣言

// ストレージから設定値を取得
chrome.storage.sync.get(['scrollSpeed', 'refreshInterval', 'scrollEnabled', 'refreshEnabled'], function(result) {
    scrollSpeed = result.scrollSpeed;
    refreshInterval = result.refreshInterval;
    scrollEnabled = result.scrollEnabled;
    refreshEnabled = result.refreshEnabled;
});

// 1秒ごとにページを指定したピクセルだけスクロールするように設定（スクロールが有効な場合のみ）
setInterval(function() {
    if (scrollEnabled) {
        window.scrollBy(0, scrollSpeed);
    }
}, 1000);

// 指定した間隔でページをリロードするように設定（リロードが有効な場合のみ）
setInterval(function() {
    if (refreshEnabled) {
        location.reload();
    }
}, refreshInterval * 60 * 1000);