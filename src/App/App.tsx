import { useState } from 'react'
import './App.css'
import Nav from '../components/Nav/Nav'
import Dashboard from '../pages/Dashboard'
import Counter from '../components/Counter/Counter'

function App() {

  return (
    <div>
      {/* <Nav /> */}
      <main className="">
        {/* <Dashboard /> */}
        <Counter />
      </main>
    </div>
  )
}

export default App
