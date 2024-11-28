import { useComment } from "../service/useComment";
import { useState, useEffect } from "react";
import { Comment } from "../components/Comment/Comment";
import { CommentForm } from "../components/Login/Form";

const InteractiveSection = () => {
    const { comments } = useComment();
    const [hierachicalComments, setHierachicalComments] = useState([]);
    const [replyingCommentId, setReplyingCommentId] = useState(null);

    const handleReply = (commentId) => {
        setReplyingCommentId(replyingCommentId === commentId ? null : commentId);
    };

    const buildHierachy = comments => {
        if (!Array.isArray(comments)) return [];

        const map = new Map();

        comments.forEach(comment => {
            map.set(comment._id, { ...comment, replies: [] });
        });

        const hierarchy = [];

        comments.forEach(comment => {
            if (comment.parentId) {
                const parent = map.get(comment.parentId);
                if (parent) {
                    parent.replies.push(map.get(comment._id));
                }
            } else {
                hierarchy.push(map.get(comment._id));
            }
        })

        return hierarchy;
    };


    const renderComments = (comment) => {
        return (
            <div key={comment._id}>
                <Comment
                    {...comment}
                    handleReply={handleReply}
                />
                {comment.replies?.length > 0 && (
                    <div className="border-l-2 border-light-gray max-w-[90%] ml-auto">
                        <div className="ml-8">
                            {comment.replies.map(renderComments)}
                        </div>
                    </div>
                )}

                {replyingCommentId === comment._id && (
                    <div className="mb-4">
                        <CommentForm value='Reply' parentId={comment._id} />
                    </div>
                )}
            </div>
        );
    };


    useEffect(() => {
        if (comments && comments.length > 0) {
            const commentsHierarchy = buildHierachy(comments);
            setHierachicalComments(commentsHierarchy);
        }
    }, [comments]);


    return (
        <div className="p-4">
            {hierachicalComments.length > 0 ? (
                <div>
                    {hierachicalComments.map(renderComments)}
                </div>
            ) : (
                <div></div>
            )}
            <CommentForm value='Send' />
        </div>
    );
};

export { InteractiveSection }