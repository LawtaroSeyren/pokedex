import { NavLink } from 'react-router-dom';

export const NameDetail = ({ name, sprite, id, prevPokemon, nextPokemon, japaneseName, firstType }) => {

  // Lógica de cambiar id por onClick

    /* const increaseId = () => {
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
      
      */

  return (
    <>
     <div className="top-bar">

        {
        // Barra en la que muestro el nombre del Pokémon anterior (si es que existe), un bloque con nombre e imagen del actual, y el nombre del siguiente
        }

        { prevPokemon ? <NavLink className="pokemon-list-name" to={`/pokemon/${ prevPokemon.id }`} ><h2> ◀ { prevPokemon.name } </h2></NavLink> : <h2>Pokédex</h2> }
        <div className="top-bar-central-name">
          <h1>{ name }</h1>
          <span className="sprite-detail"><img src={ sprite } alt={ name } /></span>
          <span className='id-detail'>#{ id }</span>

        </div>

        { nextPokemon ? <NavLink className="pokemon-list-name" to={`/pokemon/${ nextPokemon.id }`} ><h2> { nextPokemon.name } ▶ </h2></NavLink> : <h2>Pokédex</h2> }

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
