const form = document.getElementById("todoForm");
const { todoInput, todoTemplate, todoList, todoProgress } = form.children;

form.addEventListener("submit", function submitHandler(e) {
  e.preventDefault();
  const todoContent = todoInput.value.trim();
  this.reset();

  if (!todoContent) return;
  const todo = Todo(todoContent);
  todoList.appendChild(todo);
  todoProgress.update();
});

/**
 * Creates a to-do element.
 * @param {string} content - The content of the to-do.
 * @param {number} id - The unique identifier for the to-do.
 * @returns {DocumentFragment} - The cloned template fragment representing the to-do.
 */
function Todo(content, id = Date.now()) {
  const fragment = todoTemplate.content.cloneNode(true);
  const todo = fragment.firstElementChild;
  const { label, deleteButton, checkbox } = todo.children;

  // attributes
  checkbox.setAttribute("id", id);
  label.setAttribute("for", id);
  // escaped content
  label.innerText = content;
  // methods
  todo.deleteSelf = () => todo.parentNode.removeChild(todo);
  todo.toggleChecked = () => (checkbox.checked = !checkbox.checked);
  // event listeners
  todo.addEventListener("click", (event) => {
    if (event.target === deleteButton) todo.deleteSelf();
    else todo.toggleChecked(); // the whole to-do is clickable
    todoProgress.update();
  });
  return fragment;
}

/**
 * Updates the progress text.
 * @returns {void}
 */
todoProgress.update = () => {
  const [checkedCount, todoCount] = getProgressionValues();
  const formatted = todoCount ? [checkedCount, todoCount].join("/") : "";
  todoProgress.innerText = formatted;
};

/**
 * Returns the number of checked to-dos and the total number of to-dos.
 * @returns {[number,number]} - An array containing the number of checked to-dos and the total number of to-dos.
 */
function getProgressionValues() {
  const todos = document.querySelectorAll("input[type=checkbox]");
  const total = todos.length;
  const checked = [...todos].filter((item) => item.checked).length;
  return [checked, total];
}
