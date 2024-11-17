import { Title } from "./Title";
import { Form } from "./Form";
import { useState } from "react";
import { UserContext } from "../../App";

export const Sign = (props) => {
    const [user, setUser] = useState(null);
    return (
        <div className="bg-white rounded-md max-w-[80%] mx-auto p-10 mt-[-80px] relative z-20">
            <Title title={props.title} message={props.message} />
            <UserContext.Provider value={{ user, setUser}} >
                <Form title={props.title} />
            </UserContext.Provider>
        </div>
    );
}