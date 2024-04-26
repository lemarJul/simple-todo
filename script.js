import TodoCard from "./components/TodoCard.mjs";

const todoCard = new TodoCard();

todoCard.createTodo("Build a simple todo app", true);
todoCard.createTodo("Squeeze the lemon until it's dry");
todoCard.createTodo("Take a break");

document.body.appendChild(todoCard);
