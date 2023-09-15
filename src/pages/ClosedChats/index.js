import React, { useCallback, useEffect, useState } from "react";

import RoomInfo from "../../components/AllOpenedChats/RoomInfo";

import axios from "axios";

import config from "../../config";

function ClosedChats() {
  const [roomList, setRoomList] = useState([]);

  const getRoomList = useCallback(() => {
    axios
      .get(`${config.base_url}/closedrooms`)
      .then((res) => res.data)
      .then(setRoomList)
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getRoomList();
    setInterval(getRoomList, 500);
  }, []);

  return (
    <div className="p-2">
      <div className="alert alert-primary" role="alert">
        Total chats closed {roomList.length}
      </div>
      {roomList.map((room) => (
        <RoomInfo key={room.id} info={room}></RoomInfo>
      ))}
    </div>
  );
}

export default ClosedChats;
