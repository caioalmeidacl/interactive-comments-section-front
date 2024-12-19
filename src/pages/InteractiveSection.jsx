import React, { useState, useEffect } from "react";
import { CommentForm } from "../components/Form";
import { CommentTree } from "../components/Comment/CommentTree";
import { CommentError } from "../components/Error";
import { useFetchComments } from "../service/useQueries";

const InteractiveSection = () => {
    const [hierachicalComments, setHierachicalComments] = useState([]);
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const { data: comments, isLoading, isError, error } = useFetchComments();

    useEffect(() => {
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
        <div className="p-4 max-w-2xl mx-auto">
            {isLoading && <p>carregando</p>}

            {hierachicalComments.length > 0 && (
                <CommentTree
                    comments={buildHierarchy(comments)}
                    replyingCommentId={replyingCommentId}
                    handleReply={handleReply}
                    onReplySuccess={handleOnSuccess}
                />
            )}

            {isError && <CommentError message={error.message} />}

            <CommentForm
                value="Send"
                onSuccess={handleOnSuccess}
            />
        </div>
    );
};

export { InteractiveSection };
