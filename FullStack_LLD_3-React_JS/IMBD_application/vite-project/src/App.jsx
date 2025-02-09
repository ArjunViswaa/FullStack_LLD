import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import WatchList from './components/WatchList'
import GetData from './components/GetData'

import { Routes, Route } from 'react-router-dom'
import LabelFilter from './components/LabelFilter'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LabelFilter />
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<GetData />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes> */}
    </>
  )
}

export default App
