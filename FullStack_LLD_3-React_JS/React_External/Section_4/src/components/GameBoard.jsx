import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const GameBoard = ({ onSelectBox, activePlayerSymbol }) => {
    const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

    const handleClick = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            let updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });
        onSelectBox();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => {
                return <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleClick(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            })}
        </ol>
    );
}

export default GameBoard;