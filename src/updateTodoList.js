import renderTodoList from "./renderTodoList";
import { getTodoList, setTodoList } from "./todolistStorageActions";

function updateTodoList(category, description, dueDate, title, customId = "") {
  // Retrieve existing todo list from localStorage or initialize as empty array
  let newTodoList = getTodoList() || [];

  if (customId) {
    const itemToModify = newTodoList.find(
      (todo) => String(todo.id) === String(customId)
    );

    if (itemToModify) {
      newTodoList = newTodoList.filter(
        (todo) => String(todo.id) !== String(customId)
      );
    } else {
      customId = "";
      console.log("task ID not found in storage");
    }
  }

  // Create a new todo item object
  const newTaskData = {
    id: customId || Date.now(),
    taskCategory: category,
    taskCompleted: false,
    taskDescription: description,
    taskDueDate: dueDate,
    taskTitle: title,
  };

  console.log("new taskData is:", newTaskData);

  // Add the new todo item to the list
  newTodoList.push(newTaskData);

  // Save the updated list back to localStorage
  setTodoList(newTodoList);

  // Call the function to render the updated todo list in the DOM
  renderTodoList();
}

export default updateTodoList;
