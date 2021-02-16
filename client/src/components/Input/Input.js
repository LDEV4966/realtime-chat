import React, { useState } from "react";
import "./Input.css";
const Input = ({
  message,
  setMessage,
  attachment,
  setAttachment,
  file,
  setFile,
  sendMessage,
  onInitFile,
}) => {
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];

    setFile(theFile);

    if (theFile) {
      const reader = new FileReader();
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
    }
  };

  return (
    <>
      {attachment && (
        <div className="attachment">
          <img className="attachmentImg" src={attachment} alt="attachment" />
          <button onClick={onInitFile} className="delteFile-btn">
            <i className="deleteFile fas fa-minus-circle fa-lg"></i>
          </button>
        </div>
      )}
      <form className="form">
        <input
          className={
            "inputText" + (attachment ? " pic-active" : " pic-non-active")
          }
          type="text"
          placeholder="Type a message ..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <label
          htmlFor="inputFile"
          className={
            "inputFileLabel" + (attachment ? " non-visible" : " visible")
          }
        >
          <i className="inputFileIcon fas fa-camera"></i>
        </label>
        <input
          id="inputFile"
          className="inputFile"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>
          Send
        </button>
      </form>
    </>
  );
};

export default Input;
