import React, { useState } from 'react'
import PokeGrid from './PokeGrid/PokeGrid'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import { useTypes } from '../../hooks/useTypes';

const PokeDex = () => {

  const [selectedType, setSelectedType] = useState('todos');

  const handleTypeChange = ({ target }) => {
    setSelectedType(target.value)
  }

  const { types } = useTypes();


  return (
    <>
      <DropdownMenu onTypeChange={handleTypeChange} selectedType={selectedType} types={types} />
      <PokeGrid selectedType={selectedType} />
    </>
  )
}

export default PokeDex