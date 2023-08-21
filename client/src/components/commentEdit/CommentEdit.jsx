import React, { useState } from "react";
import "./commentEdit.scss";
import MyButton from "../../UI/button/MyButton";
import useToogle from "../../hooks/useToogle";
import ConfirmModal from "../confirmModal/ConfirmModal";
import Stars from "../../UI/stars/Stars";
import { useDispatch } from "react-redux";
import { updateComment } from "../../store/reducers/PostReducer";

const CommentEdit = ({
  value,
  onChange,
  commentRate,
  commentId,
  postId,
  commentText,
}) => {
  const modal = useToogle(false);
  const [rate, setRate] = useState(commentRate);

  const dispatch = useDispatch();

  const changeRate = (value) => {
    setRate(value);
  };

  const onConfirm = () => {
    dispatch(updateComment({ commentId, postId, text: value, rate }));
  };

  const onButtonClick = () => {
    if (commentText === value && rate === commentRate) {
      return;
    } else {
      return modal.onClick();
    }
  };

  return (
    <>
      <div className="commentEdit">
        <textarea
          className="editText"
          value={value}
          onChange={onChange}
        ></textarea>
        <Stars rate={rate} changeRate={changeRate} />
        <MyButton className="edit" onClick={onButtonClick}>
          Edit
        </MyButton>
      </div>
      {modal.clicked && (
        <ConfirmModal onClose={modal.onClick} onConfirm={onConfirm} />
      )}
    </>
  );
};

export default CommentEdit;
