import { useComment } from "../service/useComment";
import { Comment } from "../components/Comment/Comment";

const InteractiveSection = () => {
    const { comment } = useComment();

    return (
        <div>
            {comment.map((props, index ) => (
                <Comment key={index} {...props} />
            ))}
        </div>
    );
};

export { InteractiveSection }