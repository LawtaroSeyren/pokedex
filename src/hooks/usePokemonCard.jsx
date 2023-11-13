import { useState, useEffect, useMemo } from 'react';
import { urlBase, fetchBasicData } from "./functions";

export const usePokemonCard = (selectedType) => {

  //El Hook va a retornar una lista de Pokémon que por defecto está vacía, y un estado de carga
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Si hay errores en la solicitud se almacenará un estado de error para mostrar al usuario
  const [error, setError] = useState(null);

  // Ocupo useMemo para guardar la información de la petición y aplicar los filtros dependiendo del type elegido en el menú desplegable
  const filteredPokemon = useMemo(() => {
    if (!isLoading) {
      let filteredPokemon;
      if (selectedType === 'todos') {
        filteredPokemon = pokemonList.filter(pokemon => pokemon.is_default);
      } else {
        filteredPokemon = pokemonList.filter(pokemon =>
          pokemon.enTypes.includes(selectedType) && pokemon.is_default
        );
      }
      return filteredPokemon;
    }
    return [];
  }, [selectedType, pokemonList, isLoading]);


  // Sin dependencias, la solicitud a la PokéApi se realiza una sola vez para obtener la información inicial de todos los Pokémon
  useEffect(() => {

    // Variables para controlar los intentos de solicitud
    const maxRetries = 3;
    let retries = 0;

    setIsLoading(true);

    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`${urlBase}/pokemon?limit=3000&offset=0`);
        if (!response.ok) {
          throw new Error('Error al obtener lista de Pokémon');
        }
        const { results } = await response.json();

        const urls = results.map(result => result.url);
        const pokemonInfo = await Promise.all(urls.map(fetchBasicData));

        setPokemonList(pokemonInfo);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener información de los Pokémon', error);
        if (retries < maxRetries) {
          retries++;
          // Vuelvo a intentar hacer la solicitud hasta 3 veces
          setTimeout(fetchPokemonData, 500);
        } else {
          // Guardar el error y mostrarlo en la interfaz de usuario
          setError('Parece haber un error en la red. Por favor, inténtelo de nuevo más tarde.');
          setIsLoading(false);
        }
      }
    };

    fetchPokemonData();
  }, []); 

  return [filteredPokemon, isLoading, error];
};