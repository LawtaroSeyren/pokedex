import { useState, useEffect } from 'react';
import { urlBase } from './functions';
import { fetchBasicData } from './functions';

export const usePokemonList = ({ selectedType }) => {

    // El Hook va a retornar una lista de Pokémon que por defecto está vacía, y un estado de carga
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Variables y estados para manejar el infinite scrolling y la paginación
    const limit = 150; 
    const [offset, setOffset] = useState(0);
    const [allPokemonLoaded, setAllPokemonLoaded] = useState(false); // Estado para verificar si se cargaron todos los Pokémon

    // Si hay errores en la solicitud se almacenará un estado de error para mostrar al usuario
    const [error, setError] = useState(null)

    // Función para obtener las URLs de cada Pokémon y hacerles fetch a cada una
    const fetchPokemon = async (offset) => {
        setIsLoading(true);

        try {
            const { results } = await (await fetch(`${urlBase}/pokemon?limit=${limit}&offset=${offset}`)).json();
            
            // Si ya no hay más resultados quiere decir que se cargaron todos los Pokémon y por tanto la función se termina
            if (results.length === 0) {
                setAllPokemonLoaded(true);
                return [];
            }

            // Paso cada URL a la función "fetchBasicData" para obtener la información principal de cada Pokémon
            const detailedPokemonData = await Promise.all(results.map(result => fetchBasicData(result.url)));
            return detailedPokemonData;

        } catch (error) {
            setError("Error al obtener información de los Pokémon, pruebe de nuevo más tarde")
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Función para cargar más Pokémon dentro del infinite scrolling
    const loadMorePokemon = async () => {
        if (!allPokemonLoaded && !isLoading) {
            const newPokemonList = await fetchPokemon(offset);
            // Filtro para evitar los Pokémon que no son default
            const defaultPokemon = newPokemonList.filter(pokemon => pokemon.is_default);
    
            // Aplico filtro dependiendo del type elegido
            const filteredPokemon = (selectedType !== "todos")
                ? defaultPokemon.filter(pokemon => pokemon.enTypes.includes(selectedType))
                : defaultPokemon;
    
            setPokemonList(prevPokemonList => [...prevPokemonList, ...filteredPokemon]);

            // Actualizo offset sumándole el valor de limit 
            setOffset(prevOffset => prevOffset + limit);
        }
    };

    // Efecto para controlar el scroll infinito y cargar más Pokémon
    useEffect(() => {

        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                loadMorePokemon();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [allPokemonLoaded, isLoading]);

    useEffect(() => {
        // Hago el primer fetch con offset en 0
        fetchPokemon(0).then((initialPokemon) => {
            if (selectedType !== "todos") {
                const filterList = initialPokemon.filter((pokemon) => pokemon.enTypes.includes(selectedType));
                setPokemonList(filterList);
                
                // Si la lista que se muestra contiene menos de 20 elementos y aún hay más Pokémon por cargar, entonces se hace una nueva carga (así garantizo el evento de scroll)
                if (filterList.length < 20 && !allPokemonLoaded) {
                    loadMorePokemon();
                }
            } else {
                setPokemonList(initialPokemon);
                
                if (initialPokemon.length < 20 && !allPokemonLoaded) {
                    loadMorePokemon();
                }
            }
            setOffset(limit); // Actualiza el offset después de la primera carga
        });
    }, [selectedType]);
    



    return { pokemonList, isLoading, error };
};
