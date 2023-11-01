import { useParams, useNavigate } from 'react-router-dom'
import * as comp from '../../';
import { usePokemonDetail } from '../../../hooks/functions'
import { useEffect, useState } from 'react';

export const PokeDetail = () => {

  const { id: initialId } = useParams();

  const navigate = useNavigate();
  const [ currentId, setCurrentId ] = useState( Number( initialId ) );

  useEffect(() => {
    navigate( `/pokemon/${ currentId }` );
  }, [ currentId ] );

  useEffect(() => {
    setCurrentId( Number( initialId ) );
  }, [ initialId ] );


  const { pokemonData, isLoading, evolutionChain, prevPokemon, nextPokemon } = usePokemonDetail( currentId );

  
  return (
    <>
      <comp.Header />
      {isLoading ? (
        <comp.Loader />
      ) :
        <div>
          <comp.NameDetail { ...pokemonData } setCurrentId={ setCurrentId }  prevPokemon={ prevPokemon } nextPokemon={ nextPokemon } />
          <img src={pokemonData.image} alt={pokemonData.name} />
          <p>{pokemonData.genera}</p>
          <p>
            {pokemonData.spTypes.map(({ type, spType }) => (< comp.TypeBadge key={type} type={type} spType={spType} />))}
          </p>
          <p>PESO:</p> <p>{pokemonData.weight / 10} KG</p> <p> ALTURA: </p> <p>{pokemonData.height / 10} M.</p>
          <p> HABILIDADES: </p>
          {pokemonData.abilities.map((name, index) => (
            <span key={index}>{name}</span>
          ))}
        </div>
      }

      {pokemonData.stats.map((stat) => {
        (<div key={stat.stat.name}>
          <p>{stat.stat.name}: {stat.base_stat}</p>
        </div>);
      })}

      <p>MOVIMIENTOS:</p>
    <comp.MoveBadge moves={pokemonData.moves}/>
    <hr/>
    <comp.Evolution evolutionChain={evolutionChain} />
    </>
  )
}