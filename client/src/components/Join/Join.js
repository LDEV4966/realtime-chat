import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const onClick = (event) => {
    //(event) => (!name || !room ? event.preventDefault() : null);
    if (!name || !room) {
      alert("Check your Empty place");
      event.preventDefault();
      return;
    }
    if (String(name).length > 8) {
      alert("Please check the rules of Name");
      event.preventDefault();
      return;
    }
    if (String(room).length > 4 || isNaN(room)) {
      alert("Please check the rules of Room");
      event.preventDefault();
      return;
    }
  };
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Realtime Chat</h1>
        <div>
          <input
            required
            value={name}
            placeholder="Your Name ( Within 8 characters )"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            required
            value={room}
            placeholder="Room Number ( Within 4 letters )"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link onClick={onClick} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
