import { Profile } from './Profile';
import { Paragraph } from './Paragraph';
import { Score } from './Score';
import { Reply } from './Reply';

export const Comment = (props) => { 
    return (
        <>
            <div className='w-full p-4 bg-white rounded-md mb-4'>
                <Profile image={props.image} username={props.user.username} createdAt={props.createdAt} />

                <Paragraph content={props.content}/>

                <div className='flex mt-5'>
                    <Score score={props.score} id={props._id} />
                    <button onClick={() => props.handleReply(props._id)}  className='ml-auto'>
                        <Reply />
                    </button>
                </div>
            </div>
        </>
    );
};