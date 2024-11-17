import React, { useEffect, useState } from "react";
import { Input, InputButton } from "../Input";
import { useLogin } from "../../service/useLogin";
import { useNavigate } from "react-router-dom";

export const Form = (props) => {
    const { userInfo, isLoggedIn, login } = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const title = props.title;


    const handleLogin = async () => {
        try {
            await login(username, password);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if(isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn, navigate]);


    return (
        <form
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}
        >
            {title === "Register" ? (
                <>
                    <label id="username" className="font-light text-paragragh">Username</label>
                    <Input type="text" id="username" required />

                    <label id="email" className="font-light text-paragragh">Email Address</label>
                    <Input type="email" id="email" required />

                    <label id="password" className="font-light text-paragragh">Password</label>
                    <Input type="password" id="password" required />
                </>
            ) : (
                <>
                    <label id="username" className="font-light text-paragragh">Username</label>
                    <Input type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label id="password" className="font-light text-paragragh">Password</label>
                    <Input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
            )}

            <div className="w-full fixed bottom-0 left-0 bg-white p-2">
                <InputButton type="button" value="Submit" onClick={handleLogin} />
            </div>

        </form>
    );
};