import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const search = createAsyncThunk("search/fetchSearch", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { query, page } = state.search;
    let url = '';
    if(query !== ""){
        url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30&client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI`;
    }
    else{
        url = `https://api.unsplash.com/photos?&page=${page}&per_page=30&client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI`;
    }

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Couldn't fetch the data!");
        }

        const data = await response.json();

        let images = null;
        let total_pages = 999;

        if(query !== ""){
            images = data.results.map((image) => {
                return ({
                    id: image.id,
                    date: image.created_at.split("T")[0],
                    width: image.width,
                    height: image.height,
                    description: image.description,
                    alt: image.alt_description,
                    link: image.urls.regular,
                    download: image.links.download_location,
                    likes: image.likes,
                    liked_by_user: image.liked_by_user,
                })
            });
            total_pages = data.total_pages >= 200 ? 200 : data.total_pages;
        }
        else{
            images = data.map((image) => {
                return ({
                    id: image.id,
                    date: image.created_at.split("T")[0],
                    width: image.width,
                    height: image.height,
                    description: image.description,
                    alt: image.alt_description,
                    link: image.urls.regular,
                    download: image.links.download_location,
                    likes: image.likes,
                    liked_by_user: image.liked_by_user,
                })
            });
        }

        return [images, total_pages];
    }
    catch(error){
        return Promise.reject({errorMessage: error.message});
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        images: [],
        pending: true,
        error: null,
        page: 1,
        lastPage: 999
    },
    reducers: {
        goToPage: (state, action) => {
            const newPage = action.payload;
            if(1 <= newPage && newPage <= state.lastPage){
                state.page = newPage;
            }
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(search.fulfilled, (state, action) => {
            state.pending = false;
            [state.images, state.lastPage] = action.payload;
        }).addCase(search.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload;
        });
    }
});

export const {
    goToPage,
    setQuery
} = searchSlice.actions;

export default searchSlice.reducer;