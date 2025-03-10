import { useState } from 'react';

function TemperatureInput({temperature, handleTemperature}) {
    // const [temperature, setTemperature] = useState(''); // Not required since we've lifted this state up and passed it as props

    return (
        <div>
            <label>
                Enter temperature:
                <input
                    type="text"
                    value={temperature}
                    // onChange={(e) => setTemperature(e.target.value)}
                    onChange={(e) => handleTemperature(e.target.value)}
                />
            </label>
        </div>
    );
}

export default TemperatureInput;