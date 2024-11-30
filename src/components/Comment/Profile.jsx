import { ProfileImage } from "../Login/Image";

export const Profile = ({ createdAt, image, username }) => {

    const handleCreated = () => {
        if (!createdAt || isNaN(Date.parse(createdAt))) {
            return 'Now';
        }
    
        const millisecondsElapsed = Date.now() - Date.parse(createdAt);
    
        const seconds = Math.floor(millisecondsElapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) return `${days} dia(s) atrás`;
        if (hours > 0) return `${hours} hora(s) atrás`;
        if (minutes > 0) return `${minutes} minuto(s) atrás`;
        return `${seconds} segundo(s) atrás`;
    };

    return (
        <div className="flex w-full items-center">
            <ProfileImage image={image} />
            <p className="font-semibold text-dark-blue mx-4">{username}</p>
            <p className="ml-auto text-[rgb(115,119,122)] font-normal">{handleCreated()}</p>
        </div>
    );
}  