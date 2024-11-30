import React, { useState, useEffect } from "react";
import { CommentForm } from "../components/Login/Form";
import { CommentTree } from "../components/Comment/CommentTree";
import { useDispatch, useSelector } from "react-redux";
import { selectComments, fetchComments } from "../store/features/commentsSlice";

const InteractiveSection = () => {
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const [hierachicalComments, setHierachicalComments] = useState([]);
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const [triggerFetch, setTriggerFetch] = useState(true);

    useEffect(() => {
        if (triggerFetch) {
            dispatch(fetchComments()).unwrap();
            setTriggerFetch(false);
        }
    }, [dispatch, triggerFetch]);

    useEffect(() => {
        if (comments && comments.length > 0) {
            setHierachicalComments(buildHierarchy(comments));
        }
    }, [comments]);

    const handleOnSuccess = () => {
        setReplyingCommentId(null);
        setTriggerFetch(true);
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
                    comments={hierachicalComments}
                    replyingCommentId={replyingCommentId}
                    handleReply={handleReply}
                    onReplySuccess={handleOnSuccess}
                />
            ) : (
                <span></span>
            )}
            <CommentForm value="Send" onSuccess={handleOnSuccess} />
        </div>
    );
};

export { InteractiveSection };
