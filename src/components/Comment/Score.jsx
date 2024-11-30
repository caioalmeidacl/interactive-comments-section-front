import React, { useState } from "react";
import PlusIcon from '../../assets/images/icon-plus.svg';
import MinusIcon from '../../assets/images/icon-minus.svg';
import { useDispatch } from "react-redux";
import { updateScore } from "../../service/api";

export const Score = (props) => {
    const [score, setScore] = useState(props.score);
    const [isValid, setIsValid] = useState(true);

    const handleScoreChange = async (value, id) => {
        if (isValid) {
            const newScore = score + value;
            const dispatch = useDispatch();

            setScore(newScore);

            await dispatch(updateScore(newScore, id)).unwrap();
        }
    };

    return (
        <div className="flex justify-between items-center w-24 bg-light-gray p-2 rounded-md" >
            <div className="h-full flex items-center cursor-pointer"
                onClick={() => handleScoreChange(1, props.id)} >

                <img src={PlusIcon}
                    alt="Plus"
                    width={12}
                />

            </div>

            <p className="font-bold text-moderate-blue">{score}</p>

            <div className="h-full flex items-center cursor-pointer"
                onClick={() => handleScoreChange(-1, props.id)}>

                <img src={MinusIcon}
                    alt="Minus"
                    width={12}
                />
            </div>
        </div>
    );
}