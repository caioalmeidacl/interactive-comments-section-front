import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'; 

export const createPersistedReducer = (baseReducer) => {
    const persistConfig = {
        key: 'root',
        storage
    };

    return persistReducer(persistConfig, baseReducer);    
}