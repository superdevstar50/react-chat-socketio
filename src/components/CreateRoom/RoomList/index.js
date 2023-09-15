import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";

import config from "../../../config";

function RoomList() {
  const [roomList, setRoomList] = useState([]);

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
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Link</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Users</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((room, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <a
                  href={`/room/${room.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {room.id}
                </a>
              </td>
              <td>{room.name}</td>
              <td>{room.number}</td>
              <td>{room.users}</td>
              <td>
                {parseInt(room.time / 60)}m {room.time % 60}s{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomList;
