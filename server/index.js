const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUserInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.all("/", function (req, res, next) {
  //CORS HANDLING
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(router);

io.on("connection", (socket) => {
  //console.log("we have a new connection!!");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room }); // we can get error or user, if we added correctly, it would be returned user. if not it would return Error
    if (error) return callback(error); // When error is happend, server response to client by callback function.
    socket.emit("message", {
      user: "admin",
      text: `Hi ${user.name}~ . Welcome to the room '${user.room}'`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });
    socket.join(user.room);

    callback(); // no error that means no parm in call back , nothing happen on the client side.
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("user had left!!");
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
