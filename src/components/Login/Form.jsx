import React, { useEffect, useState } from 'react'; import { Input, InputButton, Textarea } from './Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateUser, signUpUser } from '../store/features/userSlice';
import { ProfileImage } from './Login/Image';
import { useAddComment, useAddReply } from '../service/useQueries';

export const CommentForm = ({ value, parentId, onSuccess }) => {
    const [position, setPosition] = useState(true);
    const [comment, setComment] = useState('');
    const { mutate: addComment } = useAddComment();
    const { mutate: addReply } = useAddReply();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!parentId) {
                addComment({ content: comment });
            } else {
                addReply({ content: comment, parentId: parentId });

                if (onSuccess) onSuccess();
            }
        } catch (error) {
            console.log('error ao adicionar comentario ' + error.message)
        }

        setComment('');
    };


    const content = (
        <form className='bg-white p-4' onSubmit={handleSubmit} >
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


export const SignForm = ({ type }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (type === 'in') {
                await dispatch(authenticateUser({ username, password })).unwrap();
            } else {
                await dispatch(signUpUser({ username, email, password })).unwrap();
            }
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSign = () => {

        if (type === 'up') {
            return (
                <>
                    <label id='username' className='font-light text-paragragh'>Username</label>
                    <Input type='text' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label id='email' className='font-light text-paragragh'>Email Address</label>
                    <Input type='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label id='password' className='font-light text-paragragh'>Password</label>
                    <Input type='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
            );
        }

        if (type === 'in') {
            return (
                <>
                    <label id='username' className='font-light text-paragragh'>Username</label>
                    <Input type='text' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label id='password' className='font-light text-paragragh'>Password</label>
                    <Input type='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
            );
        }
    }

    const content = (
        <form className='flex flex-col' onSubmit={handleSubmit} >
            {handleSign()}

            <div className='w-full fixed bottom-0 left-0 bg-white p-2 md:relative md:bg-inherit md:p-0 md:mt-2'>
                <InputButton type='submit' value='Submit' />
            </div>

        </form>
    );


    return content;
};
