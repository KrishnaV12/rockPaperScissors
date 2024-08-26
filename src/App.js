import React, { useState, useEffect } from "react";
import PlayerList from "./components/PlayerList";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import WaitingList from "./components/WaitingList";
import "./App.css"

function App() {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")) || []
  );
  const [currentGame, setCurrentGame] = useState(
    JSON.parse(localStorage.getItem("currentGame")) || {
      player1: null,
      player2: null,
    }
  );
  const [waitingList, setWaitingList] = useState(
    JSON.parse(localStorage.getItem("waitingList")) || []
  );
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("scores")) || {}
  );

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("currentGame", JSON.stringify(currentGame));
    localStorage.setItem("waitingList", JSON.stringify(waitingList));
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [players, currentGame, waitingList, scores]);

  useEffect(() => {
    const handleStorageChange = () => {
      setPlayers(JSON.parse(localStorage.getItem("players")));
      setCurrentGame(JSON.parse(localStorage.getItem("currentGame")));
      setWaitingList(JSON.parse(localStorage.getItem("waitingList")));
      setScores(JSON.parse(localStorage.getItem("scores")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addPlayer = (name) => {
    if (players.length < 2) {
      const updatedPlayers = [...players, name];
      setPlayers(updatedPlayers);
      if (players.length === 1) {
        setCurrentGame({ ...currentGame, player2: name });
      } else {
        setCurrentGame({ player1: name });
      }
    } else {
      setWaitingList([...waitingList, name]);
    }
  };

  const updateScores = (winner) => {
    setScores({ ...scores, [winner]: (scores[winner] || 0) + 1 });
  };

  const onGameEnd = () => {
    if (waitingList.length > 0) {
      const nextPlayer = waitingList.shift();
      setCurrentGame({ player1: players[0], player2: nextPlayer });
      setPlayers([players[0], nextPlayer]);
    }
  };

  return (
    <div className="game_Container">
      <h1>Welcome To Rock Paper Scissors Game , Lets Play</h1>
      <PlayerList players={players} addPlayer={addPlayer} />
      <GameBoard
        currentGame={currentGame}
        onGameEnd={onGameEnd}
        updateScores={updateScores}
      />
      <ScoreBoard scores={scores} />
      <WaitingList waitingList={waitingList} />
    </div>
  );
}

export default App;
