import TodoCard from "./components/TodoCard.mjs";

const { todoList } = TodoCard(
  document.getElementById("todoForm"),
  document.getElementById("todoList"),
  document.getElementById("todoProgress")
);

todoList.createTodo("Build a simple todo app", true);
todoList.createTodo("Squeeze the lemon until it's dry");
todoList.createTodo("Take a break");
