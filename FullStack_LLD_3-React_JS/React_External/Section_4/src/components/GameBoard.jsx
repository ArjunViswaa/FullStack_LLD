const GameBoard = ({ onSelectBox, board }) => {

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectBox(rowIndex, colIndex)} disabled={playerSymbol}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            })}
        </ol>
    );
}

export default GameBoard;