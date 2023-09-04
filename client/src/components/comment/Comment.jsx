import React from "react";
import "./comment.scss";

import { format } from "timeago.js";

import CommentEdit from "../commentEdit/CommentEdit";
import ConfirmModal from "../confirmModal/ConfirmModal";

import Modal from "../../UI/modal/Modal";
import { AccountCircle, Delete, Star, Edit } from "@mui/icons-material";

const Comment = ({
  comment,
  editInput,
  edit,
  changeEdit,
  deleteComment,
  user,
  navigateToAuthor,
  modal
}) => {
  return (
    <div className="comment">
      <div className="commentWrapper">
        <div className="commentUser">
          <div
            className="commentUserInfo"
            onClick={() => navigateToAuthor(comment.user.email)}
          >
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
          </div>
          {user?.id == comment.user.id && (
            <div className="icons">
              <Edit className="icon" onClick={changeEdit} />
              <Delete className="icon" onClick={modal.onClick} />
            </div>
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
        </div>
      </div>
      <Modal modal={modal.clicked} changeModal={null}>
            <ConfirmModal onClose={modal.onClick} onConfirm={()=>deleteComment(comment?.id)} text="Do you want to delete this comment?" />
      </Modal>
    </div>
  );
};

export default Comment;
