import { Title } from "./Title";
import { Form } from "./Form";

export const Sign = (props) => { 
    return (
        <div className="bg-white rounded-md max-w-[80%] mx-auto p-10 mt-[-80px] relative z-20">
            <Title title={props.title} message={props.message} />
            <Form title={props.title} />
        </div>
    );
}