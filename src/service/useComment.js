import { useEffect, useState } from "react"
import { getAllComments, updateScore as update } from "./api";

const useComment = () => {
    const [comment, setComments] = useState([]);

    const getComments = async () => {
        try { 
            const comments = await getAllComments();
            setComments(comments);
        } catch(error) {
            setComments([]);
            throw error;
        }
    };

    const updateScore = async (newScore, id) => {
       try {
        await update(newScore, id);
       } catch(error) {
        throw error;
       }
    };

    useEffect(() => {
        getComments();
    }, [])

    return { comment, updateScore };
}

export { useComment }