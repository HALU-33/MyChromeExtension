// スクロールのトグルボタンにイベントリスナーを追加
document.getElementById('toggleScroll').addEventListener('change', function() {
  // トグルボタンの状態を取得
  var scrollEnabled = document.getElementById('toggleScroll').checked;
  // ストレージにトグルボタンの状態を保存
  chrome.storage.sync.set({scrollEnabled: scrollEnabled});
});

// リフレッシュのトグルボタンにイベントリスナーを追加
document.getElementById('toggleRefresh').addEventListener('change', function() {
  // トグルボタンの状態を取得
  var refreshEnabled = document.getElementById('toggleRefresh').checked;
  // ストレージにトグルボタンの状態を保存
  chrome.storage.sync.set({refreshEnabled: refreshEnabled});
});

// ページロード時にストレージから設定を読み込む
window.onload = function() {
  chrome.storage.sync.get(['scrollEnabled', 'refreshEnabled'], function(result) {
      // ストレージから取得した設定値をトグルボタンに適用
      document.getElementById('toggleScroll').checked = result.scrollEnabled;
      document.getElementById('toggleRefresh').checked = result.refreshEnabled;
  });
};