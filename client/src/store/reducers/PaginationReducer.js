import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./PostReducer";

const initialState = {
    currentPage: 1,
    totalPages: null
};

export const setPage = createAsyncThunk("paginate/setpage", async (payload, { getState, dispatch }) => {
    dispatch(changePage(payload));
    let params ={};
    const {category, date, sort} = getState().filter

    params.category = category;
    params.date = date;
    params.sort = sort;
    params.currentPage = payload

    dispatch(fetchPosts(params));
})

const paginationSlice = createSlice({
    name: "paginate",
    initialState,
    reducers: {
        changeTotalPages(state, action) {
            state.totalPages = action.payload.totalPages
        },
        changePage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export default paginationSlice.reducer;
export const { changeTotalPages, changePage } = paginationSlice.actions;