import renderTodoList from "./renderTodoList";

function updateTodoList(taskDescription, taskCategory) {
  // Retrieve existing todo list from localStorage or initialize as empty array
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

  // Create a new todo item object
  const newTodo = {
    description: taskDescription,
    category: taskCategory,
    completed: false,
    id: Date.now(),
  };

  // Add the new todo item to the list
  todoList.push(newTodo);

  // Save the updated list back to localStorage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  // Call the function to render the updated todo list in the DOM
  renderTodoList();
}

export default updateTodoList;
