const socket = io();
const messages = document.getElementById("messages");
const alertMess = document.querySelector(".alertBox");
const chatWindow = document.querySelector(".chatwindow");
const nickname = document.querySelector(".nickname");
const accountOpener = document.querySelector(".circle");
const accountBar = document.querySelector(".accountBar");
const sidebarOpener = document.querySelector(".sidebarOpener");
const accountClose = document.querySelector(".accBarCloseBtn");
const accountList = document.querySelector(".accountList");
const input = document.getElementById("input");
const form = document.getElementById("form");
const overlay = document.createElement("div");
const promptWindow = document.createElement("div");
const infoText = document.createElement("p");
const inputField = document.createElement("input");
const joinBtn = document.createElement("button");
const usernameForm = document.createElement("form");

accountOpener.addEventListener("click", () => {
  accountBar.classList.toggle("opened");
  sidebarOpener.classList.toggle("sideOpen");
});

// Nickname entry window
//if (!localStorage.getItem("connectionID")) {
//}
startWindow();

const id =
  Number(localStorage.getItem("connectionID")) ||
  Math.round(Math.random() * 100000);
if (localStorage.getItem("connectionID") == id) {
  Math.round(Math.random() * 100000);
}
if (!localStorage.getItem("connectionID")) {
  localStorage.setItem("connectionID", id);
}
let badSubmission = false;
let username = "";

// Entering chat room
usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputField.value != "") {
    username = inputField.value;
    socket.emit("enterChat", { username: username, id: id });
    overlay.style.display = "none";
  }
});

// Submiting a message
if (!badSubmission) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value && username) {
      socket.emit("chat message", {
        message: `${input.value}`,
        user: `${username}`,
        id: id,
      });

      input.value = "";
    } else {
      alertMess.classList.add("alertActive");

      badSubmission = true;
      setTimeout(() => {
        alertMess.classList.remove("alertActive");
        badSubmission = false;
      }, 2000);
    }
  });
}

// Sharing messages with server
socket.on("chat message", function (msg) {
  if (msg.id != id) {
    message(msg.message, msg.user);
  } else {
    messageSelf(msg.message, msg.user);
  }
});

// List of active users
socket.on("users", (users) => {
  accountList.innerHTML = "";
  activeUsers(users);
});

// Message rendering
// Message from other users
function message(message, user) {
  const item = document.createElement("div");
  item.classList.add("userMessage");
  const nick = document.createElement("p");
  nick.classList.add("username");
  const mess = document.createElement("p");
  mess.classList.add("mess");

  item.appendChild(nick);
  item.appendChild(mess);
  messages.appendChild(item);

  nick.textContent = user;
  mess.textContent = message;

  window.scrollTo(0, document.body.scrollHeight);
}

// Message for oneself
function messageSelf(message, user) {
  const item = document.createElement("div");
  item.classList.add("selfMessage");
  const nick = document.createElement("p");
  nick.classList.add("usernameSelf");
  const mess = document.createElement("p");
  mess.classList.add("mess");

  item.appendChild(nick);
  item.appendChild(mess);
  messages.appendChild(item);

  nick.textContent = user;
  mess.textContent = message;

  window.scrollTo(0, document.body.scrollHeight);
}

function startWindow() {
  overlay.classList.add("chatOverlay");
  promptWindow.classList.add("window");
  infoText.classList.add("infoUsername");
  inputField.classList.add("usernameInput");
  joinBtn.classList.add("joinBtn");
  usernameForm.classList.add("usernameForm");

  infoText.textContent = "Please enter your username to enter the chat room";
  inputField.placeholder = "Enter Username";
  inputField.maxLength = "20";
  joinBtn.textContent = "Join";

  document.body.prepend(overlay);
  overlay.appendChild(promptWindow);
  promptWindow.appendChild(infoText);
  promptWindow.appendChild(usernameForm);
  usernameForm.appendChild(inputField);
  usernameForm.appendChild(joinBtn);
}

function activeUsers(users) {
  users.forEach((user) => {
    const item = document.createElement("div");
    item.classList.add("userItem");
    const nick = document.createElement("p");
    const active = document.createElement("img");

    active.src = "./active.png";
    accountList.appendChild(item);
    item.appendChild(active);
    item.appendChild(nick);

    nick.textContent = user.username;
  });
}
