import React, { useEffect, useState } from "react";

import Feed from "../components/feed/Feed";
import Loading from "../UI/loading/Loading";
import { useDispatch } from "react-redux";
import { setAuthor } from "../store/reducers/FilterReducer";

const FeedContainer = ({ posts, loading }) => {
  const dispatch = useDispatch();

  const onSearch = (e) =>{
    e.preventDefault();
    console.log(e.target[0].value)
    dispatch(setAuthor(e.target[0].value))
  }

  if(loading){
    return (<Loading />)
  }

  return (
    <Feed
        {...{
          posts,
          onSearch
        }}
      />
  )
}

export default FeedContainer
