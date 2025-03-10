import { useState } from 'react'
import './App.css'
import SimpleForm from '../components/SimpleForm';
import AdvancedForm from '../components/AdvancedForm';
import FormikForm from '../components/FormikForm';
import TemperatureInput from '../components/TemperatureInput';
import TemperatureDisplay from '../components/TemperatureDisplay';
import DocTitleModifier from '../components/DocTitleModifier';
import UseEffectExample from '../components/UseEffectExample';

function App() {
  const [count, setCount] = useState(0);
  const [temperature, setTemperature] = useState("");

  const incrementCnt = () => {
    setCount(count + 1);
  }

  const decrementCnt = () => {
    setCount(count - 1);
  }

  const handleTemperature = (temp) => {
    setTemperature(temp);
  }

  return (
    <>
      {/* Simple form with individual states for name and email */}
      {/* <SimpleForm /> */}

      {/* A bit advanced form with one object state for both name and email */}
      {/* <AdvancedForm /> */}

      {/* Using Formik a third party React form handler for easing code readability and simpler dev */}
      {/* <FormikForm /> */}

      {/* Example for Lifting state up when both components need the same state */}
      {/* <TemperatureInput temperature={temperature} handleTemperature={handleTemperature} /> */}
      {/* <TemperatureDisplay temperature={temperature} /> */}

      {/* <DocTitleModifier /> */}

      <UseEffectExample />

      {/* <p>Count : {count}</p>
      <button onClick={incrementCnt}>+</button>
      <button onClick={decrementCnt}>-</button> */}
    </>
  )
}

export default App;