import { useState } from 'react'
import './App.css'
import Nav from '../components/Nav/Nav'
import Dashboard from '../pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Nav />
      <main>
        <h1>{count}</h1>
        <Dashboard />
      </main>
    </div>
  )
}

export default App
