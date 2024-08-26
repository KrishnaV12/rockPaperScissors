import React from "react";

const WaitingList = ({ waitingList }) => {
  return (
    <>
      <div>
        <h2>Waiting Lobby</h2>
        <ol>
          {waitingList.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default WaitingList;
