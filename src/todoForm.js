import "./styles/todoForm.css";
import updateTodoList from "./updateTodoList";

export default function todoForm() {
  let taskDescription = "";
  let taskCategory = "";
  const content = document.querySelector("#content");

  // Create overlay to make page unclickable
  const overlay = document.createElement("div");
  overlay.className = "todo-form-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.3)";
  overlay.style.zIndex = "999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  const form = document.createElement("form");
  form.className = "todo-form";
  form.style.position = "relative";
  form.style.zIndex = "1000";

  // Add close "x" button
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "×";
  closeBtn.className = "todo-form-close-btn";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "transparent";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "1.5rem";
  closeBtn.style.cursor = "pointer";
  form.appendChild(closeBtn);

  const todoFormTitle = document.createElement("h3");
  todoFormTitle.className = "todo-form-title";
  todoFormTitle.textContent = "Add a new task";
  form.appendChild(todoFormTitle);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your task here";
  input.className = "todo-input";
  input.required = true;

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category:";
  categoryLabel.className = "todo-category-label";
  categoryLabel.htmlFor = "todo-category-select";

  const categorySelect = document.createElement("select");
  categorySelect.className = "todo-category";
  categorySelect.id = "todo-category-select";
  categorySelect.required = true;

  const categories = ["Personal", "Work", "Shopping", "Other"];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.toLowerCase();
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Add";
  button.className = "todo-add-btn";

  form.appendChild(input);
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);
  form.appendChild(button);

  overlay.appendChild(form);
  document.body.appendChild(overlay);

  // Close form function
  function closeForm() {
    overlay.remove();
  }

  // Close on "x" click
  closeBtn.addEventListener("click", closeForm);

  // Close on submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    taskDescription = input.value.trim();
    taskCategory = categorySelect.value;
    updateTodoList(taskDescription, taskCategory);
    closeForm();
  });
}
