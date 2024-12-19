import { useEffect, useState } from "react";
import MobileImage from "../../assets/images/bg-sidebar-mobile.svg";
import DesktopImage from "../../assets/images/bg-sidebar-desktop.svg";
import defaultProfilePicture from '../../assets/avatars/defaultProfilePicture.png'

export const Image = () => {
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

export const ProfileImage = ({ className = '', width = 30, profilePicture }) => {
    return (
        <img
            src={profilePicture || defaultProfilePicture}
            alt="Profile Picture"
            width={width}
            className={`rounded-full object-cover ${className}`}
        />
    );
};


export const IconImage = ({ image, className, ...rest }) => {
    return (
        <img
            src={image}
            alt='Icon'
            className={`object-contain w-3 ${className}`}
            {...rest}
        />
    );
}
