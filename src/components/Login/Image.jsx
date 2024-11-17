import { useState } from "react";
import MobileImage from "../../assets/images/bg-sidebar-mobile.svg";
import DesktopImage from "../../assets/images/bg-sidebar-desktop.svg";
import defaultProfilePic from "../../assets/avatars/image-juliusomo.png"

export const Image = (props) => {
    const [screen, setScreen] = useState(props.screen);
    return (
        <img
            src={screen ? MobileImage : DesktopImage}
            alt="Image"
            className="object-cover z-10 w-full relative"
        />
    );
};

export const ProfileImage = (props) => {
    return (
        <img src={defaultProfilePic} 
            alt="ProfilePicture"
            width={40}
            className="rounded-full object-contain"
        />
    );
};