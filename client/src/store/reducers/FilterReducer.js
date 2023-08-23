import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: "all",
    date: "all",
    sort: "by date",
    author: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.category = action.payload.category;
            state.date = action.payload.date;
            state.sort = action.payload.sort;
        },
        setAuthor(state, action) {
            state.author = action.payload;
        },
        clearFilter() {
            return initialState
        }
    }
})

export default filterSlice.reducer;
export const { setFilters, setAuthor, clearFilter } = filterSlice.actions; 