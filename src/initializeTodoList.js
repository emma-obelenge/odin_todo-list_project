import {
  getTodoList,
  setCategoryList,
  setTodoList,
} from "./todolistStorageActions";
/**
 * This function initializes the todo list in
 * localStorage if it doesn't exist or is empty.
 */

function initializeTodoList() {
  let todoList = getTodoList();
  let defaultCategoryList = [];

  if (!todoList || todoList.length === 0) {
    console.log("Initializing todo list...");
    const defaultTodoList = [
      {
        id: 1,
        taskTitle: "Research content ideas",
        taskDescription:
          "Explore trending topics and keywords. Identify target audience needs.",
        taskCategory: "Work",
        taskDueDate: "2025-10-15",
        taskCompleted: true,
      },
      {
        id: 2,
        taskTitle: "Write blog post",
        taskDescription:
          "Draft the blog post on the chosen topic. Ensure it is engaging and informative.",
        taskCategory: "Work",
        taskDueDate: "2025-07-20",
        taskCompleted: false,
      },
      {
        id: 3,
        taskTitle: "Grocery shopping",
        taskDescription:
          "Buy ingredients for the week. Focus on healthy options.",
        taskCategory: "Personal",
        taskDueDate: "2025-07-18",
        taskCompleted: false,
      },
      {
        id: 4,
        taskTitle: "Exercise",
        taskDescription:
          "Go for a run or do a home workout. Aim for at least 30 minutes.",
        taskCategory: "Health",
        taskDueDate: "2025-07-16",
        taskCompleted: false,
      },
      {
        id: 5,
        taskTitle: "Read a book",
        taskDescription:
          "Finish reading the current book. Take notes on key insights.",
        taskCategory: "Personal",
        taskDueDate: "2025-10-22",
        taskCompleted: false,
      },
      {
        id: 6,
        taskTitle: "Plan weekend trip",
        taskDescription:
          "Research destinations and activities. Create a budget and itinerary.",
        taskCategory: "Personal",
        taskDueDate: "2025-07-25",
        taskCompleted: false,
      },
      {
        id: 7,
        taskTitle: "Attend online course",
        taskDescription:
          "Complete the next module of the online course. Take quizzes and participate in discussions.",
        taskCategory: "Education",
        taskDueDate: "2025-10-30",
        taskCompleted: false,
      },
      {
        id: 8,
        taskTitle: "Organize workspace",
        taskDescription:
          "Declutter the desk and files. Set up a more efficient workflow.",
        taskCategory: "Work",
        taskDueDate: "2025-10-17",
        taskCompleted: false,
      },
      {
        id: 9,
        taskTitle: "Call family",
        taskDescription:
          "Catch up with  family members. Share updates and listen to their news.",
        taskCategory: "Personal",
        taskDueDate: "2025-10-19",
        taskCompleted: false,
      },
      {
        id: 10,
        taskTitle: "Update resume",
        taskDescription:
          "Revise the resume with recent experiences. Tailor it for specific job applications.",
        taskCategory: "Career",
        taskDueDate: "2025-10-21",
        taskCompleted: false,
      },
      {
        id: 11,
        taskTitle: "Review project requirements",
        taskDescription:
          "Go through the latest project documentation and clarify any doubts.",
        taskCategory: "Work",
        taskDueDate: new Date().toISOString().slice(0, 10),
        taskCompleted: false,
      },
      {
        id: 12,
        taskTitle: "Meditate",
        taskDescription:
          "Spend 15 minutes meditating to improve focus and reduce stress.",
        taskCategory: "Health",
        taskDueDate: new Date().toISOString().slice(0, 10),
        taskCompleted: false,
      },
      {
        id: 13,
        taskTitle: "Send birthday wishes",
        taskDescription: "Call or message friends whose birthday is today.",
        taskCategory: "Personal",
        taskDueDate: new Date().toISOString().slice(0, 10),
        taskCompleted: false,
      },
      {
        id: 14,
        taskTitle: "Prepare monthly budget",
        taskDescription: "Review expenses and plan budget for next month.",
        taskCategory: "Personal",
        taskDueDate: "2025-07-29",
        taskCompleted: false,
      },
      {
        id: 15,
        taskTitle: "Schedule dentist appointment",
        taskDescription: "Book a routine dental checkup for next week.",
        taskCategory: "Health",
        taskDueDate: "2025-07-29",
        taskCompleted: false,
      },
      {
        id: 16,
        taskTitle: "Update LinkedIn profile",
        taskDescription: "Add recent achievements and update skills section.",
        taskCategory: "Career",
        taskDueDate: "2025-11-15",
        taskCompleted: false,
      },
    ];
    setTodoList(defaultTodoList);
    defaultCategoryList = [
      ...new Set(defaultTodoList.map((todo) => todo.taskCategory)),
    ];

    console.log("default category: ", defaultCategoryList);
    setCategoryList(defaultCategoryList.sort());
  }
}

export default initializeTodoList;
