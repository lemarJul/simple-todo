import { parseHTML } from "./helper.js";

export default class Todo extends HTMLElement {
  #template = parseHTML(`
  <template class="todo">
    <input class="todo__finished" type="checkbox" name="checkbox" />
    <label class="todo__content" name="label"></label>
    <span  class="todo__delete" name="deleteButton">&#x2715;</span>
  </template>
  `);

  constructor(content, isChecked = false, id = Date.now()) {
    super();
    this.appendChild(this.#template.content);
    this.classList = this.#template.classList;

    
    const { label, checkbox } = this.children;
    checkbox.checked = isChecked;
    checkbox.setAttribute("id", id);
    label.innerText = content;
    label.setAttribute("for", id);

    // Event listeners
    this.addEventListener("click", (event) => {
      if (event.target === this.children.deleteButton) this.deleteSelf();
      else this.toggleChecked();
    });
  }

  deleteSelf() {
    this.parentNode.removeChild(this);
  }
  toggleChecked() {
    this.children.checkbox.checked = !this.children.checkbox.checked;
  }

  static get tag() {
    return "todo-item";
  }
  static registerOnce() {
    customElements.define(this.tag, this);
  }
}
Todo.registerOnce();
