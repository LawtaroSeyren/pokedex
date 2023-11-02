import { useParams, useNavigate } from 'react-router-dom'
import * as comp from '../../';
import { usePokemonDetail } from '../../../hooks/functions'
import { useEffect, useState } from 'react';

export const PokeDetail = () => {

  const { id: initialId } = useParams();

  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(Number(initialId));

  useEffect(() => {
    navigate(`/pokemon/${currentId}`);
  }, [currentId]);

  useEffect(() => {
    setCurrentId(Number(initialId));
  }, [initialId]);


  const { pokemonData, isLoading, evolutionChain, prevPokemon, nextPokemon } = usePokemonDetail(currentId);

  console.log(pokemonData)


  return (
    <>
      <comp.Header />
      {isLoading ? (
        <comp.Loader />
      ) :

          <div className="container">
            <comp.NameDetail {...pokemonData} setCurrentId={setCurrentId} prevPokemon={prevPokemon} nextPokemon={nextPokemon} />

            <div className="columns">
            <div className="column">

             <comp.CentralImage {...pokemonData} />

            </div> 
            
            <div className="column">

            <comp.StatsDetail {...pokemonData } />

            </div>
            
            </div>


            <comp.MoveBadge moves={pokemonData.moves} />

            <div className="bottom-bar">

            <comp.Evolution evolutionChain={evolutionChain} setCurrentId={setCurrentId}/>
            </div>
          </div>

      }
    </>
  )
}