import { Profile } from "./Profile";
import { Paragraph } from "./Paragraph";
import { Score } from "./Score";
import { Reply } from "./Reply";

export const Comment = (props) => { 

    return (
        <>
            <div className="w-full p-4 bg-white rounded-md">
                <Profile image={props.image} username={props.user.username} createdAt={props.createdAt} />

                <Paragraph content={props.content}/>

                <div className="flex mt-5">
                    <Score score={props.score} />
                    <Reply/>
                </div>
            </div>
        </>
    );
};