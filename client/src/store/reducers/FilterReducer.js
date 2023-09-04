import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: "all",
    date: "all",
    sort: "by date",
    author: "",
    title: "",
    search: "by author"
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilters(state, action) {
            Object.assign(state, action.payload);
          },
        setAuthor(state, action) {
            state.author = action.payload;
        },
        setTitile(state, action){
            state.title = action.payload;
        },
        setSearch(state, action){
            state.author = "";
            state.title = "";
            state.search = action.payload;
        },
        clearFilter() {
            return initialState
        }
    }
})

export default filterSlice.reducer;
export const { setFilters, setAuthor, setTitile, setSearch,clearFilter } = filterSlice.actions; 