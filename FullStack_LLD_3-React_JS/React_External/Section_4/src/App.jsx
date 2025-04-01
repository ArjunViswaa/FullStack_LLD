import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";

const App = () => {
  const [ activePlayer , setActivePlayer ] = useState("X");

  const handleBoxClick = () => {
    setActivePlayer((player) => player === "X" ? "O" : "X");
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" playerSymbol="X" isActive={activePlayer == "X"} />
          <Player initialName="Player 2" playerSymbol="O" isActive={activePlayer == "O"} />
        </ol>
        <GameBoard onSelectBox={handleBoxClick} activePlayerSymbol={activePlayer} />
      </div>
    </main>
  );
}

export default App;