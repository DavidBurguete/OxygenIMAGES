import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import paginationReducer from "./paginationSlice";
// import favoritesReducer from "./favoritesSlice";

const store = configureStore({
    reducer: {
        search: searchReducer,
        pagination: paginationReducer,
        // favorites: favoritesReducer
    }
});

export default store;