import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookie from "js-cookie"
import AuthService from "../../services/AuthService"

const initialState = {
    token: Cookie.get("accessToken") || null,
    user: null,
    loading: false,
    error: null
}

export const login = createAsyncThunk("auth/login", async (credentials, {rejectWithValue}) => {
    try {
        let res;
        if (credentials == null) {
            res = await AuthService.refresh()
            return { user: res.user, accessToken: res.accessToken }
        } else {
            res = await AuthService.login(credentials);
            Cookie.set("accessToken", res.accessToken);
            return res;
        }
    } catch (err) {
        console.log(err.response)
        if(err.response.status === 401){
            return rejectWithValue(null)
        }else{
            return rejectWithValue(err.response.data.message)
        }
    }

})

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        await AuthService.logout();
        Cookie.remove("accessToken");
    } catch (err) {
        throw err.message
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError(state){
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.accessToken;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, { message }) => {
                state.loading = false;
                state.error = message
            })
    }
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;