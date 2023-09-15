import React, { useState } from "react";

import { Button } from "react-bootstrap";
import axios from "axios";

import config from "../../../config";

function CreateCard() {
  const [roomId, setRoomId] = useState("");

  const [minute, setMinute] = useState(5);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleCreate = () => {
    if (minute <= 0) return;
    if (name === "" || number === "") return;

    axios
      .post(`${config.base_url}/create-link`, {
        minute,
        name,
        number,
      })
      .then((res) => res.data.id)
      .then(setRoomId)
      .catch((error) => console.log(error));

    setName("");
    setNumber("");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="d-flex">
          <div>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            Phone Number:
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          Kill Chat after{" "}
          <input
            type="number"
            style={{ width: "50px" }}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          ></input>{" "}
          minutes of inactivity
        </div>
        <div className="m-2">
          <Button onClick={handleCreate} variant="primary">
            Create
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-center p-2">
        <a href={`/room/${roomId}`} target="_blank">
          {roomId}
        </a>
      </div>
    </>
  );
}

export default CreateCard;
