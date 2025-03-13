import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
    reducer: {
        search: searchReducer,
        favorites: favoritesReducer
    }
});

export default store;