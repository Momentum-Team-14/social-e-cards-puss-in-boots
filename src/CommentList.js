import { nothing } from "./utils"

const CommentList = ({comments, onSelect=nothing}) => {
    const Comment = ({comment}) =>{
        return (
            <article onClick={() => onSelect(comment)}>
                <div>{comment.owner.username}</div>
                <div>{comment.text}</div>
            </article>
        )
    }

    return (
        <div>
            {comments.map(comment => <Comment comment={comment} key={comment.pk} />)}
        </div>
    )
}

export default CommentList
