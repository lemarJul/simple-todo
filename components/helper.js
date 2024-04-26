/**
 * Parses an HTML string and returns the first element child of the parsed document body.
 *
 * @param {string} htmlString - The HTML string to be parsed.
 * @returns {Element | null} The first element child of the parsed document body.
 */
function parseHTML(htmlString) {
  return document.createRange().createContextualFragment(htmlString)
    .firstElementChild;
}

  export {parseHTML}