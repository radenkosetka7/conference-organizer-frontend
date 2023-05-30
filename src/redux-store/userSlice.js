import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "../api/auth.service";
import userService from "../api/user.service";

export const login = createAsyncThunk("users/login", async ({username, password}) => {
    return await authService.login(username, password);
});
export const changePassword = createAsyncThunk("users/changePassword", async ({value}) => {
    return await userService.changePassword(value);
});

export const updateUser = createAsyncThunk("users/updateUser", async ({value}) => {
    return await userService.updateUser(value);
});

export const getStaffUser = createAsyncThunk("users/getStaffUsers", async ({value}) => {
    return await userService.staff();
});
export const status = createAsyncThunk("users/status", async () => {
    return await userService.status();
});

const onSuccessAuth = (state, action) => {
    state.authenticated = true;
    state.authenticationFailed = false;
    state.loading = false;
};
const logoutAction = (state) => {
    state.authenticated = false;
    state.loading = false;
    state.user = null;
    state.role = null;
    authService.logout();
}

const userSlice = createSlice({
    name: 'users',
    initialState: {
        authenticated: false,
        authenticatedFailed: false,
        loading: false,
        user: null,
        role: null,
        staffs: [],
    },
    reducers: {
        logout: logoutAction,
    },
    extraReducers: {
        [login.fulfilled]: onSuccessAuth,
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
        },

        [status.fulfilled]: (state, action) => {
            state.authenticated = true;
            state.loading = false;
            state.user = action.payload;
            const {is_superuser, is_staff} = action.payload;
            if (is_superuser === true && is_staff === true) {
                state.role = 0; //admin
            } else if (is_superuser === false && is_staff === true) {
                state.role = 1; //moderator
            } else if (is_superuser === false && is_staff === false) {
                state.role = 2; //posjetilac
            } else {
                state.role = null;
            }
        },
        [status.pending]: (state) => {
            state.loading = true;
        },
        [status.rejected]: (state) => {
            state.authenticated = false;
            state.loading = false;
            state.authenticatedFailed = true;
            state.user = null;
        },
        [getStaffUser.fulfilled]: (state, action) => {
            state.authenticated = true;
            state.loading = false;
            state.staffs = action.payload;
        },
        [getStaffUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getStaffUser.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.authenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true;
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
        },

    }
});
export const {logout} = userSlice.actions
export default userSlice.reducer;
