import { Title } from "./Title";
import { SignForm } from "../Form";
import { useEffect, useState } from "react";
import { SignError } from "../Error";
import { useSelector } from "react-redux";
import { selectCurrentError } from "../../store/features/userSlice";

export const Sign = () => {
    const [title, setTitle] = useState('Sign In');
    const [message, setMessage] = useState('Please provide your username and password.');
    const [signType, setSignType] = useState('in');
    const [error, setError] = useState(null);
    const errorCaptured = useSelector(selectCurrentError)

    useEffect(() => {
        setError(errorCaptured);
    }, [errorCaptured]);

    const handleChangeSignType = () => {
        if (signType === 'in') {
            setMessage('Please provide the following informations to sign up.');
            setSignType('up');
            setTitle('Sign Up');
            setError(null);
        } else {
            setMessage('Please provide your username and password.');
            setSignType('in');
            setTitle('Sign In');
            setError(null);
        }
    }

    return (
        <div className="bg-white rounded-md min-w-[80%] w-4/5 max-w-full mx-auto p-10 mt-[-80px] relative z-20 md:m-0 md:min-w-72 md:min-h-full">
            <Title title={title} message={message} />

            {error && <SignError message={error || 'Username or password is incorrect'} />}

            <SignForm type={signType} handleChangeSignType={handleChangeSignType} />

        </div>
    );
}
