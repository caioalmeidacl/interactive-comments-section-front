import { useEffect, useState } from "react"
import { createComment, createReply, getAllComments, updateScore as update } from "./api";
import { getUser } from "../store/features/manageStorage";
import { selectCurrentUser } from "../store/features/userSlice";
import { useSelector } from "react-redux";

const useComment = () => {
    const [comments, setComments] = useState([]);
    const currentUser = useSelector(selectCurrentUser);

    const getComments = async () => {
        try { 
            const comments = await getAllComments();
            setComments(comments);
        } catch(error) {
            setComments([]);
            throw error;
        }
    };

    const postComment = async (comment) => { 
        try {
            if(currentUser) await createComment(comment);
        } catch(error) {
            throw error;
        } 
    }


    const postReply = async (reply, parentId) => { 
        try {
            if(currentUser) await createReply(reply, parentId);
        } catch(error) {
            throw error;
        } 
    }
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

    return { comments, updateScore, postComment, postReply };
}

export { useComment }