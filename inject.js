'use strict';
fetch(chrome.extension.getURL('page_transform.js')).then(response => {
  return response.text();
}).then(content => {
  chrome.storage.local.get(['url'], data => {
    const script = createScript(data, content);
    document.body.appendChild(script);
  });
}).catch(alert);

/**
 * @param data {Object}
 * @param content {String}
 * @return {Element}
 */
function createScript(data, content) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.id = '__inject_plugin__';
  script.innerHTML = `;
    (function(_url_) {
      ${ content }  
    }('${ data.url }'))
  ;`;

  return script;
}
