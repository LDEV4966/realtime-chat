const express = require("express");
const socketio = require("socket.io");
const http = require("http");

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
  console.log("we have a new connection!!");

  socket.on("join", ({ name, room },callback) => {
    console.log(name, room);
    
  });
  socket.on("disconnect", () => {
    console.log("user had left!!");
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
