import IconReply from '../../assets/images/icon-reply.svg';
import { IconImage } from '../Login/Image';

export const Reply = () => {
    return (
        <div className='flex items-center cursor-pointer'>
            <IconImage image={IconReply} />
            <h1 className='font-semibold text-moderate-blue text-paragragh ml-1'>Reply</h1>
        </div>
    );
};
