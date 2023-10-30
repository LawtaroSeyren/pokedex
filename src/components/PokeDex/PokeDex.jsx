import React, { useEffect, useState } from 'react'
import PokeGrid from './PokeGrid/PokeGrid'
import DropdownMenu from './DropdownMenu/DropdownMenu'

const PokeDex = () => {

  const [selectedType, setSelectedType] = useState('todos');

  const handleTypeChange = ( { target } ) => {
    setSelectedType( target.value )
}


const useTypes = () => {

  const [ types, setTypes ] = useState([]);

  useEffect(() => {

    const fetchTypes = async() => {

    try {

      const response = await fetch('https://pokeapi.co/api/v2/type');
      if (!response.ok) {
        throw new Error('Error al obtener tipos');
      }

      const { results } = await response.json();

      const typeNames = results.map((result) => result.name);

      setTypes(typeNames);
    } catch (error) {
      console.log( error );
    } }

    fetchTypes();
  }, [])

  return { types };
  
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