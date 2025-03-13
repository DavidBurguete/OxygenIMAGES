import { createSlice } from "@reduxjs/toolkit";

const favoritesLocalStorage = localStorage.getItem("favorites");

const initialState = {
    favorites: favoritesLocalStorage == undefined ? [] : JSON.parse(favoritesLocalStorage)
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            if(!state.favorites.some(favorite => favorite.id === action.payload.id)){
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload.id);
        }
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;