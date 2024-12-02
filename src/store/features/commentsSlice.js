import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
});

export const selectComments = state => state.comments.comments;
export const commentsReducer = commentsSlice.reducer;

