import React from "react";

function App() {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-between p-5 w-50">
        <a href="/create-link">
          <button className="btn btn-primary"> Create Link </button>
        </a>
        <a href="/allopenedchats">
          <button className="btn btn-primary"> All Opened Chats </button>
        </a>
        <a href="/closedchats">
          <button className="btn btn-primary"> Closed Chats </button>
        </a>
      </div>
    </div>
  );
}

export default App;
