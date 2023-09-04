import React from "react";

import { useDispatch, useSelector } from "react-redux";
import useToogle from "../hooks/useToogle";

import { addPost as addPostRedux } from "../store/reducers/PostReducer";
import { setTitile } from "../store/reducers/FilterReducer";
import { changePage } from "../store/reducers/PaginationReducer";

import MyFeed from "../components/myFeed/MyFeed";

import Loading from "../UI/loading/Loading";

const MyFeedContainer = ({ posts, loading, user, author }) => {
  const {title} = useSelector(state => state.filter)
  const modal = useToogle(false);

  const dispatch = useDispatch();

  const addPost = (title,text,category) => {
    dispatch(addPostRedux({userId: user.id,title,text,category}))
    modal.onClick();
  };

  const onSearch  = (e) =>{
    e.preventDefault();
    dispatch(changePage(1))
    dispatch(setTitile(e.target[0].value))
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <MyFeed
      {...{
        posts,
        modal,
        addPost,
        onSearch,
        title,
        user,
        author
      }}
    />
  );
};

export default MyFeedContainer;
