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


    const actionAndReply = (
        !isYou ? (
            <button onClick={() => handleReply(_id)} className='flex items-center text-blue-500 hover:text-blue-600'>
                <Reply />
            </button>
        ) : (
            <Actions commentId={_id} setIsEditing={setIsEditing} isEditing={isEditing} />
        )
    );

    return (
        <div className='w-full p-4 bg-white rounded-md mb-4'>
            <div className='flex flex-col md:flex-row md:items-start'>

                <div className='order-3 md:order-1 md:mr-6 max-w-fit'>
                    <Score score={score} id={_id} />
                </div>

                <div className='w-full order-1 md:order-2'>
                    <div className='flex md:items-center md:justify-between'>
                        <Profile profilePicture={user.profilePicture} username={user.username} createdAt={createdAt} isYou={isYou} />
                        <div className='hidden min-w-fit md:block'>
                            {actionAndReply}
                        </div>
                    </div>

                    <div>
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
                    </div>
                </div>


                <div className='relative top-8 order-2 ml-auto md:top-0 md:left-0 min-w-fit md:hidden'>
                    {actionAndReply}
                </div>
            </div>
        </div>
    );
};
