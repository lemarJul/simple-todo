const template = `
  <div class="todo">
    <input class="todo__finished" type="checkbox" name="checkbox" />
    <label class="todo__content" name="label"></label>
    <span  class="todo__delete" name="deleteButton">&#x2715;</span>
  </div>
  `;

/**
 *
 * Creates a to-do element.
 * @param {string} content - The content of the to-do.
 * @param {number} id - The unique identifier for the to-do.
 * @returns {DocumentFragment | null} - The cloned template fragment representing the to-do.
 */
export default function Todo(content, id = Date.now(), isChecked = false) {
  const fragment = parseTemplate(template);
  if (!fragment) {
    console.error(
      ` Couldn't create a to-do element with template: ${template}`
    );
    return null;
  }
  const { label, deleteButton, checkbox } = fragment.children;

  // attributes
  checkbox.setAttribute("id", id);
  checkbox.checked = isChecked;
  label.setAttribute("for", id);
  // escaped content
  label.innerText = content;
  // methods
  fragment.deleteSelf = () => fragment.parentNode.removeChild(todo);
  fragment.toggleChecked = () => (checkbox.checked = !checkbox.checked);
  // event listeners
  fragment.addEventListener("click", (event) => {
    if (event.target === deleteButton) fragment.deleteSelf();
    else fragment.toggleChecked(); // the whole to-do is clickable
  });
  return fragment;
}

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

