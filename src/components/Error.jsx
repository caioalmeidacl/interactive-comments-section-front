import { Paragraph } from "./Comment/Paragraph";

export const SignError = ({ message }) => {
    return (
        <div className='bg-pale-red'>
            <Paragraph
                content={message}
                className='text-center text-red-500 py-2'
            />
        </div>
    );
}

export const CommentError = ({ message }) => {
    return (
        <div className='bg-pale-red'>
            <Paragraph
                content={message}
                className='text-center text-red-500 py-2'
            />
        </div>
    );
}
