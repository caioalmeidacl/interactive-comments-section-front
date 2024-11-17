export const Input = (props) => {
    return (
        <input 
            type={props.type} 
            id={props.id} 
            {...props} 
            className="border border-slate-400 p-2 bg-very-light-gray w-full mb-2"
        />
    );
} 

export const InputButton = (props) => {
    return (
        <input 
            type={props.type} 
            value={props.value}
            {...props} 
            className="flex items-center min-w-24 min-h-10 bg-moderate-blue text-white ml-auto rounded-[5px] cursor-pointer"
        />
    );
}