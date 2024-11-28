import { useEffect, useState } from "react";
import MobileImage from "../../assets/images/bg-sidebar-mobile.svg";
import DesktopImage from "../../assets/images/bg-sidebar-desktop.svg";
import defaultProfilePic from "../../assets/avatars/image-juliusomo.png"

export const Image = (props) => {
    const [screen, setScreen] = useState(MobileImage);

    useEffect(() => {
        const updateScreen = () => {
            if (window.innerWidth >= 768) {
                setScreen(DesktopImage);
            } else {
                setScreen(MobileImage);
            }
        }

        updateScreen();

        window.addEventListener('resize', updateScreen);

        return () => window.removeEventListener('resize', updateScreen);
    }, []);

    return (
        <img
            src={screen}
            alt="Image"
            className="object-cover w-full md:w-auto relative z-10"
        />
    );
};

export const ProfileImage = (props) => {
    return (
        <img src={defaultProfilePic}
            alt="ProfilePicture"
            width={40}
            className={`rounded-full object-contain ${props.className}`}
        />
    );
};