import {
  newTaskEventAndLoad,
  sidebarEventAndLoadOnMain,
  settingsEventAndLoad,
  signOutEventAndLoad,
  mainSectionTaskItems,
  loadTaskItemToRightbar,
  handleCheckboxToggle,
  rightbarClose,
  rightbarDeleteTask,
  rightbarSaveTaskChanges,
} from "./eventActions";
import renderTodoList from "./renderTodoList";

/**
 * dashboardEventListener.js
 * Utility for event delegation on dashboard elements.
 *
 * @param {Element} parentElement - The parent element to delegate events from.
 * @param {string} eventType - The event type to listen for (e.g., 'click').
 * @param {string} selector - The CSS selector for child elements to handle.
 * @param {Function} handler - The event handler function.
 */
function dashboardEventListener() {
  let parentElementOptions = ["header", "sidebar", "main", "rightbar"];

  parentElementOptions.forEach((elem) => {
    let parentElement = document.querySelector(`.${elem}`);

    // sidebar Events implementation
    if (elem === "sidebar") {
      let sidebarSelectorOptions = [
        ".category",
        ".new-task-btn",
        ".settings",
        ".sign-out",
      ];

      sidebarSelectorOptions.forEach((selector) => {
        switch (selector) {
          case ".category":
            activateEventListener(
              parentElement,
              "click",
              selector,
              sidebarEventAndLoadOnMain
            );
            break;
          case ".new-task-btn":
            activateEventListener(
              parentElement,
              "click",
              selector,
              newTaskEventAndLoad
            );
            break;
          case ".settings":
            activateEventListener(
              parentElement,
              "click",
              selector,
              settingsEventAndLoad
            );
            break;
          case ".sign-out":
            activateEventListener(
              parentElement,
              "click",
              selector,
              signOutEventAndLoad
            );
        }
      });
    }

    // main section events implementation
    if (elem === "main") {
      let mainSectionSelectorOptions = [".add-task-btn", ".task-list li"];

      mainSectionSelectorOptions.forEach((selector) => {
        switch (selector) {
          case ".add-task-btn":
            activateEventListener(
              parentElement,
              "click",
              selector,
              newTaskEventAndLoad
            );
            break;
          case ".task-list li":
            activateEventListener(
              parentElement,
              "click",
              selector,
              (liElement, event) => {
                const checkbox = event.target.closest(".checkbox");
                if (checkbox) {
                  // Checkbox clicked: handle task completion toggle
                  handleCheckboxToggle(checkbox);
                } else {
                  // li clicked: load task into rightbar
                  loadTaskItemToRightbar(liElement);
                }
              }
            );

            break;
        }
      });
    }

    // rightbar section events implementation
    if (elem === "rightbar") {
      let rightbarSelectorOptions = [
        ".rightbar-close-btn",
        ".rightbar-delete-btn",
        ".rightbar-save-btn",
      ];

      rightbarSelectorOptions.forEach((selector) => {
        switch (selector) {
          case ".rightbar-close-btn":
            activateEventListener(
              parentElement,
              "click",
              selector,
              rightbarClose
            );
            break;
          case ".rightbar-delete-btn":
            activateEventListener(
              parentElement,
              "click",
              selector,
              rightbarDeleteTask
            );
            break;
          case ".rightbar-save-btn":
            activateEventListener(
              parentElement,
              "click",
              selector,
              rightbarSaveTaskChanges
            );
            break;
        }
      });
    }

    if (elem == "header") {
      const logoContainer = document.querySelector("header");

      activateEventListener(parentElement, "click", ".logo", () => {
        renderTodoList();
      });
    }

    // implement other parent element event if available
  });
}

function activateEventListener(
  parentElement,
  eventType,
  eventSelector,
  handler
) {
  if (
    !parentElement ||
    !eventType ||
    !eventSelector ||
    typeof handler !== "function"
  ) {
    throw new Error("Invalid parameters for dashboardEventListener");
  }

  parentElement.addEventListener(eventType, (event) => {
    // assign a target to monitor for events
    // const checkboxElement = event.target.closest(".checkbox");

    const targetElement = event.target.closest(eventSelector);

    if (targetElement && parentElement.contains(targetElement)) {
      handler(targetElement, event);
    }
  });
}

export { dashboardEventListener };
