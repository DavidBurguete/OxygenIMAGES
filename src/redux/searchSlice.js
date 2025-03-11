import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { firstPage, setLastPage } from "./paginationSlice";
import { useDispatch } from "react-redux";

export const search = createAsyncThunk("search/fetchSearch", async ({query}) => {
    const dispatch = useDispatch();
    let { page, lastPage } = useSelector((state) => state.pagination);
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
            const total_pages = data.total_pages >= 200 ? 200 : data.total_pages;
            dispatch(setLastPage(total_pages));
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
            dispatch(setLastPage(999));
        }

        return images;
    }
    catch(error){
        return Promise.reject({errorMessage: error.message});
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        images: [],
        pending: true,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(search.fulfilled, (state, action) => {
            state.pending = false;
            state.images = action.payload;
        }).addCase(search.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload;
        });
    }
});

export default searchSlice.reducer;