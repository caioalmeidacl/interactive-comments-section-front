import IconReply from '../../assets/images/icon-reply.svg';

export const Reply = () => {
    return (
        <div className="flex ml-auto items-center cursor-pointer">
            <img src={IconReply} alt="Reply" className='object-contain w-3'/>
            <h1 className="font-semibold text-moderate-blue text-paragragh ml-1">Reply</h1>
        </div>
    );
};