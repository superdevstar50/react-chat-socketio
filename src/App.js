import React, { useCallback, useState } from "react";
import "./App.css";

import { Button } from "react-bootstrap";
import axios from "axios";

function App() {
  const [roomId, setRoomId] = useState("");

  const handleCreate = useCallback(() => {
    axios
      .post("http://18.191.212.236:5001/create-link")
      .then((res) => res.data.id)
      .then(setRoomId)
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-center">
        <Button onClick={handleCreate} variant="primary">
          Create
        </Button>
      </div>
      <div className="d-flex justify-content-center p-2">
        <a href={`/room/${roomId}`}>{roomId}</a>
      </div>
    </div>
  );
}

export default App;
