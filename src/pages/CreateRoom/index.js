import React from "react";

import CreateCard from "../../components/CreateRoom/CreateCard";
import RoomList from "../../components/CreateRoom/RoomList";

function CreateRoom() {
  return (
    <div className="container p-2">
      <CreateCard />

      <RoomList />
    </div>
  );
}

export default CreateRoom;
