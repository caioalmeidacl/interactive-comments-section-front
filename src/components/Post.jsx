import { Profile } from "./Profile";
import { PostText } from "./PostText";
import { Score } from "./Score";
import { Reply } from "./Reply";

export const Post = (props) => { 
    return (
        <div className="w-full p-4 bg-white rounded-md">
            <Profile image={props.image} username={props.username} createdAt={props.createdAt} />

            <PostText content={props.content}/>

            <div className="flex mt-5">
                <Score score={props.score} />
                <Reply/>
            </div>
        </div>
    );
};