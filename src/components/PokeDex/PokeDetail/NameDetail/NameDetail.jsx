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
      <div>

        { prevPokemon ? <h2 onClick={ decreaseId } > ◀ { prevPokemon.name }</h2> : <h2>Pokédex</h2> }
        <div>
          <h1>{ name }</h1>
          <span><img src={ sprite } alt={ name } /></span>
          <span>ID: { id }</span>
        </div>

        { nextPokemon ? <h2 onClick={ increaseId } > { nextPokemon.name } ▶</h2> : <h2>Pokédex</h2> }

      </div>

      <div>
        <h2> { japaneseName } </h2>
      </div>
    </>
  )
}
