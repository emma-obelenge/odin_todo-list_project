function getTodoList() {
  return JSON.parse(localStorage.getItem("odinTodoList"));
}

function setTodoList(newList) {
  localStorage.setItem("odinTodoList", JSON.stringify(newList));
}

function setCategoryList(newCategoryList) {
  localStorage.setItem("defaultCategoryList", JSON.stringify(newCategoryList));
}

function getCategoryList() {
  return JSON.parse(localStorage.getItem("defaultCategoryList"));
}
export { getTodoList, setTodoList, setCategoryList, getCategoryList };
