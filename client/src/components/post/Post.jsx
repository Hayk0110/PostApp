import React from "react";
import "./post.scss";

import { format } from "timeago.js";

import useToogle from "../../hooks/useToogle";

import CommentContainer from "../../containers/CommentContainer";

import PostReply from "../postReply/PostReply";
import PostModal from "../postModal/PostModal";

import Modal from "../../UI/modal/Modal";
import MyButton from "../../UI/button/MyButton";

import { AccountCircle, Edit } from "@mui/icons-material";

const Post = ({
  post,
  addComment,
  changeInput,
  input,
  rate,
  changeRate,
  location,
  updatePost,
  tooglePublish,
  user,
  navigateToAuthor,
}) => {
  const modal = useToogle(false);

  return (
    <div className="post">
      <div className="postTop">
        <div
          className="userInfo"
          onClick={() => navigateToAuthor(post.user.email)}
        >
          <AccountCircle className="userIcon" />
          <div>
            <p className="userEmail">{post.user.email}</p>
            <p className="date">{format(post.createdAt)}</p>
          </div>
        </div>
        {location.pathname.includes("users") && post.user?.id === user?.id && (
          <div className="icons">
            <MyButton className="publish" onClick={tooglePublish}>
              {post.published ? "Unpublish" : "Publish"}
            </MyButton>

            <Edit className="icon" onClick={modal.onClick} />
          </div>
        )}
      </div>
      <div className="postInfo">
        <p className="postTitle">{post.title}</p>
        <p className="postCategory">Catgeory: {post.category}</p>
        <p className="postText">{post.text}</p>
      </div>
      {post.comments.map((comment) => (
        <CommentContainer
          key={comment?.id}
          comment={comment}
          postId={post.id}
          navigateToAuthor={navigateToAuthor}
        />
      ))}
      <PostReply
        addComment={addComment}
        input={input}
        changeInput={changeInput}
        rate={rate}
        changeRate={changeRate}
      />
      <Modal modal={modal.clicked} changeModal={modal.onClick}>
        <PostModal
          modal={modal.clicked}
          title="Update post"
          postTitle={post.title}
          postText={post.text}
          category={post.category}
          buttonText="Update"
          onSubmit={updatePost}
        />
      </Modal>
    </div>
  );
};

export default Post;
