import Todo from "./components/Todo.mjs";

const form = document.getElementById("todoForm");
const { todoList, todoProgress } = form.children;

form.addEventListener("submit", function submitHandler(e) {
  e.preventDefault();
  if (todoContent()) addTodo();
  this.reset();

  /**
   * Adds a new todo item to the todo list.
   */
  function addTodo() {
    todoList
      .appendChild(Todo(todoContent()))
      .addEventListener("click", todoProgress.update);
    todoProgress.update();
  }

  /**
   * Retrieves the trimmed value of the todoInput element from the event target.
   * @returns {string} - The trimmed value of the todoInput element.
   */
  function todoContent() {
    return e.target.todoInput.value.trim();
  }
});

/**
 * Updates the progress text.
 * @returns {void}
 */
todoProgress.update = () => {
  const [checkedCount, todoCount] = countCheckboxProgression(todoList);
  const formatted = todoCount ? [checkedCount, todoCount].join("/") : "";
  todoProgress.innerText = formatted;
};

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
