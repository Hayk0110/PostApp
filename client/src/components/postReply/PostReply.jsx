import React from "react";
import "./postReply.scss";

import MyButton from "../../UI/button/MyButton";
import Stars from "../../UI/stars/Stars";

import { Send } from "@mui/icons-material";

const PostReply = ({ addComment, input, changeInput, rate, changeRate }) => {
  return (
    <form onSubmit={addComment} className="postForm">
      <textarea
        className="postInput"
        value={input}
        onChange={(e) => changeInput(e.target.value)}
        placeholder="Write your comment"
      ></textarea>
      <Stars rate={rate} changeRate={changeRate} />
      <MyButton type="submit">
        <Send />
      </MyButton>
    </form>
  );
};

export default PostReply;
