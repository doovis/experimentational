// IDEAS of rendering tasks

/*

1. Store tasks into an array and render them back from the array (done)

2. Store them into a local browser memory and display them back from it (done)

3. Store into a database and process them back from it

*/

// Selecting nodes
const modal = document.querySelector(".modal");
const btns = document.querySelector(".btns");
const choiceBtns = document.querySelector(".btns");
const taskList = document.querySelector(".task-list");
const alert = document.querySelector(".alert");
const todoContainer = document.querySelector(".todo-container");
const textInput = document.getElementById("text-input");
const enterButton = document.getElementById("button");

// List
tasks = [];
taskObj = "";
tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Task id
if (tasks.length > 0) {
  let idArr = [];
  let max = 0;

  tasks.forEach((task) => {
    idArr.push(task.id);
  });

  max = Math.max(...idArr);
  Id = max + 1;
} else {
  Id = 0;
}

// Event listeners      <-----------------
// Enter button mouse click/ enter button
enterButton.addEventListener("click", addItem);
textInput.addEventListener("keydown", handleEnter);

// Other listeners
taskList.addEventListener("click", (e) => manipulateTasks(e));
btns.children[1].addEventListener("click", deleteTask);

btns.children[0].addEventListener("click", function goBack() {
  modal.style.visibility = "hidden";
});

// Empty list content
const emptyListText = document.createElement("h4");
emptyListText.textContent = "The list is empty...";
taskList.appendChild(emptyListText);

// Rendering tasks
renderTasks();

// Adding item to the list
function addItem() {
  const value = textInput.value;
  if (value !== "" && value.length < 28) {
    textInput.value = "";

    if (tasks.length < 1) {
      taskList.removeChild(emptyListText);
    }

    // Creating new element
    let item = {
      content: value,
      id: Id,
      finished: false,
    };

    // Pushing element to the array of tasks
    tasks.unshift(item);

    // Rendering tasks
    renderTasks();

    Id++;

    displayMess("Task has been added successfully!", "success");
  } else {
    displayMess("Task addition has failed!", "fail");
  }
}

// Creating new task
function createItem(type, klass, item) {
  let letterLen = 10;
  const newDiv = document.createElement(type);

  if (item.finished) {
    newDiv.classList.add("task-completed");
  }
  newDiv.classList.add(klass);
  newDiv.setAttribute("id", `${item.id}`);
  //  newDiv.setAttribute("draggable", `true`);
  //  newDiv.setAttribute("ondragstart", `drag(event)`);

  // Element html
  newDiv.innerHTML = `
  <div class="task-text">
  <input type="text" id="edit" value="${item.content}" />
  </div>
  <img src="./checkmark.png" alt="done" id="done" />
  <img src="./restore.png" alt="restore" id="restore" />
  <img src="./bin.png" alt="delete" id="delete" />`;

  letterLen = letterLen * item.content.length;

  // paragraph field width depending on task length
  newDiv.children[0].children[0].style.width =
    letterLen < 260 ? `${letterLen}px` : `100%`;

  return newDiv;
}

// Rendering from array
function renderTasks() {
  if (tasks.length > 0) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.textContent = ``;

    tasks.forEach((task) => {
      const newTask = createItem("div", "task", task);
      taskList.appendChild(newTask);
    });
  }
}

// Alert display
function displayMess(text, Class) {
  alert.classList.toggle(`${Class}`);
  alert.textContent = text;

  globalTimeout = setTimeout(function () {
    alert.innerHTML = "";
    alert.classList.remove(`${Class}`);
  }, 1500);
}

// Editing tasks
function manipulateTasks(e) {
  taskObj = e.target.parentElement;
  taskFromList = "";

  tasks.forEach((task) => {
    if (task.id == taskObj.parentElement.id) {
      taskFromList = task;
    }
  });

  if (e.target.id === "delete") {
    modal.style.visibility = "visible";
    modal.addEventListener("click", function modalClose(e) {
      if (e.target.classList.contains("modal"))
        modal.style.visibility = "hidden";
    });
  }

  if (e.target.id === "edit") {
    e.target.addEventListener("keydown", widthChange);
    e.target.addEventListener("keydown", handleEnterContent);
    e.target.addEventListener("change", (e) => changeContent(e, taskFromList));
  }

  if (e.target.id === "done") {
    tasks.forEach((task) => {
      if (task.id == taskObj.id) {
        task.finished = true;
      }
    });

    taskObj.classList.add("task-completed");
    taskObj.children[0].children[0].disabled = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  if (e.target.id === "restore") {
    tasks.forEach((task) => {
      if (task.id == taskObj.id) {
        task.finished = false;
      }
    });

    taskObj.classList.remove("task-completed");
    taskObj.children[0].children[0].disabled = false;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Finishing tasks
function deleteTask() {
  modal.style.visibility = "hidden";
  let index = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskObj.id) {
      index = i;
    }
  }

  if (index > -1) tasks.splice(index, 1);

  // Removing all tasks
  taskList.textContent = ``;
  localStorage.removeItem("tasks");

  if (tasks.length < 1) {
    taskList.appendChild(emptyListText);
  }

  // Rendering remaining tasks in array
  renderTasks();
  displayMess("Task has been removed successfully!", "success");
}

// Enter handling
function handleEnter(e) {
  if (e.key === "Enter") addItem();
}

function handleEnterContent(e) {
  if (e.key === "Enter") e.target.blur();
}

function changeContent(e, task) {
  tasks.forEach((listTask) => {
    if (listTask.id == task.id) {
      listTask.content = e.target.value;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function widthChange(e) {
  let letterLen = 10;
  letterLen = letterLen * e.target.value.length + 10;

  if (e.target.value.length > 27) {
    if (e.key === "Backspace") {
    } else {
      e.target.blur();
    }
  } else {
    e.target.style.width = letterLen < 260 ? `${letterLen}px` : `100%`;
  }
}

// Drag and drop functionality for later
/*
function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("div", e.target.id);
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));
}
*/
