import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search); ///url을 각각의 값들로  parse 해 준다.

    socket = io(ENDPOINT, {
      //CORS HANDLING
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10001,
      transports: ["websocket"],
    });
    console.log(socket);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {
      //server쪽 join의 callback함수가 호출될시 실행.
    });
    return () => {
      //will unmount
      socket.emit("disconnect");
      socket.off(); // join off
    };
  }, [ENDPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
