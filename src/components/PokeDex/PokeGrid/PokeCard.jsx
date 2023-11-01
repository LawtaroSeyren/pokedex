import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPokemon } from '../../../store/pokemonSlice'; // Importa la acción

export const PokeCard = ( pokemon ) => {

  const dispatch = useDispatch();

  const handlePokemonClick = () => {
    // Cuando se hace clic en el enlace, despacha la acción para establecer los datos del Pokémon
    dispatch(setPokemon( pokemon ));
  };

  return (
    <NavLink className="pokecard" to={`/pokemon/${ pokemon.id }`} onClick={handlePokemonClick} >
    <h2>{pokemon.name}</h2>
    <p>ID: {pokemon.id}</p>
    <img src={pokemon.sprite} alt={pokemon.name} />
    <p>
    {pokemon.spTypes.map(( {type, spType }) => <span key={type} className = { `typeBtn ${ type }` } >
            { spType }
        </span>)}
        </p>
  </NavLink>
  )
}