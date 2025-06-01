import "./styles/renderTodoList.css";
import createDiv from "./createDiv";

// Helper function to update task styles and button states
function updateTaskStyles({ completed }, taskTitle, editBtn, deleteBtn) {
  if (completed) {
    taskTitle.style.textDecoration = "line-through";
    taskTitle.style.color = "#888";
    editBtn.disabled = true;
    deleteBtn.disabled = true;
    editBtn.style.pointerEvents = "none";
    deleteBtn.style.pointerEvents = "none";
    editBtn.style.opacity = "0.5";
    deleteBtn.style.opacity = "0.5";
  } else {
    editBtn.disabled = false;
    deleteBtn.disabled = false;
    editBtn.style.pointerEvents = "auto";
    deleteBtn.style.pointerEvents = "auto";
    editBtn.style.opacity = "1";
    deleteBtn.style.opacity = "1";
    taskTitle.style.textDecoration = "none";
    taskTitle.style.color = "";
  }
}

// Function to render the todo list in the DOM
function renderTodoList() {
  let todoList = JSON.parse(localStorage.getItem("todoList"));

  const listContainer = document.querySelector(".todo-list");

  if (!listContainer) return;
  listContainer.innerHTML = "";

  todoList.forEach((todo, index) => {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "todo-checkbox";
    checkBox.checked = todo.completed;

    const taskTitle = document.createElement("span");
    taskTitle.textContent = todo.description;
    taskTitle.className = "todo-title";

    const buttonContainer = createDiv();
    buttonContainer.className = "task-buttons";
    const editBtn = document.createElement("i");
    editBtn.className = "fa-solid fa-pen-to-square";

    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fa-solid fa-trash";

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    const item = document.createElement("li");
    item.className = "todo-item";
    item.setAttribute("data-id", todo.id);
    item.appendChild(checkBox);
    item.appendChild(taskTitle);
    item.appendChild(buttonContainer);

    // Apply styles based on completion
    updateTaskStyles(todo, taskTitle, editBtn, deleteBtn);

    // Checkbox event: toggle completed
    checkBox.addEventListener("change", () => {
      todoList[index].completed = checkBox.checked;
      localStorage.setItem("todoList", JSON.stringify(todoList));
      updateTaskStyles(todoList[index], taskTitle, editBtn, deleteBtn);
    });

    // Delete event: remove from DOM and storage
    deleteBtn.addEventListener("click", () => {
      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      item.remove();
    });

    // Edit event: call edit handler
    editBtn.addEventListener("click", () => {
      if (typeof handleEditTask === "function") {
        handleEditTask(todo, index);
      }
    });

    listContainer.appendChild(item);
  });

  function handleEditTask(todo, index) {
    const listContainer = document.querySelector(".todo-list");
    const item = listContainer.querySelector(`[data-id="${todo.id}"]`);
    if (!item) return;

    const taskTitle = item.querySelector(".todo-title");
    const editBtn = item.querySelector(".fa-pen-to-square");
    const deleteBtn = item.querySelector(".fa-trash");

    // Create input for editing
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.description;
    input.className = "edit-input";
    taskTitle.replaceWith(input);

    // Add a thick check icon for saving
    let saveBtn = document.createElement("i");
    saveBtn.className = "fa-solid fa-circle-check save-edit-btn";
    saveBtn.title = "Save";
    saveBtn.style.color = "green"; // Set the color to green

    // Insert saveBtn before editBtn
    editBtn.parentNode.insertBefore(saveBtn, editBtn);

    // Disable buttons while editing
    editBtn.disabled = true;
    deleteBtn.disabled = true;
    editBtn.style.pointerEvents = "none";
    deleteBtn.style.pointerEvents = "none";
    editBtn.style.opacity = "0.5";
    deleteBtn.style.opacity = "0.5";

    input.focus();

    function saveEdit() {
      const newValue = input.value.trim();
      if (newValue) {
        todo.description = newValue;
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList[index].description = newValue;
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTodoList();
      } else {
        input.focus();
      }
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      } else if (e.key === "Escape") {
        renderTodoList();
      }
    });

    input.addEventListener("blur", saveEdit);

    saveBtn.addEventListener("mousedown", (e) => {
      // Prevent blur before click
      e.preventDefault();
      saveEdit();
    });
  }
  window.handleEditTask = handleEditTask;
}
export default renderTodoList;
