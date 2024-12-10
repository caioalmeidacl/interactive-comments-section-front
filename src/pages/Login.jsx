import { Sign } from "../components/Login/Sign";
import { Image } from "../components/Login/Image"

export const Login = () => {
    return (
        <div className="h-screen md:flex md:items-center">
            <div className="md:flex md:p-4 md:mx-auto md:h-fit md:w-fit md:bg-white md:rounded-md">
                <Image screen={false} />
                <Sign />
            </div>
        </div>

    );
}
