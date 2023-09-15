import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import { io } from "socket.io-client";
import { Button } from "react-bootstrap";

import config from "../config";

const ROOM_NOT_FOUND = 1;
const USER_FULL = 2;
const ENTER_YOUR_NAME = 3;
const LETS_CHAT = 4;

let socket;

function ChatRoom() {
  const [status, setStatus] = useState(0);
  const historyRef = useRef(null);

  let { id: roomId } = useParams();

  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);

  const submitMessage = () => {
    if (message === "") return;

    socket.emit("msg", message);

    setMessage("");
  };

  const submitName = () => {
    if (userName === "") return;

    socket.emit("setName", userName);
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

    socket.on("msg", (message) => {
      setHistory((history) => [...history, message]);
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
    <div class="container p-3">
      {status === ROOM_NOT_FOUND && (
        <div class="alert alert-danger" role="alert">
          Room Not Found
        </div>
      )}
      {status === USER_FULL && (
        <div class="alert alert-danger" role="alert">
          USER FULL
        </div>
      )}
      {status === ENTER_YOUR_NAME && (
        <div>
          <div class="form-group p-2">
            <label for="exampleInputEmail1">Enter Your Name</label>
            <input
              class="form-control"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <Button onClick={submitName}>Submit</Button>
          </div>
        </div>
      )}
      {status === LETS_CHAT && (
        <div class="row clearfix" style={{ height: "100%" }}>
          <div class="col-lg-12" style={{ height: "100%" }}>
            <div
              class="card chat-app"
              style={{ width: "400px", height: "500px" }}
            >
              {/* <div id="plist" class="people-list" style={{ height: "100%" }}>
                <ul class="list-unstyled chat-list mt-2 mb-0">
                  {users.map((user, index) => (
                    <li class="clearfix" key={index}>
                      <img
                        src={`https://bootdey.com/img/Content/avatar/avatar${index +
                          1}.png`}
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">{user}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div class="chat d-flex flex-column" style={{ height: "100%" }}>
                <div
                  class="chat-history"
                  style={{ height: "100%", overflowY: "auto" }}
                  ref={historyRef}
                >
                  <ul class="m-b-0">
                    {history.map((item, index) => (
                      <li class="clearfix" key={index}>
                        <div
                          class={cn([
                            "message-data",
                            { "text-right": item.userId === userName },
                          ])}
                        >
                          {/* <span class="message-data-time">{item.time}</span> */}
                        </div>
                        <div
                          class={cn([
                            "message",
                            {
                              "float-right my-message":
                                item.userId === userName,
                              "other-message": item.userId !== userName,
                            },
                          ])}
                        >
                          {item.msg}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div class="chat-message clearfix">
                  <div class="input-group mb-0">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter text here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          submitMessage();
                        }
                      }}
                    />
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
