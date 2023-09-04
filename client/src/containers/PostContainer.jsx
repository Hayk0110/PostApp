import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  addComment as addCommentRedux,
  updatePost as updatePostRedux,
} from "../store/reducers/PostReducer";

import Post from "../components/post/Post";

const PostContainer = ({ post }) => {
  const [input, setInput] = useState("");
  const [rate, setRate] = useState(5);
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeInput = (value) => {
    if (value.trim() === " ") {
      return;
    }
    setInput(value);
  };

  const addComment = (e) => {
    if (user == null) {
      navigate("/signin");
      return;
    }

    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    dispatch(
      addCommentRedux({
        userId: user.id,
        postId: post.id,
        text: input,
        rate: rate,
      })
    );

    setInput("");
    setRate(5);
  };

  const changeRate = (value) => {
    setRate(value);
  };

  const updatePost = (title, text, category) => {
    dispatch(
      updatePostRedux({ title, text, postCategory: category, postId: post.id })
    );
  };

  const tooglePublish = () => {
    dispatch(updatePostRedux({ postId: post.id, published: !post.published }));
  };

  const navigateToAuthor = (email) => {
    navigate(`/users/${email}/posts`);
  };

  return (
    <Post
      {...{
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
      }}
    />
  );
};

export default PostContainer;
