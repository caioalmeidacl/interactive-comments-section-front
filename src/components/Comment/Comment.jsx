import { Profile } from './Profile';
import { Paragraph } from './Paragraph';
import { Score } from './Score';
import { Reply } from './Reply';

export const Comment = ({ content, user, score, _id, createdAt, handleReply }) => {
    return (
        <>
            <div className='w-full p-4 bg-white rounded-md mb-4'>
                <Profile profilePicture={user.profilePicture} username={user.username} createdAt={createdAt} />

                <Paragraph content={content} />

                <div className='flex mt-5'>
                    <Score score={score} id={_id} />
                    <button onClick={() => handleReply(_id)} className='ml-auto'>
                        <Reply />
                    </button>
                </div>
            </div>
        </>
    );
};
