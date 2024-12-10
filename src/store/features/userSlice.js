import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login as apiLogin, getUserInfo, signUp } from '../../service/api';
import { setToken, clearStorage, setUser, getToken, getUser } from './manageStorage';

export const authenticateUser = createAsyncThunk(
    'user/authenticateUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const data = await apiLogin(username, password);
            setToken(data.access_token);

            const userInfo = await getUserInfo();
            setUser(JSON.stringify(userInfo));

            return { token: data.access_token, user: userInfo };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'user/signup',
    async ({ username, email, password }, { dispatch, rejectWithValue }) => {
        try {
            await signUp(username, email, password);

            const result = await dispatch(authenticateUser({ username, password })).unwrap();

            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: getUser() || null,
    token: getToken() || null,
    loading: false,
    error: null,
}

export const logOut = () => {
    clearStorage();
    return { ...initialState };
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
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
                if (state) {
                    state.loading = false;
                    state.error = action.payload || 'Failed to authenticate user';
                }
            })
            .addCase(signUpUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, state => {
                state.loading = false;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to sign up';
            })
    },
});

export default userSlice.reducer;
export const selectCurrentUser = state => state.user.user;
export const selectCurrentToken = state => state.user.token;
export const selectCurrentError = state => state.user.error;
