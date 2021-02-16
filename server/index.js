const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//CORS HANDLING
app.all("/", function (require, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  //console.log("we have a new connection!!");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room }); // we can get error or user, if we added correctly, it would be returned user. if not it would return Error
    if (error) return callback(error); // When error is happend, server response to client by callback function.
    socket.emit("message", {
      user: "admin",
      type: "text",
      body: `Hi ${user.name}~ . Welcome to the room '${user.room}'`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      type: "text",
      body: `${user.name} has joined`,
    });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback(); // no error that means no parm in call back , nothing happen on the client side.
  });

  socket.on("sendMessage", (messageObj, callback) => {
    const user = getUser(socket.id);
    const messageType = messageObj.type;

    const checkTime = () => {
      const d = new Date();
      let hours = String(d.getHours());
      if (hours.length == 1) {
        hours = `0${hours}`;
      }
      let mins = String(d.getMinutes());
      if (mins.length == 1) {
        mins = `0${mins}`;
      }
      return { hours, mins };
    };
    date = checkTime();
    if (messageType === "file") {
      io.to(user.room).emit("message", {
        user: user.name,
        type: messageObj.type,
        body: messageObj.body,
        fileName: messageObj.fileName,
        mimeType: messageObj.mimeType,
        timeStamp: `${date.hours}:${date.mins}`,
      });
    } else {
      io.to(user.room).emit("message", {
        user: user.name,
        type: messageObj.type,
        body: messageObj.body,
        timeStamp: `${date.hours}:${date.mins}`,
      });
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        type: "text",
        body: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
