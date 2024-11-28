import IconReply from '../../assets/images/icon-reply.svg';

export const Reply = (props) => {
    return (
        <div className='flex items-center cursor-pointer'>
            <img src={IconReply} alt='Reply' className='object-contain w-3'/>
            <h1 className='font-semibold text-moderate-blue text-paragragh ml-1'>Reply</h1>
        </div>
    );
};