import Todo from "./Todo.mjs";

export default function TodoCard(form, todoList, todoProgress) {
  enrichProgress(todoProgress);
  enrichList(todoList);
  
  form.addEventListener("submit", function submitHandler(e) {
    e.preventDefault();
    if (todoContent()) todoList.createTodo(todoContent());
    form.reset();

    /**
     * Retrieves the trimmed value of the todoInput element from the event target.
     * @returns {string} - The trimmed value of the todoInput element.
     */
    function todoContent() {
      return form.todoInput.value.trim();
    }
  });

  return { form, todoList, todoProgress };
}

function enrichList(listElement) {
  return Object.assign(listElement, {
    /**
     * Creates a todo element and appends it to the list.
     * @param {string} content - The content of the todo.
     * @param {boolean} checked - The status of the todo.
     * @returns {DocumentFragment} - The created todo element.
     */
    createTodo: function createTodo(content, checked = false) {
      this.appendChild(Todo(content, checked)).addEventListener("click", () =>
        todoProgress.assess(todoList)
      );
      todoProgress.assess(todoList);
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
