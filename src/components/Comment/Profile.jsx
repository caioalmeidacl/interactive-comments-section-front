import { ProfileImage } from "../Login/Image";
import { Paragraph } from "./Paragraph";

export const Profile = ({ createdAt, profilePicture, username, isYou }) => {
    const onCreated = () => {
        if (!createdAt || isNaN(Date.parse(createdAt))) {
            return 'Now';
        }

        const millisecondsElapsed = Date.now() - Date.parse(createdAt);

        const seconds = Math.floor(millisecondsElapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} ${days > 1 ? 'days' : 'day'} ago`;
        if (hours > 0) return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
        if (minutes > 0) return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
        return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`;
    };

    return (
        <div className="flex w-full items-center">
            <ProfileImage profilePicture={profilePicture} />
            <div className='flex items-center'>
                <Paragraph className="font-semibold text-dark-blue mx-2" content={username} />
                {isYou && <Paragraph className='bg-moderate-blue text-md text-white font-semibold px-2' content={'you'} />}
            </div>
            <Paragraph className="ml-auto md:ml-4 text-[rgb(115,119,122)] font-normal" content={onCreated()} />
        </div>
    );
}  
