import React from "react";
import PlusIcon from '../../assets/images/icon-plus.svg';
import MinusIcon from '../../assets/images/icon-minus.svg';

export const Score = (props) => {
    return (
        <div className="flex justify-between items-center w-24 bg-light-gray p-2 rounded-md">
            <img src={PlusIcon}
                alt="Plus"
                width={12}
                className="cursor-pointer"
            />

            <p className="font-bold text-moderate-blue">{props.score}</p>

            <img src={MinusIcon} 
                alt="Minus"
                width={12}
                className="cursor-pointer"
            />
        </div>
    );
}