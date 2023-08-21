import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: "all",
    date: "all",
    sort: "by date",
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
        clearFilter() {
            return initialState
        }
    }
})

export default filterSlice.reducer;
export const { setFilters, clearFilter } = filterSlice.actions; 