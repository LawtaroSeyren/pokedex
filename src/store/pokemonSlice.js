import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: null,
  reducers: {
    setPokemon: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;