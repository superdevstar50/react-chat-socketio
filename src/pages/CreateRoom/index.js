import React, { useCallback, useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import axios from "axios";

import config from "../../config";

function App() {
  const [roomId, setRoomId] = useState("");
  const [minute, setMinute] = useState(5);

  const [roomList, setRoomList] = useState([]);

  const handleCreate = useCallback(() => {
    if (minute <= 0) return;
    axios
      .post(`${config.base_url}/create-link`, {
        minute,
      })
      .then((res) => res.data.id)
      .then(setRoomId)
      .catch((error) => console.log(error));
  }, [minute]);

  const getRoomList = useCallback(() => {
    axios
      .get(`${config.base_url}/links`)
      .then((res) => res.data)
      .then(setRoomList)
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getRoomList();
    setInterval(getRoomList, 500);
  }, []);

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-center align-items-center">
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
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Link</th>
              <th scope="col">Users</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {roomList.map((room, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/room/${room.id}`} target="_blank">
                    {room.id}
                  </a>
                </td>
                <td>{room.users}</td>
                <td>
                  {parseInt(room.time / 60)}m {room.time % 60}s{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
