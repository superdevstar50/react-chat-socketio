import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import { io } from "socket.io-client";
import { Button } from "react-bootstrap";

import config from "../../config";

import "./index.css";

const ROOM_NOT_FOUND = 1;
const USER_FULL = 2;
const ENTER_YOUR_NAME = 3;
const LETS_CHAT = 4;
const TIME_EXPIRED = 5;

let socket;

function ChatRoom() {
  const [status, setStatus] = useState(0);
  const historyRef = useRef(null);

  let { id: roomId } = useParams();

  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [, setUsers] = useState([]);
  const [typing, setTyping] = useState(false);

  const fileRef = useRef(null);

  const submitMessage = () => {
    if (message === "") return;

    socket.emit("msg", message);

    setMessage("");
  };

  const submitName = () => {
    if (userName === "") return;

    socket.emit("setName", userName);
  };

  const handleSendFile = () => {
    fileRef.current.click();
  };

  const handleFileChange = async () => {
    const formData = new FormData();

    const file = fileRef.current.files[0];

    formData.append("file", file);

    const result = await fetch(`${config.base_url}/upload-file`, {
      method: "POST",
      body: formData,
    });
    const data = await result.json();
    socket.emit("sendFile", data.filename);

    fileRef.current.value = "";
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (value !== "" && message === "") {
      socket.emit("typing", "start");
    }
    if (value === "" && message !== "") {
      socket.emit("typing", "end");
    }
  };

  useEffect(() => {
    socket = io(config.base_url, {
      query: {
        roomId,
      },
    });

    socket.on("roomNotFound", () => {
      setStatus(ROOM_NOT_FOUND);
    });

    socket.on("userFull", () => {
      setStatus(USER_FULL);
    });

    socket.on("enterYourName", () => {
      setStatus(ENTER_YOUR_NAME);
    });

    socket.on("letsChat", () => {
      setStatus(LETS_CHAT);
    });

    socket.on("setUserList", (users) => {
      setUsers(users);
    });

    socket.on("timeExpired", (users) => {
      setStatus(TIME_EXPIRED);
    });

    socket.on("msg", (message) => {
      setHistory((history) => [...history, message]);
    });

    socket.on("typing", (type) => {
      setTyping(type === "start");
    });

    return () => {
      socket.close();
    };
  }, [roomId]);

  useEffect(() => {
    if (historyRef.current === null) return;
    historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [history]);

  return (
    <div className="container p-3">
      {status === ROOM_NOT_FOUND && (
        <div className="alert alert-danger" role="alert">
          Room Not Found
        </div>
      )}
      {status === USER_FULL && (
        <div className="alert alert-danger" role="alert">
          USER FULL
        </div>
      )}
      {status === TIME_EXPIRED && (
        <div className="alert alert-danger" role="alert">
          Time Expired
        </div>
      )}
      {status === ENTER_YOUR_NAME && (
        <div>
          <div className="form-group p-2">
            <label>Enter Your Name</label>
            <input
              className="form-control"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <Button onClick={submitName}>Submit</Button>
          </div>
        </div>
      )}
      {status === LETS_CHAT && (
        <div className="row clearfix" style={{ height: "100%" }}>
          <div className="col-lg-12" style={{ height: "100%" }}>
            <div
              className="card chat-app"
              style={{ width: "400px", height: "500px" }}
            >
              {/* <div id="plist" className="people-list" style={{ height: "100%" }}>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {users.map((user, index) => (
                    <li className="clearfix" key={index}>
                      <img
                        src={`https://bootdey.com/img/Content/avatar/avatar${index +
                          1}.png`}
                        alt="avatar"
                      />
                      <div className="about">
                        <div className="name">{user}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div
                className="chat d-flex flex-column"
                style={{ height: "100%" }}
              >
                <div
                  className="chat-history"
                  style={{ height: "100%", overflowY: "auto" }}
                  ref={historyRef}
                >
                  <ul className="m-b-0">
                    {history.map((item, index) => (
                      <li className="clearfix" key={index}>
                        <div
                          className={cn([
                            "message-data",
                            { "text-right": item.userId === userName },
                          ])}
                        >
                          {/* <span className="message-data-time">{item.time}</span> */}
                        </div>
                        <div
                          className={cn([
                            "message",
                            {
                              "float-right my-message":
                                item.userId === userName,
                              "other-message": item.userId !== userName,
                            },
                          ])}
                        >
                          {item.type ? (
                            <a
                              href={`${config.base_url}/uploads/${item.filename}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.filename}
                            </a>
                          ) : (
                            item.msg
                          )}
                        </div>
                      </li>
                    ))}
                    {typing && (
                      <li className="clearfix">
                        <div className="message-data"></div>
                        <div className="message other-message">
                          <div class="typing">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter text here..."
                      value={message}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          submitMessage();
                        }
                      }}
                    />
                    <input
                      id="file"
                      name="file"
                      type="file"
                      ref={fileRef}
                      onChange={handleFileChange}
                      hidden
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handleSendFile}
                    >
                      Attach
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
