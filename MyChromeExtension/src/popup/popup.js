// 保存ボタンのクリックイベントリスナーを追加
document.getElementById('save').addEventListener('click', function() {
    // スクロール速度と更新間隔の入力フィールドから値を取得
    var scrollSpeed = document.getElementById('scrollSpeed').value;
    var refreshInterval = document.getElementById('refreshInterval').value;

    // 取得した値をストレージに保存
    chrome.storage.sync.set({scrollSpeed: scrollSpeed, refreshInterval: refreshInterval}, function() {
      console.log('Settings saved'); // 設定が保存されたことを確認
    });
});
