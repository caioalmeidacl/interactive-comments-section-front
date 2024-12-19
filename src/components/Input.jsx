export const Input = ({ type, className, ...props }) => {
    const baseStyle = "focus:outline-none";
    const styles = {

    };


    return (
        <input
            type={type}
            {...props}
            className={`${baseStyle} border border-slate-400 p-2 bg-very-light-gray w-full mb-2 md:mb-4 ${className}`}
        />
    );
}

export const Textarea = ({ cols, rows, placeholder, className, ...props }) => {
    return (
        <textarea
            cols={cols}
            rows={rows}
            placeholder={placeholder}
            maxLength="95"
            {...props}
            className={`border border-slate-300 px-4 py-2 bg-white w-full resize-none rounded-md focus:outline-none ${className}`}
        />

    );
}

export const InputButton = ({ type, value, className, ...props }) => {
    const baseStyle = "flex items-center min-w-24 min-h-10 bg-moderate-blue text-white rounded-[5px] cursor-pointer outline-none hover:bg-opacity-45 transition";
    const additional = className ? className : '';

    return (
        <input
            type={type}
            value={value}
            className={`${baseStyle} ${additional}`}
            {...props}
        />
    );
}
