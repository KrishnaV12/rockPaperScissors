import React from "react";

const ScoreBoard = ({ scores }) => {
  console.log(scores, "scores");

  return (
    <>
      <div className="scoreboard_container">
        <h2>Scoreboard</h2>
        <ol>
          {Object.keys(scores).map((player) => (
            <li key={player}>
              {player}: {scores[player]}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default ScoreBoard;
