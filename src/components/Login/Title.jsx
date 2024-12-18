import { Paragraph } from "../Comment/Paragraph";


export const Title = ({ title, message }) => {
    return (
        <div className="w-full">
            <h1 className="text-4xl text-dark-blue font-bold">{title}</h1>
            <Paragraph content={message} className='my-4' />
        </div>
    );
}
