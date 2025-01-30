import React from 'react'

function TemperatureDisplay({temperature}) {

  return (
    <div>
      <h2>Temperature in celcius: {temperature} deg cel</h2>
      <h2>Temperature in farenheit: {temperature * 9 / 5} deg fh</h2>
    </div>
  )
}

export default TemperatureDisplay