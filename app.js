const express = require("express");
const app = express();
const http = require("http");
const { connected } = require("process");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const hostname = "localhost";
const port = process.env.PORT || 8000;
const connectedUsers = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/chatApp.html");
});

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  //console.log(`User ${socket.id} has connected`);

  socket.on("enterChat", (user) => {
    let exists = false;
    connectedUsers.forEach((connectedUser) => {
      if (user.id == connectedUser.id) {
        exists = true;
        if (user.username != connectedUser.username) {
          connectedUser.username = user.username;
        }
        deletingOldSocket(socket);
        user.socketID = socket.id;
        connectedUsers.push(user);
      }
    });
    if (!exists) {
      user.socketID = socket.id;
      connectedUsers.push(user);
    }
    io.emit("users", connectedUsers);

    console.log(connectedUsers);
  });

  socket.on("disconnect", () => {
    if (connectedUsers.length > 0) {
      deletingOldSocket(socket);
      io.emit("users", connectedUsers);
    }
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log(`http://${hostname}:${port}/ is running...`);
});

function deletingOldSocket(curSocket) {
  connectedUsers.forEach((user) => {
    if (user.socketID == curSocket.id) {
      connectedUsers.splice(connectedUsers.indexOf(user), 1);
    }
  });
}
