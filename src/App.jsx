import React from 'react'
import './App.css'
import PokeDex from './components/PokeDex/PokeDex'
import Header from './components/Header/Header'


const App = () => {
  return (
    <div>
      <Header/>
      <PokeDex/>
    </div>
  )
}

export default App