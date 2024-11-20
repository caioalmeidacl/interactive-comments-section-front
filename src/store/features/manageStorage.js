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
