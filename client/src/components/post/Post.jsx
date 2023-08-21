import React, { Component, useEffect, useState } from "react";
import {format} from "timeago.js"
import "./post.scss";


import { AccountCircle, ImportExport, Send } from "@mui/icons-material";
import PostReply from "../postReply/PostReply";
import CommentContainer from "../../containers/CommentContainer";

const Post = ({
  post,
  sortComments,
  addComment,
  changeInput,
  input,
  rate,
  changeRate
}) => {

  return (
    <div className="post">
      <div className="userInfo">
        <AccountCircle className="userIcon" />
        <div>
          <p className="userEmail">{post.user.email}</p>
          <p className="date">{format(post.createdAt)}</p>
        </div>
      </div>
      <p className="postTitle">{post.title}</p>
      <p className="postText">{post.text}</p>
      {post.comments.map((comment) => (
        <CommentContainer
          key={comment?.id}
          comment={comment}
          postId={post.id}
        />
      ))}
      <PostReply addComment={addComment} input={input} changeInput={changeInput} rate={rate} changeRate={changeRate} />
    </div>
  );
};

export default Post;
