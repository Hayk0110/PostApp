import React, { useEffect, useState } from "react";
import Comment from "../components/comment/Comment";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../store/reducers/PostReducer";

const CommentContainer = ({ comment, postId }) => {
  const [edit, setEdit] = useState(false);
  const editInput = useInput(comment.text);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (edit === false) {
      editInput.resetValue();
    }
  }, [edit]);

  const deleteCommentHandler = (id) => {
    dispatch(deleteComment({ postId, commentId: id, userId: user.id }));
  };

  const changeEdit = () =>{
    setEdit((prev) => !prev)
  }
  return (
    <Comment
      {...{
        comment,
        editInput,
        edit,
        changeEdit,
        deleteComment: deleteCommentHandler,
        user
      }}
    />
  );
};

export default CommentContainer;
