// 保存ボタンにクリックイベントリスナーを追加
document.getElementById('save').addEventListener('click', function() {
  // チェックボックスと数値入力フィールドから値を取得
  var scrollEnabled = document.getElementById('scrollEnabled').checked;
  var refreshEnabled = document.getElementById('refreshEnabled').checked;
  var scrollSpeed = document.getElementById('scrollSpeed').value;
  var refreshInterval = document.getElementById('refreshInterval').value;

  // 取得した値をストレージに保存
  chrome.storage.sync.set({
    scrollEnabled: scrollEnabled,
    refreshEnabled: refreshEnabled,
    scrollSpeed: scrollSpeed,
    refreshInterval: refreshInterval
  }, function() {
    console.log('Settings saved'); // 設定が保存されたことをコンソールに出力
  });
});

// ページロード時にストレージから設定を読み込む
window.onload = function() {
  chrome.storage.sync.get(['scrollEnabled', 'refreshEnabled', 'scrollSpeed', 'refreshInterval'], function(result) {
    // ストレージから取得した設定値をフォームに適用
    document.getElementById('scrollEnabled').checked = result.scrollEnabled;
    document.getElementById('refreshEnabled').checked = result.refreshEnabled;
    document.getElementById('scrollSpeed').value = result.scrollSpeed;
    document.getElementById('refreshInterval').value = result.refreshInterval;

    // チェックボックスの状態に応じて数値入力フィールドの有効・無効を設定
    document.getElementById('scrollSpeed').disabled = !result.scrollEnabled;
    document.getElementById('refreshInterval').disabled = !result.refreshEnabled;
  });
};