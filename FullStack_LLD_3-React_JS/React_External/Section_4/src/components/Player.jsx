import { useState } from "react";

const Player = ({ initialName, playerSymbol, isActive }) => {
    const [ isEditing, isSetEditing ] = useState(false);
    const [ playerName, setPlayerName ] = useState(initialName)

    const handleEditClick = () => {
        // isSetEditing(!isEditing); // Not best practice in react
        isSetEditing((editing) => !editing);
    }

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive && "active"}>
            <span className="player">
                { isEditing ? 
                    <input type="text" required value={playerName} onChange={handleChange} /> : <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{playerSymbol}</span>
            </span>
            <button onClick={handleEditClick}>{ isEditing ? "Save" : "Edit" }</button>
        </li>
    )
}

export default Player;