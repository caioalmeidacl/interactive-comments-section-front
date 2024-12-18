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

        if (days > 0) return `${days} day(s) ago`;
        if (hours > 0) return `${hours} hour(s) ago`;
        if (minutes > 0) return `${minutes} minute(s) ago`;
        return `${seconds} second(s) ago`;
    };

    return (
        <div className="flex w-full items-center">
            <ProfileImage profilePicture={profilePicture} />
            <div className='flex items-center'>
                <Paragraph className="font-semibold text-dark-blue mx-4" content={username} />
                {isYou && <Paragraph className='bg-moderate-blue text-md text-white font-semibold px-2 ' content={'you'} />}
            </div>
            <Paragraph className="ml-auto text-[rgb(115,119,122)] font-normal" content={onCreated()} />
        </div>
    );
}  
