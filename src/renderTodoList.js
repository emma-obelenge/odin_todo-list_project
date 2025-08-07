// import "./styles/renderTodoList.css";
import newElement from "./newElement";
import { getTodoList } from "./todolistStorageActions";
import updateTaskStyles from "./updateTaskStyles";

const renderSidebarCategories = (todoList) => {
  // Function to render sidebar categories and update counts and list items

  let pastTask = 0;
  let todayTask = 0;
  let upcomingTask = 0;

  const pastTaskCount = document.querySelector(".past-task-count");
  const todayTaskCount = document.querySelector(".today-task-count");
  const upcomingTaskCount = document.querySelector(".upcoming-task-count");

  let availableCategories = [{ name: "all", count: todoList.length }];

  // update sidebar items and count
  todoList.forEach((todo) => {
    if (
      todo.taskCategory &&
      !availableCategories.some((cat) => cat.name === todo.taskCategory)
    ) {
      availableCategories.push({
        name: todo.taskCategory,
        count: 0,
      });
    }
    if (todo.taskCategory) {
      availableCategories.find((cat) => cat.name === todo.taskCategory).count++;
    }

    if (todo.taskDueDate && testDate(todo.taskDueDate) == "past") {
      pastTask++;
    } else if (todo.taskDueDate && testDate(todo.taskDueDate) == "today") {
      todayTask++;
    } else if (todo.taskDueDate && testDate(todo.taskDueDate) == "upcoming") {
      upcomingTask++;
    }
  });

  // wiping all sidebar category Data on the DOM
  const sidebarCategories = document.querySelector(".list-categories");
  sidebarCategories.innerHTML = "";

  availableCategories.forEach((category) => {
    if (category.name === "all" && category.count === 0) return;

    if (category.name === "all") {
      const allTaskCount = document.querySelector(".all-tasks-count");
      if (allTaskCount) {
        allTaskCount.textContent = category.count;
      }
    } else {
      const categoryElement = newElement("li", "category");
      categoryElement.innerHTML = `<span class="dot ${category.name.toLowerCase()}"></span>
    <span class="category-name">${category.name}</span> <span class="count">${
        category.count
      }</span>`;

      sidebarCategories.appendChild(categoryElement);
    }
  });
  todayTaskCount.textContent = todayTask;
  upcomingTaskCount.textContent = upcomingTask;
  pastTaskCount.textContent = pastTask;
};

const testDate = (sampleDate) => {
  const today = new Date();
  const testDate = new Date(sampleDate);
  if (
    testDate.getFullYear() === today.getFullYear() &&
    testDate.getMonth() === today.getMonth() &&
    testDate.getDate() === today.getDate()
  ) {
    return "today";
  } else if (testDate > today) {
    return "upcoming";
  } else {
    return "past";
  }
};

const renderMainContent = (todoList, mode) => {
  // Function to render the main content of the todo list based on the selected mode/category filter

  const listContainer = document.querySelector(".task-list");
  const mainContentTitle = document.querySelector(".main-content-title");

  if (mode == "all tasks") {
    mode = "default";
  }
  if (mode != "default") {
    let title = mode.charAt(0).toUpperCase() + mode.slice(1);
    mainContentTitle.textContent = title;

    // Apply filter based on specific category
    if (mode === "upcoming") {
      // Filter for upcoming tasks
      todoList = todoList
        .filter((todo) => {
          const dueDate = new Date(todo.taskDueDate);
          return dueDate > new Date();
        })
        .sort((a, b) => {
          return new Date(a.taskDueDate) - new Date(b.taskDueDate);
        });
    } else if (mode === "today") {
      // Filter for today's tasks
      todoList = todoList
        .filter((todo) => {
          const dueDate = new Date(todo.taskDueDate);
          const today = new Date();
          return (
            dueDate.getFullYear() === today.getFullYear() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getDate() === today.getDate()
          );
        })
        .sort((a, b) => {
          return new Date(a.taskDueDate) - new Date(b.taskDueDate);
        });
    } else if (mode === "past") {
      // Filter for past tasks
      todoList = todoList
        .filter((todo) => {
          const dueDate = new Date(todo.taskDueDate);
          const today = new Date();
          return dueDate < today && !(dueDate.getDate() == today.getDate());
        })
        .sort((a, b) => {
          return new Date(a.taskDueDate) - new Date(b.taskDueDate);
        });
    } else {
      todoList = todoList
        .filter((todo) => todo.taskCategory.toLowerCase() == mode)
        .sort((a, b) => {
          return new Date(a.taskDueDate) - new Date(b.taskDueDate);
        });
    }
  } else {
    mainContentTitle.textContent = "All Tasks";
    todoList.sort((a, b) => {
      return new Date(a.taskDueDate) - new Date(b.taskDueDate);
    });
  }

  if (!listContainer) return;
  listContainer.innerHTML = "";

  // Create elements for checkbox, title, date, category, arrow, and implement render
  todoList.forEach((todo) => {
    const checkBox = newElement("input", "checkbox");
    checkBox.type = "checkbox";
    checkBox.checked = todo.taskCompleted;
    checkBox.id = todo.id;

    const taskTitle = newElement("span", "task-title", todo.taskTitle);

    const taskDateAndTagContainer = newElement("span", "dateAndTagContainer");

    const taskDate = newElement("span", "date", todo.taskDueDate);

    const taskTag = newElement("span", "tag", todo.taskCategory);

    const arrow = newElement("span", "arrow");
    arrow.innerHTML = "&#8250;"; // Right arrow symbol

    // Create the list item and append all elements
    const todoTask = newElement("li");
    todoTask.id = todo.id;

    taskDateAndTagContainer.appendChild(taskDate);
    taskDateAndTagContainer.appendChild(taskTag);
    todoTask.appendChild(checkBox);
    todoTask.appendChild(taskTitle);
    todoTask.appendChild(taskDateAndTagContainer);
    todoTask.appendChild(arrow);

    listContainer.appendChild(todoTask);

    checkBox.checked
      ? (checkBox.parentElement.className = "completed")
      : checkBox.parentElement.removeAttribute("class");
  });
  updateTaskStyles();
};

// Function to render the todo list to the DOM
const renderTodoList = (mode = "default") => {
  let todoList = getTodoList();
  renderSidebarCategories(todoList);
  renderMainContent(todoList, mode);
};

export default renderTodoList;
