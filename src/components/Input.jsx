export const Input = (props) => {
    const baseStyle = "focus:outline-none";
    const styles = {

    };


    return (
        <input 
            type={props.type} 
            {...props} 
            className={`border border-slate-400 p-2 bg-very-light-gray w-full mb-2 md:mb-4 ${props.className}`}
        />
    );
} 

export const Textarea = (props) => {
    return (
        <textarea 
            cols={props.cols} 
            rows={props.rows} 
            placeholder={props.placeholder}
            maxLength="95"
            required
            className={`border border-slate-300 px-4 py-2 bg-white w-full resize-none rounded-md focus:outline-none md:mx-2 ${props.className}`}
        />
    
    );

}


export const InputButton = (props) => {
    return (
        <input 
            type={props.type} 
            value={props.value}
            {...props} 
            className={`flex items-center min-w-24 min-h-10 bg-moderate-blue text-white ml-auto rounded-[5px] cursor-pointer ${props.className}`}
        />
    );
}