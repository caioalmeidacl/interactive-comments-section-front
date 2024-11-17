import { Sign } from "../components/Login/Sign";
import { Image } from "../components/Login/Image"

export const Login = () => {
    return (
        <div>
            <Image screen={true} />
            <Sign title="Login" message="Please provide your username and password" />
        </div>

    );
}