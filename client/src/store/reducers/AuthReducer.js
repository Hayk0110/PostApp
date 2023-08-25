import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookie from "js-cookie"
import AuthService from "../../services/AuthService"

const initialState = {
    token: Cookie.get("access-token") || null,
    user: null,
    loading: false,
    error: null
}

export const login = createAsyncThunk("auth/login", async (credentials) => {
    try {
        let res;
        if (credentials.hasOwnProperty("token")) {
            res = await AuthService.getUser({ token: credentials.token })
            return { user: res, accessToken: credentials.token }
        } else {
            res = await AuthService.login(credentials);
            Cookie.set("accessToken", res.accessToken);
            return res;
        }
    } catch (err) {
        throw err.message
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
            .addCase(login.rejected, (state, { message }) => {
                state.loading = false;
                state.error = message
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

export default authSlice.reducer;