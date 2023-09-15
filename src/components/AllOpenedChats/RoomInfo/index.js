import React, { useReducer, useState } from "react";

import { Collapse } from "react-bootstrap";

function RoomInfo({ info }) {
  const [toggle, setToggle] = useReducer((prev) => !prev, false);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Name : {info.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted border-bottom">
          Link :{" "}
          <button className="btn btn-link" onClick={setToggle}>
            {info.id}
          </button>
          {info.time && (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time Left :{" "}
              {parseInt(info.time / 60)}m {info.time % 60}s{" "}
            </>
          )}
        </h6>
        <Collapse in={toggle}>
          <p
            className="card-text overflow-y-scroll"
            style={{ maxHeight: "300px" }}
          >
            {info.history.length > 0
              ? info.history.map((item, index) => (
                  <p key={index}>
                    {item.userId} : {item.msg}
                  </p>
                ))
              : "No Chat History"}
          </p>
        </Collapse>
      </div>
    </div>
  );
}

export default RoomInfo;
