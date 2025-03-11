import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    lastPage: 999
}

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers:{
        prevPage: (state) => {
            state.page = state.page - 1 <= 0 ? state.page : state.page - 1;
        },
        firstPage: (state) => {
            state.page = 1;
        },
        priorToPriorPage: (state) => {
            state.page = state.page - 2 < 1 ? 1 : state.page - 2;
        },
        priorPage: (state) => {
            state.page = state.page - 1 < 1 ? 1 : state.page - 1;
        },
        goToLastPage: (state) => {
            state.page = state.lastPage;
        },
        posteriorPage: (state) => {
            state.page = state.page + 1 > state.lastPage ? state.page : state.page + 1;
        },
        posteriorToPosteriorPage: (state) => {
            state.page = state.page + 2 > state.lastPage ? state.lastPage : state.page + 2;
        },
        nextPage: (state) => {
            state.page = state.page + 1 > state.lastPage ? state.page : state.page + 1;
        },
        setLastPage: (state, action) => {
            state.lastPage = action.payload;
        }
    }
});

export const {
    prevPage,
    firstPage,
    priorToPriorPage,
    priorPage,
    goToLastPage,
    posteriorPage,
    posteriorToPosteriorPage,
    nextPage,
    setLastPage
} = paginationSlice.actions;
  
export default paginationSlice.reducer;