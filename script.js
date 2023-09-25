const [form] = document.getElementsByTagName("form");
form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  const taskContent = popInputValue(this.textInput);

  if (taskContent) {
    const template = this.children.todoTemplate.content;
    const todo = todoList.appendChild(template.children.todo.cloneNode(true));
    const { label, checkbox } = todo.children;
    const uniqueID = Date.now();

    todo.addEventListener("click", todoClickHandler);
    checkbox.setAttribute("id", uniqueID);
    label.setAttribute("for", uniqueID);
    label.innerText = taskContent;

    updateProgress();
  }
}

function popInputValue(input) {
  const val = input.value.trim();
  input.value = "";
  return val;
}

function updateProgress() {
  let todoCount = document.querySelectorAll("input[type=checkbox]").length;
  let checkedTodoCount = document.querySelectorAll(
    "input[type=checkbox]:checked"
  ).length;
  const updated = checkedTodoCount + "/" + todoCount;
  progress.innerText = updated == "0/0" ? "" : updated;
}

function todoClickHandler(event) {
  console.log(event);
  const { checkbox, erase } = this.children;

  switch (event.target) {
    case this:
      // turn all the area of todos clickable to toggle check
      checkbox.dispatchEvent(new PointerEvent("click"));
      break;
    case erase:
      this.parentNode.removeChild(this);
      break;
    default:
  }
  updateProgress();
}
