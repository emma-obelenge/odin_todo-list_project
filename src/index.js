import "./styles/dashboard.css";
import "./styles/taskFormPopup.css";
import initializeTodoList from "./initializeTodoList";
import renderTodoList from "./renderTodoList";
import { dashboardEventListener } from "./eventListener";
import loadSidebarAd from "./loadSidebarAd";

initializeTodoList();
renderTodoList();
loadSidebarAd(true);

// const mainContent = document.querySelector(".main-content");
// const rightbar = document.querySelector(".rightbar");
dashboardEventListener();
