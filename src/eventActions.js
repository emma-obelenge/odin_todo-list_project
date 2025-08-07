import renderTodoList from "./renderTodoList";
import newElement from "./newElement";
import { getTodoList, setTodoList } from "./todolistStorageActions";
import updateTaskStyles from "./updateTaskStyles";
import updateTodoList from "./updateTodoList";
import loadSidebarAd from "./loadSidebarAd";

const sidebarEventAndLoadOnMain = (targetElement) => {
  // Check if the target element is a category
  if (!targetElement) return;

  // Remove 'active' class from all categories
  const allCategories = document.querySelectorAll(".category");
  allCategories.forEach((category) => {
    category.classList.remove("active");
  });
  // Add 'active' class to the clicked category
  targetElement.classList.add("active");

  // Get the category name from the clicked element
  const categoryName = targetElement
    .querySelector(".category-name")
    .textContent.toLowerCase()
    .trim();

  // Filter the todo list based on the selected category
  if (categoryName === "all tasks") {
    // If "All Tasks" is selected, render all tasks
    renderTodoList();
    return;
  }
  // If a specific category is selected
  renderTodoList(categoryName);
};

// function to handle the new task popup window
const newTaskEventAndLoad = () => {
  const taskFormPopup = document.querySelector(".task-form-popup");
  const overlay = document.querySelector("#overlay");
  const popupCloseBtn = document.querySelector(".cancel");
  const form = document.getElementById("taskForm");

  // function to capture the new task form data entered
  // or clear form field when mode = cancel
  function captureFormData(mode) {
    const taskTitle = form.elements["taskTitle"].value;
    const taskDescription = form.elements["taskDescription"].value;
    const taskDueDate = form.elements["taskDueDate"].value;
    let taskCategory = form.elements["taskCategory"].value;

    taskCategory =
      taskCategory.charAt(0).toUpperCase() +
      taskCategory.slice(1).toLowerCase();

    // clear form field if the mode is cancel
    if (mode === "cancel") {
      form.elements["taskTitle"].value = "";
      form.elements["taskDescription"].value = "";
      form.elements["taskDueDate"].value = "";
      form.elements["taskCategory"].value = "";
      return;
    }

    // validate form input && form action implementation
    if (!(taskTitle && taskDescription && taskDueDate && taskCategory)) {
      const errorAlert = document.querySelector(".error-alert");
      const newTaskSubmitBtn = document.querySelector(".newTaskSubmit");

      console.log(errorAlert);
      errorAlert.style.color = "red";
      errorAlert.style.display = "inline";
      newTaskSubmitBtn.style.pointerEvents = "none";
      setTimeout(() => {
        errorAlert.style.display = "none";
        newTaskSubmitBtn.style.pointerEvents = "auto";
      }, 3000);
    } else {
      const successAlert = document.querySelector(".success-alert");

      updateTodoList(taskCategory, taskDescription, taskDueDate, taskTitle);
      successAlert.style.display = "inline";
      successAlert.style.color = "green";
      setTimeout(() => {
        successAlert.style.display = "none";
        closePopup();
      }, 1000);
    }
  }

  // function that closes the new task popup window
  function closePopup() {
    captureFormData("cancel");
    overlay.style.display = "none";
    taskFormPopup.style.display = "none";
  }

  // function to activate listening for click events after popup
  function popupEventListener() {
    // event listener on new task form overlay
    overlay.addEventListener("click", () => {
      closePopup();
    });
    // event listener on new task form cancel button
    popupCloseBtn.addEventListener("click", () => {
      closePopup();
    });
    // event listener on the entire form input data
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      captureFormData();
      return;
    });
  }

  // initialize popup and overlay display to = none
  if (!(taskFormPopup.style.display && overlay.style.display)) {
    taskFormPopup.style.display = "none";
    overlay.style.display = "none";
  }

  // toggle popup and overlay display
  taskFormPopup.style.display =
    taskFormPopup.style.display === "none"
      ? (taskFormPopup.style.display = "flex")
      : (taskFormPopup.style.display = "none");
  overlay.style.display =
    overlay.style.display === "none"
      ? (overlay.style.display = "block") && popupEventListener()
      : (overlay.style.display = "none");
};

