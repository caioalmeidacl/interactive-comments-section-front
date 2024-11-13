export const Profile = (props) => {
    return (
        <div className="flex w-full items-center">
            <img src={props.image}  
                alt=""
                width={40}
                className="rounded-full object-contain"
            />
            <p className="font-semibold text-dark-blue mx-4">{props.username}</p>
            <p className="ml-auto text-[rgb(115,119,122)] font-normal">{props.createdAt}</p>
        </div>
    );
}  