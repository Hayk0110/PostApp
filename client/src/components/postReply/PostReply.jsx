import React, { useState } from "react";
import "./postReply.scss";
import { Send, Star } from "@mui/icons-material";
import MyButton from "../../UI/button/MyButton";
import Stars from "../../UI/stars/Stars";

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
      <MyButton>
        <Send />
      </MyButton>
    </form>
  );
};

export default PostReply;
