document.addEventListener('DOMContentLoaded', () => {
  if (!chrome.extension) {
    throw 'Please install this extension';
  }
  const urlInput = document.querySelector('#urlInput');
  const mainForm = document.querySelector('#mainForm');
  mainForm.onsubmit = onSubmitForm;

  chrome.storage.local.get(['url'], obj => {
    urlInput.value = String(obj.url || 'http://denis.baskovsky.ru');
  });

  /**
   * @return {void}
   */
  function onSubmitForm(e) {
    e.stopImmediatePropagation();
    window.close();

    chrome.storage.local.set({'url': urlInput.value}, () => {
      chrome.tabs.getSelected(null, tab => {
        const code = `window.location.reload(true);`;// force reload page
        chrome.tabs.executeScript(tab.id, {code});
      });
    });
  }

}, false);