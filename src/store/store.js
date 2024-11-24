import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenMiddleware from './features/middlewares/tokenMiddleware';
import { createPersistedReducer } from './persistReducer';
import userReducer from './features/userSlice';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    user : userReducer,
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