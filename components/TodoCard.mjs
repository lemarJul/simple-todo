import Todo from "./Todo.mjs";
import { parseHTML } from "./helper.js";

/**
 * Represents a TodoCard component.
 * @class
 * @extends HTMLElement
 *
 */
export default class TodoCard extends HTMLElement {
  #template = parseHTML(`
    <template class="card">
      <h1 class="card__title">to do list</h1>
      <form id="todoForm" class="card__main">
        <input
          class="card__input"
          type="text"
          name="todoInput"
          placeholder="Your to-do here..."
        />
      </form>
      <span id="todoProgress" class="card__progress" name="todoProgress"></span>
      <div id="todoList" class="card__list" name="todoList"></div>
    </template>`);

  /**
   * Constructs a new instance of the TodoCard component.
   * @constructor
   * @returns {TodoCard} - A new instance of the TodoCard component.
   */
  constructor() {
    super();
    this.appendChild(this.#template.content);
    this.classList = this.#template.classList;

    let { todoList, todoProgress, todoForm } = this.children;
    this.list = enrichList(todoList);
    this.progress = enrichProgress(todoProgress);
    this.form = todoForm;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.#formValue()) this.createTodo(this.#formValue());
      this.form.reset();
    });
  }

  /**
   *
   * @param {string} content - The content of the todo.
   * @param {boolean} checked - The status of the todo.
   */
  createTodo(content, checked = false) {
    this.list.createTodo(content, checked).addEventListener("click", () => {
      this.#updateProgress();
    });
    this.#updateProgress();
  }


  /**
   * Retrieves the trimmed value of the todoInput element from the event target.
   * @private
   * @returns {string} - The trimmed value of the todoInput element.
   */
  #formValue() {
    return this.form.todoInput.value.trim();
  }

  /**
   * Updates the progress bar.
   * @private
   * @returns {void}
   */
  #updateProgress() {
    this.progress.assess(this.list);
  }

  /**
   * The tag name of the custom element.
   * @static
   * @returns {string} - The tag name of the custom element.
   */
  static get tag() {
    return "todo-card";
  }
  /**
   * Registers the custom element.
   * @static
   * @returns {void}
   */
  static registerOnes() {
    if (customElements.get(this.tag)) return;
    customElements.define(this.tag, this);
  }
}
TodoCard.registerOnes();

function enrichList(listElement) {
  return Object.assign(listElement, {
    /**
     * Creates a todo element and appends it to the list.
     * @param {string} content - The content of the todo.
     * @param {boolean} checked - The status of the todo.
     * @returns {DocumentFragment} - The created todo element.
     */
    createTodo: function createTodo(content, checked = false) {
      return this.appendChild(new Todo(content, checked));
    },
  });
}

function enrichProgress(progressElement) {
  return Object.assign(progressElement, {
    /**
     * Updates the progress text.
     * @returns {void}
     */
    assess: function assess(assessed) {
      const [checked, total] = countCheckboxProgression(assessed);
      progressElement.innerText = total ? format(checked, total) : "";
    },
  });
}
/**
 * Returns the number of checked checkboxes and the total checkboxes.
 * @param {HTMLElement} element - The element containing the checkboxes.
 * @returns {[number,number]} - An array containing the number of checked ones and the total.
 */
function countCheckboxProgression(element) {
  const checkboxes = element.querySelectorAll("input[type=checkbox]");
  const checkedOnes = [...checkboxes].filter((item) => item.checked);
  return [checkedOnes, checkboxes].map((item) => item.length);
}
function format(count, total) {
  return `${count}/${total}`;
}
