import { useParams } from 'react-router-dom'
import * as comp from '../../';
import { usePokemonDetail } from '../../../hooks/functions'
import { useEffect, useState } from 'react';

export const PokeDetail = () => {
  const { id: initialId } = useParams();
  const [currentId, setCurrentId] = useState(Number(initialId));

  useEffect(() => {
    setCurrentId(Number(initialId));
  }, [initialId]);

  const { pokemonData, isLoading } = usePokemonDetail(currentId);

  return (
    <>
      <comp.Header />
      {isLoading ? (
        <comp.Loader />
      ) :
        <div>
          <h2>{pokemonData.name}</h2>
          <h3>{pokemonData.japaneseName}</h3>
          <p>ID: {pokemonData.id}</p>
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
    </>
  )
}