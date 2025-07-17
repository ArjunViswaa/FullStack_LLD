import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyComponent, { AnotherComponent } from './components/MyComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyComponent />
      <AnotherComponent />
    </>
  )
}

export default App
