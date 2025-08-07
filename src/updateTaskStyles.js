import renderTodoList from "./renderTodoList";

// function to update task styles and button states
export default function updateTaskStyles() {
  const completedTasks = document.querySelectorAll(".completed");

  completedTasks.forEach((task) => {
    task.style.textDecoration = "line-through";
    task.style.color = "#888";
    // task.style.pointerEvents = "none";
  });
}
