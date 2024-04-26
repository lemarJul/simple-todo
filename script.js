import TodoCard from "./components/TodoCard.mjs";

const form = document.getElementById("todoForm");
const { todoList, todoProgress } = form.children;

const { todoList: myList } = TodoCard(form, todoList, todoProgress);

myList.createTodo("Build a simple todo app", true);
myList.createTodo("Squeeze the lemon until it's dry");
myList.createTodo("Take a break");
