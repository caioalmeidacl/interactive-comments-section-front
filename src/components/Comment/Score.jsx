import React, { useEffect, useState } from "react";
import PlusIcon from '../../assets/images/icon-plus.svg';
import MinusIcon from '../../assets/images/icon-minus.svg';
import { useGetLikedCommentsByMe, useUpdateScore } from "../../service/useQueries";

export const Score = ({ score, id }) => {
    const [commentScore, setCommentScore] = useState(score);
    const { mutate: updateScore } = useUpdateScore();
    const { data: likedComments } = useGetLikedCommentsByMe();

    const handleScoreChange = (e) => {
        try {
            let newScore = commentScore;
            let action = true;

            const hasLiked = likedComments.includes(id);

            if (e.target.alt === 'Plus' && !hasLiked) {
                newScore = commentScore + 1;
                action = true;
            }

            if (e.target.alt === 'Minus' && hasLiked) {
                newScore = commentScore - 1;
                action = false;
            }

            if (newScore !== score) {
                updateScore({ score: newScore, id, action });
                setCommentScore(newScore);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-between items-center w-24 bg-light-gray p-2 rounded-md" >
            <div className="h-full flex items-center cursor-pointer">
                <img src={PlusIcon}
                    alt="Plus"
                    width={14}
                    onClick={handleScoreChange}
                />
            </div>

            <p className="font-bold text-moderate-blue">{commentScore}</p>

            <div className="h-full flex items-center" >
                <img src={MinusIcon}
                    alt="Minus"
                    width={16}
                    className="cursor-pointer"
                    onClick={handleScoreChange}
                />
            </div>
        </div>
    );
}
