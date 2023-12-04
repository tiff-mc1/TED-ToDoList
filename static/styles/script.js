let tasks = [];
let taskInput = document.getElementById("new-task");
let addButton = document.getElementById("add");
let incompleteTasks = document.getElementById("incomplete-tasks");
let completedTasks = document.getElementById("completed-tasks");
let clearButton = document.getElementById("clear");

function getTasksFromLocalStorage() {
  tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

  if (tasks) {
    tasks = tasks;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getTasksFromLocalStorage();
  tasks.forEach((savedTaskText) => {
    let listItem = createNewTask(savedTaskText);
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  });
});

// CREATE NEW TASK
let createNewTask = function (taskName) {
  let listItem = document.createElement("li");
  let checkbox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  checkbox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskName;

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// ADD TO-DO
let addTask = function () {
  if (taskInput.value === "") {
    alert("Task field is empty!");
  }

  let listItem = createNewTask(taskInput.value);
  incompleteTasks.appendChild(listItem);

  tasks.push(taskInput.value);
  localStorage.setItem("Tasks", JSON.stringify(tasks));

  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

addButton.addEventListener("click", addTask);

let editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector('input[type="text"]');
  let label = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("editMode");
  let tasksLS = JSON.parse(localStorage.getItem("Tasks"));

  if (containsClass) {
    const mappedTasksLS = tasksLS.map((task) =>
      task === label.innerText ? (task = editInput.value) : task
    );
    label.innerText = editInput.value;
    localStorage.setItem("Tasks", JSON.stringify(mappedTasksLS));
  }

  listItem.classList.toggle("editMode");
};

let deleteTask = function () {
  let listItem = this.parentNode;
  let label = listItem.querySelector("label");
  let ul = listItem.parentNode;

  const tasksLS = JSON.parse(localStorage.getItem("Tasks"));
  filterTasks = tasksLS.filter((taskLS) => taskLS !== label.innerHTML);
  localStorage.setItem("Tasks", JSON.stringify(filterTasks));

  ul.removeChild(listItem);
};

let taskCompleted = function () {
  let listItem = this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function () {
  let listItem = this.parentNode;
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// BIND TASK EVENT
let bindTaskEvents = function (taskListItem, checkboxEventHandler) {
  // select listitems children
  let checkbox = taskListItem.querySelector('input[type="checkbox"]');

  // select the edit and delete buttons, which are elements inside the taskListItem element
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

  // bind editTask and deleteTask to buttons
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;

  // bind checkBoxEventHandler to checkbox
  checkbox.onchange = checkboxEventHandler;
};

let clear = function () {
  incompleteTasks.innerHTML = "";
  completedTasks.innerHTML = "";
  localStorage.clear("Tasks");
};

clearButton.addEventListener("click", clear);
