var scrollSpeed, refreshInterval; // スクロール速度と更新間隔を格納する変数
var scrollEnabled, refreshEnabled; // スクロールと更新のオン・オフ状態を格納する変数

// ストレージから設定値を取得
chrome.storage.sync.get(['scrollSpeed', 'refreshInterval', 'scrollEnabled', 'refreshEnabled'], function(result) {
    scrollSpeed = result.scrollSpeed;
    refreshInterval = result.refreshInterval;
    scrollEnabled = result.scrollEnabled;
    refreshEnabled = result.refreshEnabled;

    // スクロールが有効な場合、アニメーションを開始
    if (scrollEnabled) {
        requestAnimationFrame(scrollSmoothly);
    }
});

// 滑らかにスクロールするための関数
function scrollSmoothly(timestamp) {
    if (scrollEnabled) {
        // 指定した速度でスクロール
        window.scrollBy(0, scrollSpeed / 60);
        requestAnimationFrame(scrollSmoothly);
    }
}

// 指定した間隔でページをリロードするように設定（リロードが有効な場合のみ）
setInterval(function() {
    if (refreshEnabled) {
        location.reload();
    }
}, refreshInterval * 60 * 1000);