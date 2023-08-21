import { AccountCircle, Delete, Star, Edit } from "@mui/icons-material";
import "./comment.scss";
import { format } from "timeago.js";
import CommentEdit from "../commentEdit/CommentEdit";

const Comment = ({
  comment,
  editInput,
  edit,
  changeEdit,
  deleteComment,
  user,
}) => {

  return (
    <div className="comment">
      <div className="commentWrapper">
        <div className="commentUser">
          <AccountCircle className="userIcon" />
          <div>
            <div className="username">
              <p className="userEmail">{comment.user.email}</p>
              <p className="rate">
                <Star className="star" />
                {comment?.rate}
              </p>
            </div>

            <p className="date">{format(comment.createdAt)}</p>
          </div>
          {user?.id == comment.user.id && (
            <Edit className="edit" onClick={changeEdit} />
          )}
        </div>
        <div className="commentContent">
          {edit ? (
            <CommentEdit
              value={editInput.value}
              onChange={editInput.onChange}
              commentRate={comment.rate}
              commentId={comment.id}
              postId={comment.postId}
              commentText={comment.text}
            />
          ) : (
            <pre className="commentText">{comment?.text}</pre>
          )}
          {/* <div className="commentInfo">
            <button className="btn" onClick={() => deleteCommentHandler(comment?.id)}>
              <Delete />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
