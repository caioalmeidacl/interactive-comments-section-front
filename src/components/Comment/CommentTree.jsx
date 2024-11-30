import { CommentForm } from "../Login/Form";
import { Comment } from "./Comment";

export const CommentTree = ({ comments, replyingCommentId, handleReply, onReplySuccess }) => {
    return comments.map(comment => (
        <div key={comment._id}>
            <Comment
                {...comment}
                handleReply={handleReply}
            />
            {comment.replies?.length > 0 && (
                <div className="border-l-2 border-light-gray max-w-[90%] ml-auto">
                    <div className="ml-8">
                        <CommentTree
                            comments={comment.replies}
                            replyingCommentId={replyingCommentId}
                            handleReply={handleReply}
                            onReplySuccess={onReplySuccess}
                        />
                    </div>
                </div>
            )}

            {replyingCommentId === comment._id && (
                <div className="mb-4 max-w-[90%] ml-auto border-l-2 border-light-gray">
                    <div className="ml-8">
                        <CommentForm
                            value="Reply"
                            parentId={comment._id}
                            onSuccess={onReplySuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    ));
};
