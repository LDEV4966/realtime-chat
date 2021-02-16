import React, { useEffect, useState } from "react";

import "./Message.css";

import ImageFile from "./ImageFile/ImageFile";

import ReactEmoji from "react-emoji";

const Message = ({ message, name }) => {
  let blob; //Binary Large Object
  let isText = true;
  let isAdmin = false;
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  const messageType = message.type;
  const user = message.user;
  console.log(message);
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  if ("admin" === message.user) {
    isAdmin = true;
  }
  if (messageType == "file") {
    isText = false;
    blob = new Blob([message.body], { type: message.mimeType });
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageInfo">
        <span className="sentText timeStamp justifyEnd pr-10">
          {message.timeStamp}
        </span>
      </div>
      {isText ? (
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">
            {ReactEmoji.emojify(message.body)}
          </p>
        </div>
      ) : (
        <ImageFile fileName={message.fileName} blob={blob} />
      )}
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      {isText ? (
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">
            {ReactEmoji.emojify(message.body)}
          </p>
        </div>
      ) : (
        <ImageFile fileName={message.fileName} blob={blob} />
      )}
      {isAdmin ? (
        <span className="admin sentText pl-10">
          <i className="fas fa-bullhorn"></i>
        </span>
      ) : (
        <div className="messageInfo">
          <p className="sentText pl-10 ">{user}</p>
          <span className="sentText pl-10 justifyStart timeStamp">
            {message.timeStamp}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
