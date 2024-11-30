import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, createReply, getAllComments, updateScore as update } from '../../service/api';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await getAllComments();
        return response;
    }
);

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ content }, { rejectWithValue }) => {
        try {
            const response = await createComment(content);
            console.log(response);
            return response;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

export const addReply = createAsyncThunk(
    'comments/addReply',
    async ({ content, parentId }, { rejectWithValue }) => {
        try {
            const response = await createReply(content, parentId);
            return response;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

export const updateScore = createAsyncThunk(
    'comments/updateScoreComment',
    async ({ newScore, id }) => {
        return await update(newScore, id);
    }
);

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchComments.pending, state => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                console.log(action.payload);
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addReply.fulfilled, (state, action) => {
                const index = state.comments.findIndex(comment => String(comment._id) === String(action.payload.parentId));
                if(index !== -1) {
                    state.comments[index].replies = action.payload; 
                }
            })
            .addCase(addReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectComments = state => state.comments.comments;
export const commentsReducer = commentsSlice.reducer;

