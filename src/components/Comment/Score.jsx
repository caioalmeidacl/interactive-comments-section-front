import React, { useState } from "react";
import PlusIcon from '../../assets/images/icon-plus.svg';
import MinusIcon from '../../assets/images/icon-minus.svg';
import { useGetLikedCommentsByMe, useUpdateScore } from "../../service/useQueries";
import { IconImage } from "../Login/Image";

export const Score = ({ score, id }) => {
    const [commentScore, setCommentScore] = useState(score);
    const { mutate: updateScore } = useUpdateScore();
    const { data: likedComments } = useGetLikedCommentsByMe();

    const handleScoreChange = (e) => {
        try {
            let newScore = commentScore;

            const hasLiked = likedComments.includes(id);

            if (e.target.alt === 'Plus' && !hasLiked) {
                newScore = commentScore + 1;
            }

            if (e.target.alt === 'Minus' && hasLiked) {
                newScore = commentScore - 1;
            }

            if (newScore !== commentScore) {
                updateScore({ score: newScore, id, hasLiked });
                setCommentScore(newScore);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-between items-center w-24 bg-light-gray p-2 rounded-md md:flex-col md:max-w-8 md:min-h-24" >
            <div className="h-full flex items-center cursor-pointer">
                < IconImage
                    image={PlusIcon}
                    alt="Plus"
                    width={14}
                    onClick={handleScoreChange}
                />
            </div >

            <p className="font-bold text-moderate-blue">{commentScore}</p>

            <div className="h-full flex items-center" >
                <IconImage
                    image={MinusIcon}
                    alt="Minus"
                    width={16}
                    className="cursor-pointer"
                    onClick={handleScoreChange}
                />
            </div>
        </div >
    );
}
