import TodoCard from "./components/TodoCard.mjs";

export const todoData = [
  { content: "Build a simple todo app", checked: true, id: 1 },
  { content: "Squeeze the lemon until it's dry", checked: false, id: 2 },
  { content: "Take a break", checked: false, id: 3 },
];

document.body.appendChild(new TodoCard(todoData));
