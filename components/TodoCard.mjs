import Todo from "./Todo.mjs";

export default function TodoCard(form,todoList,todoProgress){

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
      
      todoList.createTodo = function createTodo(content, checked = false) {
        this.appendChild(Todo(content, checked)).addEventListener("click", () =>
          todoProgress.update()
        );
        todoProgress.update();
      };
      
      /**
       * Updates the progress text.
       * @returns {void}
       */
      todoProgress.update = () => {
        const [checked, total] = countCheckboxProgression(todoList);
        todoProgress.innerText = total ? format(checked, total) : "";
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
      
      function format(count, total) {
        return `${count}/${total}`;
      }

      return {form, todoList,todoProgress}
}