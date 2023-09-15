import React from "react";

function RoomInfo({ info }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Name : {info.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted border-bottom">
          Link : <button className="btn btn-link">{info.id}</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time Left : {parseInt(
            info.time / 60
          )}m {info.time % 60}s{" "}
        </h6>
        <p
          className="card-text overflow-y-scroll"
          style={{ maxHeight: "300px" }}
        >
          {info.history.map((item) => (
            <p>
              {item.userId} : {item.msg}
            </p>
          ))}
        </p>
      </div>
    </div>
  );
}

export default RoomInfo;
