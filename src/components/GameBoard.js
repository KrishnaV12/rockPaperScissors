import React, { useState, useEffect, useCallback } from "react";

function GameBoard({ currentGame, onGameEnd, updateScores }) {
  const [steps, setSteps] = useState(
    JSON.parse(localStorage.getItem("steps")) || {
      player1: null,
      player2: null,
    }
  );
  console.log(steps, "steps");

  useEffect(() => {
    localStorage.setItem("steps", JSON.stringify(steps));
  }, [steps]);

  const handleStorageChange = useCallback(() => {
    const savedSteps = localStorage.getItem("steps");
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps));
    }
  }, []);

  //   useEffect(() => {
  //     //handleStorageChange function is called when localStorage changes elsewhere.
  //     const handleStorageChange = () => {
  //       console.log("repeated");

  //       setSteps(JSON.parse(localStorage.getItem("steps")));
  //     };
  //     // passing the fuction handleSorageChange to check if its gettimg
  //     window.addEventListener("storage", handleStorageChange);

  //     // cleanUp function It ensures that the event listener is removed to prevent memory leaks and unwanted error.
  //     return () => {
  //       window.removeEventListener("storage", handleStorageChange);
  //     };
  //   }, []);

  useEffect(() => {
    //handleStorageChange function is called when localStorage changes elsewhere.
    window.addEventListener("storage", handleStorageChange);
    // // cleanUp function It ensures that the event listener is removed to prevent memory leaks and unwanted error.
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  const makeMove = (player, move) => {
    console.log(player, move, "selectedMove");
    const updateMove = { ...steps, [player]: move };
    setSteps(updateMove);
    if (updateMove.player1 && updateMove.player2) {
      gamePlayResult(updateMove);
    }
  };

  const gamePlayResult = (selection) => {
    const { player1, player2 } = currentGame;
    const move1 = selection.player1;
    const move2 = selection.player2;

    if (move1 === move2) {
      alert("It's a tie!");
    } else if (
      (move1 === "rock" && move2 === "scissors") ||
      (move1 === "scissors" && move2 === "paper") ||
      (move1 === "paper" && move2 === "rock")
    ) {
      alert(`${player1} wins!`);
      updateScores(player1);
    } else {
      alert(`${player2} wins!`);
      updateScores(player2);
    }

    setSteps({ player1: null, player2: null });
    localStorage.removeItem("steps");
    onGameEnd();
  };

  return (
    <div>
      <h2>Game Board</h2>
      <div>
        <h3>{currentGame.player1}'s Turn To Make Move</h3>
        <button
          onClick={() => makeMove("player1", "rock")}
          disabled={!!steps.player1}
        >
          Rock
        </button>
        <button
          onClick={() => makeMove("player1", "paper")}
          disabled={!!steps.player1}
        >
          Paper
        </button>
        <button
          onClick={() => makeMove("player1", "scissors")}
          disabled={!!steps.player1}
        >
          Scissors
        </button>
      </div>
      <div>
        <h3>{currentGame.player2}'s Turn To Make Move</h3>
        <button
          onClick={() => makeMove("player2", "rock")}
          disabled={!!steps.player2}
        >
          Rock
        </button>
        <button
          onClick={() => makeMove("player2", "paper")}
          disabled={!!steps.player2}
        >
          Paper
        </button>
        <button
          onClick={() => makeMove("player2", "scissors")}
          disabled={!!steps.player2}
        >
          Scissors
        </button>
      </div>
    </div>
  );
}

export default GameBoard;
