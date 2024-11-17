import { useState } from "react"
import { login as apiLogin, getUserInfo } from "./api";

const useLogin = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password) => {

        try {
            const data = await apiLogin(username, password);
            localStorage.setItem('token', data.access_token);

            const userInfo = await getUserInfo();
            localStorage.setItem('user', JSON.stringify(userInfo));

            setUserInfo(userInfo);
            setIsLoggedIn(true);
        } catch(error) {
            setUserInfo(null);
            throw error;
        }
    };

    return { userInfo, isLoggedIn, login };
}

export { useLogin };