import { Profile } from './Profile';
import { Paragraph } from './Paragraph';
import { Score } from './Score';
import { Reply } from './Reply';
import { getUser } from '../../store/features/manageStorage';
import { Actions } from './Actions';
import { CommentForm } from '../Form';
import { useState } from 'react';

export const Comment = ({ content, user, score, _id, createdAt, handleReply }) => {
    const [isEditing, setIsEditing] = useState(false);
    const userLogged = getUser();
    const isYou = user.username === userLogged.username;

    return (
        <>
            <div className='w-full p-4 bg-white rounded-md mb-4'>
                <Profile profilePicture={user.profilePicture} username={user.username} createdAt={createdAt} isYou={isYou} />

                {isEditing ? (
                    <CommentForm
                        value="Update"
                        id={_id}
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                        previousContent={content}
                    />
                ) : (
                    <Paragraph content={content} className={'my-4'} />
                )}

                <div className='flex mt-5 '>
                    <Score score={score} id={_id} />
                    {!isYou ? (
                        <button onClick={() => handleReply(_id)} className='ml-auto'>
                            <Reply />
                        </button>
                    ) : (
                        <Actions commentId={_id} setIsEditing={setIsEditing} />
                    )}
                </div>
            </div>
        </>
    );
};
