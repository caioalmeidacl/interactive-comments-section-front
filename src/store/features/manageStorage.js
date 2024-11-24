import { jwtDecode } from "jwt-decode";

export const setToken = (token) => localStorage.setItem('token', token);

export const getToken = () => {
    const token = localStorage.getItem('token')
    return token ? token : null;
};

export const setUser = (user) => localStorage.setItem('user', user);

export const getUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null;
};

export const clearStorage = () => localStorage.clear();

export const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;
}
