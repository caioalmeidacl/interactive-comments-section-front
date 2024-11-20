import React, { useState } from 'react';
import { Input, InputButton } from '../Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../store/features/userSlice';

export const Form = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title = props.title;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await dispatch(authenticateUser({ username, password})).unwrap();
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const content = (
        <form className='flex flex-col'
            onSubmit={handleLogin}
        >
            {title === 'Register' ? (
                <>
                    <label id='username' className='font-light text-paragragh'>Username</label>
                    <Input type='text' id='username' required />

                    <label id='email' className='font-light text-paragragh'>Email Address</label>
                    <Input type='email' id='email' required />

                    <label id='password' className='font-light text-paragragh'>Password</label>
                    <Input type='password' id='password' required />
                </>
            ) : (
                <>
                    <label id='username' className='font-light text-paragragh'>Username</label>
                    <Input type='text' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label id='password' className='font-light text-paragragh'>Password</label>
                    <Input type='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
            )}

            <div className='w-full fixed bottom-0 left-0 bg-white p-2'>
                <InputButton type='submit' value='Submit' />
            </div>

        </form>
    );


    return content;
};