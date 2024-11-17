import { useEffect, useState } from "react"
import { getAllComments } from "./api";

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

    useEffect(() => {
        getComments();
    }, [])

    return { comment }
}

export { useComment }