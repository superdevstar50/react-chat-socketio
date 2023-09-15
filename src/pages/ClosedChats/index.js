import React, { useCallback, useEffect, useMemo, useState } from "react";

import RoomInfo from "../../components/AllOpenedChats/RoomInfo";

import axios from "axios";

import config from "../../config";

function ClosedChats() {
  const [roomList, setRoomList] = useState([]);

  const [filterDate, setFilterDate] = useState("");

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

  const filterRoomList = useMemo(() => {
    console.log(filterDate);
    if (!filterDate) {
      return roomList.map((room) => (
        <RoomInfo key={room.id} info={room}></RoomInfo>
      ));
    }

    const date = new Date(filterDate);
    return roomList
      .filter((room) => {
        const roomDate = new Date(room.date);
        return (
          roomDate.getFullYear() === date.getFullYear() &&
          roomDate.getMonth() === date.getMonth() &&
          roomDate.getDate() === date.getDate()
        );
      })
      .map((room) => <RoomInfo key={room.id} info={room}></RoomInfo>);
  }, [roomList, filterDate]);

  return (
    <div className="p-2">
      <div className="card">
        <div className="card-body d-flex align-items-center justify-content-center">
          <label>Filter by Date: </label>
          <input
            type="date"
            className="form-control w-25"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="alert alert-primary" role="alert">
        Total chats closed {filterRoomList.length}
      </div>
      {filterRoomList}
    </div>
  );
}

export default ClosedChats;
