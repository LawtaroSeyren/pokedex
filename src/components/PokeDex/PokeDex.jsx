import React, { useState } from 'react'
import PokeGrid from './PokeGrid/PokeGrid'
import DropdownMenu from './DropdownMenu/DropdownMenu'

const PokeDex = () => {

  const [selectedType, setSelectedType] = useState('todos');

  const handleTypeChange = ( { target } ) => {
    setSelectedType( target.value )
}

  return (
    <>
    <DropdownMenu onTypeChange={handleTypeChange} selectedType={selectedType} />
    <PokeGrid selectedType={selectedType} />
    </>
  )
}

export default PokeDex