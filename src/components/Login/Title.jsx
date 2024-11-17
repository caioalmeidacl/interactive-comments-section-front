import { Paragraph } from "../Comment/Paragraph";


export const Title = (props) => {
    return (
        <div className="w-full">
            <h1 className="text-4xl text-dark-blue font-bold">{props.title}</h1>
            <Paragraph content={props.message} />
        </div>
    );
}