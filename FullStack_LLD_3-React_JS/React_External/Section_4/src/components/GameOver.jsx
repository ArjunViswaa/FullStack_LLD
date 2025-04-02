const GameOver = ({ winner, onReset }) => {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>You win, {winner}!!</p>}
            {!winner && <p>It's a Draw...</p>}
            <p>
                <button onClick={onReset}>Re-match</button>
            </p>
        </div>
    )
}

export default GameOver;