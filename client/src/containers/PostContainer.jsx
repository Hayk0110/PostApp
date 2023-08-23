import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Post from "../components/post/Post";

import { asc, desc } from "../constants";
import { sortBy } from "../helpers";
import { addComment as addCommentRedux } from "../store/reducers/PostReducer";

const PostContainer = ({ post}) => {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [count, setCount] = useState(0);
  const [rate, setRate] = useState(5);

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
      addCommentRedux({ userId: user.id, postId: post.id, text: input, rate: rate })
    );

    setInput("");
    setRate(5);
  };

  const sortComments = () => {
    if (comments.length <= 1) {
      return;
    } else if (count % 2 === 1) {
      sortBy(comments, "rate", asc);
      setCount(count + 1);
    } else {
      sortBy(comments, "rate", desc);
      setCount(count + 1);
    }
  };

  const changeRate = (value) => {
    setRate(value)
  };

  return (
    <Post
      {...{
        post,
        sortComments,
        addComment,
        changeInput,
        input,
        rate,
        changeRate
      }}
    />
  );
};

export default PostContainer;
