import { Title } from "./Title";
import { Form } from "./Form";

export const Sign = (props) => { 
    return (
        <div className="bg-white rounded-md min-w-[80%] w-4/5 max-w-full mx-auto p-10 mt-[-80px] relative z-20 md:m-0 md:min-w-72 md:min-h-full">
            <Title title={props.title} message={props.message} />
            <Form title={props.title} />
        </div>
    );
}