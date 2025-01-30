import React from 'react'

function TemperatureInput({temperature, onTempChange}) {

    return (
        <div>
            <label htmlFor="temperature">Temperature: </label>
            <input type="text" id="temperature" value={temperature} onChange={
                (event) => {
                    onTempChange(event.target.value);
                }
            } />
        </div>
    )
}

export default TemperatureInput