// function to handle the sidebar settings event
const settingsEventAndLoad = (targetElement) => {
  console.log("settings event loaded");
};

// function to handle the sidebar sign out event
const signOutEventAndLoad = (targetElement) => {
  console.log("sign-out event loaded");
};

// handle main section tasks checkbox toggle
const handleCheckboxToggle = (checkbox) => {
  const mainContentTitle =
    checkbox.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].textContent.toLowerCase();
  let todoList = getTodoList();

  todoList.forEach((todo) => {
    if (todo.id == checkbox.id) {
      todo.taskCompleted
        ? (todo.taskCompleted = false)
        : (todo.taskCompleted = true);
      setTodoList(todoList);
    }
  });
  updateTaskStyles();
  renderTodoList(mainContentTitle);
};

// function to update the right bar with info of element passed to it
const loadTaskItemToRightbar = (liElement) => {
  const todoList = getTodoList();
  const rightbarTaskTitle = document.querySelector(".rightbar-task-title");
  const rightbarTaskCategoryList = document.querySelector(
    ".rightbar-task-category-list"
  );
  const rightbarTaskDate = document.querySelector(".rightbar-task-date");
  const rightbarTaskDescription = document.querySelector(
    ".rightbar-task-description"
  );

  rightbarTaskCategoryList.innerHTML = "";
  const categoryTracker = new Set();
  let selectedCategory = "";

  // find the task matching the clicked li
  const selectedTask = todoList.find((todo) => todo.id == liElement.id);

  rightbarTaskTitle.value = selectedTask.taskTitle;
  rightbarTaskTitle.id = selectedTask.id;
  rightbarTaskDate.value = selectedTask.taskDueDate;
  rightbarTaskDescription.value = selectedTask.taskDescription;
  selectedCategory = selectedTask.taskCategory;

  //build unique category list and mark selected one
  todoList.forEach((todo) => {
    if (!categoryTracker.has(todo.taskCategory)) {
      categoryTracker.add(todo.taskCategory);
      const option = newElement("option", todo.taskCategory, todo.taskCategory);
      if (todo.taskCategory === selectedCategory) {
        option.selected = true;
      }
      rightbarTaskCategoryList.appendChild(option);
    }
  });
  const rightbar = document.querySelector(".rightbar");
  const adsContainer = document.querySelector(".ads-container");
  adsContainer.style.display = "none";
  rightbar.style.display = "flex";
};

const rightbarClose = () => {
  loadSidebarAd();
};

const rightbarDeleteTask = (targetElement) => {
  const taskId = targetElement.parentElement.parentElement.querySelector(
    ".rightbar-task-title"
  ).id;

  let todoList = getTodoList();

  const modifiedLIst = todoList.filter((todo) => {
    return todo.id != taskId;
  });

  setTodoList(modifiedLIst);
  let currentActiveCategory =
    targetElement.parentElement.parentElement.parentElement.parentElement
      .querySelector(".main h1")
      .textContent.toLowerCase();
  rightbarClose();
  renderTodoList(currentActiveCategory);
};

const rightbarSaveTaskChanges = (targetElement) => {
  const rightbar = targetElement.parentElement.parentElement;

  const category = rightbar
    .querySelector(".rightbar-task-category-list")
    .value.toLowerCase();
  const description = rightbar.querySelector(
    ".rightbar-task-description"
  ).value;
  const dueDate = rightbar.querySelector(".rightbar-task-date").value;
  const title = rightbar.querySelector(".rightbar-task-title").value;
  const taskId = rightbar.querySelector(".rightbar-task-title").id;

  console.log(category, description, dueDate, taskId);

  updateTodoList(category, description, dueDate, title, taskId);
  rightbarClose();
};
export {
  sidebarEventAndLoadOnMain,
  newTaskEventAndLoad,
  settingsEventAndLoad,
  signOutEventAndLoad,
  handleCheckboxToggle,
  loadTaskItemToRightbar,
  rightbarClose,
  rightbarDeleteTask,
  rightbarSaveTaskChanges,
};
