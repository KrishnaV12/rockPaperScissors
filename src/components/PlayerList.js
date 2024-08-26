import React, { useState } from "react";

const PlayerList = ({ players, addPlayer }) => {
  const [name, setName] = useState("");

  const handleAddPlayer = () => {
    if (name.trim()) {
      addPlayer(name.trim());
      setName("");
    }
  };

  return (
    <div>
      <h2>Available Players</h2>
      <ol>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ol>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleAddPlayer}>Join Game</button>
    </div>
  );
};

export default PlayerList;
