import React, { useCallback, useEffect, useState } from "react";

import RoomInfo from "../../components/AllOpenedChats/RoomInfo";

import axios from "axios";

import config from "../../config";

function AllOpenedChats() {
  const [roomList, setRoomList] = useState([]);

  const getRoomList = useCallback(() => {
    axios
      .get(`${config.base_url}/openedrooms`)
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
        Total chats opened {roomList.length}
      </div>
      {roomList.map((room) => (
        <RoomInfo key={room.id} info={room}></RoomInfo>
      ))}
    </div>
  );
}

export default AllOpenedChats;
