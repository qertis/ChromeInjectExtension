'use strict';
window.addEventListener('load', () => {
  const linksArray = document.querySelectorAll('#searchform a[href^="https://accounts.google.com/"][role="button"]');
  if (!linksArray.length) {
    throw 'Google web site changed :(';
  }
  const parent = linksArray[0].parentNode;
  const container = createInjectContainer();
  container.appendChild(createStyles());
  container.appendChild(createButton());
  parent.appendChild(container);

  /**
   * @return {Element}
   */
  function createInjectContainer() {
    const container = document.createElement('div');
    container.id = '__myInjectContainer';

    return container;
  }

  /**
   * @return {Element}
   */
  function createButton() {
    const anchor = document.createElement('a');
    anchor.id = 'myUrlBtn';
    anchor.rel = 'author';
    anchor.href = String(_url_);// _url_ was generated in inject.js
    anchor.textContent = 'My Button';
    anchor.title = 'Press me!';

    return anchor;
  }

  /**
   * @return {Element}
   */
  function createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #__myInjectContainer {
        display: flex;
        margin: 0 16px;  
      }
      
      #myUrlBtn {
        background: transparent;
        padding: 0 16px;
        line-height: 27px;
        border: 1px solid hsl(0, 0%, 95%);
        border-radius: 2px;
        color: hsl(0, 0%, 46%);
        font-family: arial,sans-serif;
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
      }
    `;

    return style;
  }

});
