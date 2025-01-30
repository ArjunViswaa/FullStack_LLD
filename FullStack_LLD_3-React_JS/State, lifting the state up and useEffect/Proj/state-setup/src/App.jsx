import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import TemperatureInput from './components/TemperatureInput'
import TemperatureDisplay from './components/TemperatureDisplay'
import Effects from './components/Effects'
import FetchData from './components/FetchData'

function App() {
  // const arr = useState(0);
  // const count = arr[0];
  // const setCount = arr[1];

  // const [count, setCount] = useState(0);
  // const incrementCnt = () => {
  //   setCount(count + 1);
  // }

  // const decrementCnt = () => {
  //   setCount(count - 1);
  // }

  const [temperature, setTemperature] = useState("");
  const handleTemperatureChange = (newTemp) => {
    setTemperature(newTemp);
  }

  return (
    <>
      {/* <p>Count: {count}</p>
      <button onClick={incrementCnt}>+</button>
      <button onClick={decrementCnt}>-</button> */}

      {/* <Form /> */}

      {/* <TemperatureInput temperature={temperature} onTempChange={handleTemperatureChange} />
      <TemperatureDisplay temperature={temperature} /> */}

      {/* <Effects /> */}

      <FetchData />
    </>
  )
}

export default App
