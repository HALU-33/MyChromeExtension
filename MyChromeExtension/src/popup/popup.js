document.addEventListener('DOMContentLoaded', function() {
  // ページロード時にストレージから設定を読み込む
  chrome.storage.sync.get(['scrollEnabled', 'refreshEnabled', 'scrollSpeed', 'refreshInterval'], function(result) {
      document.getElementById('toggleScroll').checked = result.scrollEnabled;
      document.getElementById('toggleRefresh').checked = result.refreshEnabled;

      // デフォルトのスクロールスピードと更新間隔を設定
      if (result.scrollSpeed === undefined) {
          chrome.storage.sync.set({scrollSpeed: 50}); // デフォルトのスクロールスピードを50に設定
      }
      if (result.refreshInterval === undefined) {
          chrome.storage.sync.set({refreshInterval: 1}); // デフォルトの更新間隔を1分に設定
      }
  });

  // 設定ボタンにイベントリスナーを追加
  document.getElementById('applySettings').addEventListener('click', function() {
    var scrollEnabled = document.getElementById('toggleScroll').checked;
    var refreshEnabled = document.getElementById('toggleRefresh').checked;
    chrome.storage.sync.set({scrollEnabled: scrollEnabled, refreshEnabled: refreshEnabled}, function() {
        // 設定が保存されたら、ページを更新
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });
  });
});