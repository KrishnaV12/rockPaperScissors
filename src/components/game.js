import React, { useState } from 'react';

function GameBoard({ currentGame, onGameEnd, updateScores }) {
  const [choices, setChoices] = useState({ player1: null, player2: null });

  const makeChoice = (player, choice) => {
    setChoices({ ...choices, [player]: choice });

    if (choices.player1 && choices.player2) {
      determineWinner();
    }
  };

  const determineWinner = () => {
    const { player1, player2 } = currentGame;
    const choice1 = choices.player1;
    const choice2 = choices.player2;

    if (choice1 === choice2) {
      alert('It\'s a tie!');
    } else if (
      (choice1 === 'rock' && choice2 === 'scissors') ||
      (choice1 === 'scissors' && choice2 === 'paper') ||
      (choice1 === 'paper' && choice2 === 'rock')
    ) {
      alert(`${player1} wins!`);
      updateScores(player1);
    } else {
      alert(`${player2} wins!`);
      updateScores(player2);
    }

    onGameEnd();
    setChoices({ player1: null, player2: null });
  };

  return (
    <div>
      <h2>Game Board</h2>
      <div>
        <h3>{currentGame.player1}'s Turn</h3>
        <button onClick={() => makeChoice('player1', 'rock')}>Rock</button>
        <button onClick={() => makeChoice('player1', 'paper')}>Paper</button>
        <button onClick={() => makeChoice('player1', 'scissors')}>Scissors</button>
      </div>
      <div>
        <h3>{currentGame.player2}'s Turn</h3>
        <button onClick={() => makeChoice('player2', 'rock')}>Rock</button>
        <button onClick={() => makeChoice('player2', 'paper')}>Paper</button>
        <button onClick={() => makeChoice('player2', 'scissors')}>Scissors</button>
      </div>
    </div>
  );
}

export default GameBoard;
