import React, { useEffect, useState } from 'react';
import { Input, InputButton, Textarea } from './Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, selectCurrentProfilePicture, signUpUser } from '../store/features/userSlice';
import { ProfileImage } from './Login/Image';
import { useAddComment, useAddReply, useUpdateComment } from '../service/useQueries';

export const CommentForm = ({ value, parentId, onSuccess, isEditing, id, setIsEditing, previousContent }) => {
    const profilePicture = useSelector(selectCurrentProfilePicture);
    const [position, setPosition] = useState(true);
    const [comment, setComment] = useState(previousContent ? previousContent : '');
    const { mutate: addComment } = useAddComment();
    const { mutate: addReply } = useAddReply();
    const { mutate: updateComment } = useUpdateComment();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                updateComment({ content: comment, id });
                setIsEditing(false)
            } else {
                if (!parentId) {
                    addComment({ content: comment });
                } else if (parentId) {
                    addReply({ content: comment, parentId: parentId });

                    if (onSuccess) onSuccess();
                }
            }
        } catch (error) {
            console.log(error.message);
        }

        setComment('');
    };

    const content = (
        <form className={`bg-white ${!isEditing ? 'p-4' : 'mt-4 '}`} onSubmit={handleSubmit} >
            <div className={`flex flex-col ${!isEditing && 'md:flex-row'} items-start`}>
                {!isEditing && (position ? <ProfileImage profilePicture={profilePicture} /> : null)}


                {!isEditing && (
                    <Textarea
                        placeholder={'Add a comment...'}
                        rows={3}
                        className='mb-4 md:mb-0 md:mx-4'
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                )}

                {isEditing && (
                    <Textarea
                        rows={3}
                        className='mb-4'
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                )}

                <div className='flex items-center w-full md:w-auto ml-auto'>
                    {!isEditing && (!position ? <ProfileImage profilePicture={profilePicture} /> : null)}

                    <InputButton
                        type='submit'
                        className='uppercase font-semibold ml-auto'
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


export const SignForm = ({ type, handleChangeSignType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (type === 'in') {
                await dispatch(authenticateUser({ username, password })).unwrap();
            } else {
                await dispatch(signUpUser({ username, email, password, profilePicture })).unwrap();
            }
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Image = reader.result;
            setProfilePicture(base64Image);
        }

        if (file) reader.readAsDataURL(file);
    }

    const handleSign = () => {

        if (type === 'up') {
            return (
                <>
                    <div className='flex items-center mb-2 md:mb-4'>
                        <ProfileImage profilePicture={profilePicture} width={50} />
                        <label
                            htmlFor='file-upload'
                            className='border border-slate-400 p-2 bg-very-light-gray ml-auto min-w-[80%] cursor-pointer font-light text-paragragh'
                        >
                            Import your Profile Picture
                        </label>
                        <Input
                            type="file"
                            id='file-upload'
                            accept="image/*"
                            onChange={handleImageUpload}
                            className='hidden'
                        />
                    </div>

                    <label htmlFor='username' className='font-light text-paragragh'>Username</label>
                    <Input type='text' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor='email' className='font-light text-paragragh'>Email Address</label>
                    <Input type='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor='password' className='font-light text-paragragh'>Password</label>
                    <Input type='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
            );
        }

        if (type === 'in') {
            return (
                <>
                    <label htmlFor='username' className='font-light text-paragragh'>Username</label>
                    <Input type='text' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor='password' className='font-light text-paragragh'>Password</label>
                    <Input type='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
            );
        }
    }

    const content = (
        <form className='flex flex-col' onSubmit={handleSubmit} >
            {handleSign()}

            <div className='w-full fixed bottom-0 left-0 bg-white p-2 md:relative md:bg-inherit md:p-0 md:mt-2 flex'>
                {type === 'in' && <InputButton type='button' value='Sign Up' onClick={handleChangeSignType} className='bg-soft-red mr-auto' />}
                {type === 'up' && <InputButton type='button' value='Back' onClick={handleChangeSignType} className='mr-auto' />}
                <InputButton type='submit' value={`Sign ${type}`} className='ml-auto' />
            </div>

        </form>
    );


    return content;
};
