import { useParams  } from 'react-router-dom'
import * as comp from '../../';
import { usePokemonDetail } from '../../../hooks/functions'
import { useEffect, useState } from 'react';

export const PokeDetail = () => {
  const { id: initialId } = useParams();
  const [ currentId, setCurrentId ] = useState( Number( initialId ) );

  useEffect(() => {
    setCurrentId( Number( initialId ) );
  }, [ initialId ] );

  const { pokemonData, isLoading } = usePokemonDetail( currentId );

  return (
    <>
      <comp.Header />
      {isLoading ? (
        <comp.Loader />
      ) :
        <div>
          <h3>{pokemonData.name}</h3>
          <p>ID: {pokemonData.id}</p>
    <img src={pokemonData.image} alt={pokemonData.name} />
    <p>
    {pokemonData.spTypes.map(( {type, spType }) => <span key={type} className = { `typeBtn ${ type }` } >
            { spType }
        </span>)}
        </p>
        <p>PESO:</p> <p>{ pokemonData.weight / 10 } KG</p> <p> ALTURA: </p> <p>{ pokemonData.height / 10 } M.</p>
              <p> HABILIDADES: </p>
                { pokemonData.abilities.map( ( name, index ) => (
                  <span  key={ index }>{ name }</span>
                ))}
        </div>
      }

    </>
  )
}