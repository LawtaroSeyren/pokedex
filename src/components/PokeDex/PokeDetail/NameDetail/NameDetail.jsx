import React, { useEffect } from 'react'

export const NameDetail = ({ name, sprite, id, setCurrentId, prevPokemon, nextPokemon, japaneseName, firstType }) => {

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

        { prevPokemon ? <h2 className="pokemon-list-name" onClick={ decreaseId } > ◀ { prevPokemon.name } </h2> : <h2>Pokédex</h2> }
        <div className="top-bar-central-name">
          <h1>{ name }</h1>
          <span className="sprite-detail"><img src={ sprite } alt={ name } /></span>
          <span className='id-detail'>#{ id }</span>

        </div>

        { nextPokemon ? <h2 className="pokemon-list-name" onClick={ increaseId } > { nextPokemon.name } ▶</h2> : <h2>Pokédex</h2> }

      </div>

        { 
        // Barra con nombre en japonés 
        }

      <div className={ firstType }>
        <h2 id="japanese-title"> { japaneseName } </h2>
      </div>
    </>
  )
}
