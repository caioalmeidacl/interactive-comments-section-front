import React, { useState, useEffect } from "react";
import { CommentForm } from "../components/Login/Form";
import { CommentTree } from "../components/Comment/CommentTree";
import { useFetchComments, useAddComment, useAddReply } from "../service/useQuery";

const InteractiveSection = () => {
    const [hierachicalComments, setHierachicalComments] = useState([]);
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    
    // useQuery 
    const comments = useFetchComments();
    const { mutate: addComment, isAddingComment } = useAddComment();
    const { mutate: addReply, isAddingReply } = useAddReply();
    
    useEffect(() => {
        console.log(comments);
        if (comments && comments.length > 0) {
            setHierachicalComments(buildHierarchy(comments));
        }
    }, [comments]);

    const handleOnSuccess = () => {
        setReplyingCommentId(null);
    };

    const handleReply = (commentId) => {
        setReplyingCommentId(replyingCommentId === commentId ? null : commentId);
    };

    const buildHierarchy = (comments) => {
        if (!Array.isArray(comments)) return [];

        const map = new Map();
        const hierarchy = [];

        comments.forEach(comment => map.set(comment._id, { ...comment, replies: [] }));

        comments.forEach(comment => {
            if (comment.parentId) {
                const parent = map.get(comment.parentId);
                if (parent) parent.replies.push(map.get(comment._id));
            } else {
                hierarchy.push(map.get(comment._id));
            }
        });
        return hierarchy;
    };

    return (
        <div className="p-4">
            {hierachicalComments.length > 0 ? (
                <CommentTree
                    comments={buildHierarchy(comments)}
                    replyingCommentId={replyingCommentId}
                    handleReply={handleReply}
                    onAddReply={addReply}
                    onReplySuccess={handleOnSuccess}
                />
            ) : (
                <span></span>
            )}
            <CommentForm 
                value="Send" 
                onSuccess={handleOnSuccess} 
                addComment={addComment}
            />
        </div>
    );
};

export { InteractiveSection };
