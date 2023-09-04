import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import useToogle from "../hooks/useToogle";

import { deleteComment } from "../store/reducers/PostReducer";

import Comment from "../components/comment/Comment";

const CommentContainer = ({ comment, postId, navigateToAuthor }) => {
  const [edit, setEdit] = useState(false);
  const editInput = useInput(comment.text);
  const modal = useToogle(false);

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

  const changeEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <Comment
      {...{
        comment,
        editInput,
        edit,
        changeEdit,
        deleteComment: deleteCommentHandler,
        user,
        navigateToAuthor,
        modal,
      }}
    />
  );
};

export default CommentContainer;
