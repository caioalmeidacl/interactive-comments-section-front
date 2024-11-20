import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login as apiLogin, getUserInfo } from '../../service/api';

export const authenticateUser = createAsyncThunk(
    'user/authenticateUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const data = await apiLogin(username, password);
            localStorage.setItem('token', data.access_token);

            const userInfo = await getUserInfo();
            localStorage.setItem('user', JSON.stringify(userInfo));

            return { token: data.access_token, user: userInfo };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to authenticate user';
            });
    },
});


export const { logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentToken = (state) => state.user.token;