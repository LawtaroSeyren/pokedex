import React, { useEffect } from 'react'

export const NameDetail = ({ name, sprite, id, setCurrentId, prevPokemon, nextPokemon, japaneseName }) => {

    const increaseId = () => {
        const newId = ( id + 1 );
        setCurrentId( newId );
      };
    
      const decreaseId = () => {
            const newId = ( id - 1 );
            setCurrentId( newId );
      };
    
      useEffect(() => {
        setCurrentId( id );
      }, [ id ] )

  return (
    <>
     <div className="top-bar">

        {
        // Barra en la que muestro el nombre del Pokémon anterior (si es que existe), un bloque con nombre e imagen del actual, y el nombre del siguiente
        }

        { prevPokemon ? <h2 onClick={ decreaseId } > ◀ { prevPokemon.name } </h2> : <h2>Pokédex</h2> }
        <div>
          <h1>{ name }</h1>
          <span><img src={ sprite } alt={ name } /></span>
        </div>

        { nextPokemon ? <h2 onClick={ increaseId } > { nextPokemon.name } ▶</h2> : <h2>Pokédex</h2> }

      </div>

        { 
        // Barra con nombre en japonés 
        }

      <div>
        <h2 id="japanese-title"> { japaneseName } </h2>
      </div>
    </>
  )
}
