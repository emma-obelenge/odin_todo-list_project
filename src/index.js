import renderTodoList from "./renderTodoList";
import "./styles/index.css";
import todoForm from "./todoForm";

let newTask = document.querySelector(".new-task-btn");
let todoListContainer = document.querySelector(".todo-list");

let todoList = JSON.parse(localStorage.getItem("todoList"));
if (!todoList || todoList.length === 0) {
  // Initialize todoList if it doesn't exist or is empty
  let emptyMessage = document.createElement("p");
  emptyMessage.className = "empty-todo-message";
  emptyMessage.textContent =
    "No tasks available. Click 'New Task' to get started.";
  todoListContainer.appendChild(emptyMessage);
} else {
  renderTodoList();
}

newTask.addEventListener("click", () => {
  todoForm();
});
