import React, { useState } from 'react'
import * as comp from '../'
import { useTypes } from '../../hooks/useTypes';

export const PokeDex = () => {

  const [selectedType, setSelectedType] = useState('todos');

  const handleTypeChange = ({ target }) => {
    setSelectedType(target.value)
  }

  const { types } = useTypes();


  return (
    <>
      <comp.DropdownMenu onTypeChange={handleTypeChange} selectedType={selectedType} types={types} />
      <comp.PokeGrid selectedType={selectedType} />
    </>
  )
}