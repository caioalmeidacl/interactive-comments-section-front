import { ProfileImage } from "../Login/Image";

export const Profile = (props) => {

    const createdAt = () => {
        if (!props.createdAt || isNaN(Date.parse(props.createdAt))) {
            return "Data inválida";
        }
    
        const millisecondsElapsed = Date.now() - Date.parse(props.createdAt);
    
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
            <ProfileImage image={props.image} />
            <p className="font-semibold text-dark-blue mx-4">{props.username}</p>
            <p className="ml-auto text-[rgb(115,119,122)] font-normal">{createdAt()}</p>
        </div>
    );
}  