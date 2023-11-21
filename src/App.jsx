import React from 'react'
import './App.css'
import * as comp from './components'


export const App = () => {

  return (
    <div>
      <comp.Header/>
      <comp.PokeDex/>
    </div>
  )
}