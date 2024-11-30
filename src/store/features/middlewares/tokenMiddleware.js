import { isTokenExpired } from "../manageStorage";
import { logOut } from "../userSlice";

let isLogginOut = false;

// ver se da para resolver com o subscribe(listener)

const tokenMiddleware = store => next => action => {
    const state = store.getState();
    const token = state.user?.token;
    
    if (token && isTokenExpired(token)) {
        if (!isLogginOut) {
            isLogginOut = true;
            store.dispatch(logOut());
            isLogginOut = false;
            console.log(state);
            
        };

        return;
    }

    return next(action);
};

export default tokenMiddleware;
