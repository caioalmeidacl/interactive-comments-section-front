import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenMiddleware from './features/middlewares/tokenMiddleware';
import { createPersistedReducer } from './persistReducer';
import userReducer from './features/userSlice';
import { persistStore } from 'redux-persist';
import { commentsReducer } from './features/commentsSlice';

const rootReducer = combineReducers({
    user: userReducer,
    comments: commentsReducer,
});

const persistedReducer = createPersistedReducer(rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(tokenMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
