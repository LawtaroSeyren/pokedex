import { useParams, useNavigate } from 'react-router-dom'
import * as comp from '../../';
import { usePokemonDetail } from '../../../hooks/functions'
import { useEffect, useState } from 'react';

export const PokeDetail = () => {

  // Obtengo el ID desde la URL
  const { id: initialId } = useParams();

  const navigate = useNavigate();

  // Controlo estado de ID para poder modificarlo e ir cambiando de Pokémon
  const [ currentId, setCurrentId ] = useState(Number( initialId ));

  // Obtengo toda la información a través del hook usePokemonDetail, que hace el fetch inicial para la data inicial del Pokémon, y las solicitudes secundarias para obtener info de especie, cadena evolutiva y criaturas que le siguen en la Pokédex
  const { pokemonData, isLoading, evolutionChain, prevPokemon, nextPokemon } = usePokemonDetail( currentId );

  // El firstType es esencial para colorear elementos según el tipo del Pokémon
  const { firstType } = pokemonData;

  // Si el valor del ID cambia, navega a la nueva URL y el componente se re-renderiza
  useEffect(() => {
    navigate(`/pokemon/${ currentId }`);
  }, [ currentId ]);

  useEffect(() => {
    setCurrentId(Number( initialId ));
  }, [ initialId ]);


  return (
    <>
      <comp.Header />
      {isLoading ? (
        <comp.Loader />
      ) :

        // NameDetail: Barra con Pokémon anterior y posterior, nombre, nombre en japonés, y sprite
        <div className="container">
          <comp.NameDetail { ...pokemonData } setCurrentId={ setCurrentId } prevPokemon={ prevPokemon } nextPokemon={ nextPokemon } />

          <div className="columns">
            <div className="column">

              {/* CentralImage: Imagen del Pokémon, types, imagen shiny y botones para intercambiar imágenes  */}
              <comp.CentralImage { ...pokemonData } />

            </div>

            <div className="column">

              {/* StatsDetail: Estadísticas númericas, descripción del Pokémon, peso y habilidades */}
              <comp.StatsDetail {...pokemonData} />

            </div>

          </div>

          {/* MoveBadge: Lista de movimientos que aprende el Pokémon */}
          <comp.MoveBadge moves={ pokemonData.moves } />

          {/* GameList: Lista con todos los juegos en los que aparece el Pokémon */}
          <comp.GameList games={ pokemonData.games } />

          {/* Evolution: Cadena evolutiva del Pokémon */}
          <comp.Evolution evolutionChain={ evolutionChain } setCurrentId={ setCurrentId } firstType={ firstType } />
        </div>

      }
    </>
  )
}