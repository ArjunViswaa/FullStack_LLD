import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./WinningCombinations";

const App = () => {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const gameBoard = initialGameBoard;
  let winner = null;

  for(const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for(const combinations of WINNING_COMBINATIONS) {
    const firstVal = gameBoard[combinations[0].row][combinations[0].column];
    const secondVal = gameBoard[combinations[1].row][combinations[1].column];
    const thirdVal = gameBoard[combinations[2].row][combinations[2].column];

    if(firstVal && firstVal == secondVal && firstVal == thirdVal) {
      winner = firstVal;
    }
  }

  let isDraw = gameTurns.length == 9;

  const handleBoxClick = (rowIdx, colIdx) => {
    setActivePlayer((player) => player === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player == "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIdx, col: colIdx }, player: currentPlayer }, ...prevTurns
      ]

      return updatedTurns;
    });
  }

  const handleReset = () => {
    setActivePlayer("X");
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" playerSymbol="X" isActive={activePlayer == "X"} />
          <Player initialName="Player 2" playerSymbol="O" isActive={activePlayer == "O"} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard onSelectBox={handleBoxClick} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;