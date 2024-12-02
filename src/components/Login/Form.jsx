import React, { useEffect, useState } from 'react';
import { Input, InputButton, Textarea } from '../Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../store/features/userSlice';
import { ProfileImage } from './Image';

export const CommentForm = ({ value, parentId, onSuccess, addComment, addReply}) => {
    const [position, setPosition] = useState(true);
    const [comment, setComment] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();

        try {
            if (!parentId) {
                await addComment({ content: comment });
            } else {
                await addReply({ content: comment, parentId });
                if(onSuccess) onSuccess();
            }
        } catch (error) {
            console.log('error ao adicionar comentario ' + error.message)
        }

        setComment('');
    };


    const content = (
        <form className='bg-white p-4' onSubmit={handleSend}>
            <div className='flex flex-col md:flex-row items-start'>
                {position ? <ProfileImage /> : <></>}

                <Textarea
                    placeholder='Add a comment...'
                    rows={3}
                    className='mb-4 md:mb-0'
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />


                <div className='flex items-center w-full md:w-auto'>
                    {!position ? <ProfileImage /> : <></>}

                    <InputButton
                        type='submit'
                        className='uppercase font-semibold'
                        value={value}
                    />
                </div>

            </div>
        </form>
    );

    useEffect(() => {
        const updatePositon = () => {
            if (window.innerWidth >= 768) {
                setPosition(true);
            } else {
                setPosition(!position);
            }
        }

        updatePositon();

        window.addEventListener('resize', updatePositon);

        return () => window.removeEventListener('resize', updatePositon);
    }, []);

    return content;
}


export const Form = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title = props.title;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(authenticateUser({ username, password })).unwrap();
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const content = (
        <form className='flex flex-col'
            onSubmit={handleSubmit}
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

            <div className='w-full fixed bottom-0 left-0 bg-white p-2 md:relative md:bg-inherit md:p-0 md:mt-2'>
                <InputButton type='submit' value='Submit' />
            </div>

        </form>
    );


    return content;
};