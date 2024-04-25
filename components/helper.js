/**
 * Parses an HTML string and returns the first element child of the parsed document body.
 *
 * @param {string} htmlString - The HTML string to be parsed.
 * @returns {Element | null} The first element child of the parsed document body.
 */
function parseTemplate(htmlString) {
    const document = new DOMParser().parseFromString(
      bodyWrapped(htmlString),
      "text/html"
    );
    return document.body.firstElementChild;
  }
  
  /**
   * Wraps the given HTML string with a <body> tag.
   *
   * @param {string} htmlString - The HTML string to be wrapped.
   * @returns {string} The wrapped HTML string.
   */
  function bodyWrapped(htmlString) {
    return `<body>${htmlString}</body>`;
  }

  export {parseTemplate}