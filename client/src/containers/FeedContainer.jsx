import React, { useEffect, useState } from "react";

import Feed from "../components/feed/Feed";
import Loading from "../UI/loading/Loading";

const FeedContainer = ({ posts, loading }) => {

  const [input, setInput] = useState("");
  const [pool, setPool] = useState([]);

  const updatePool = (newComments, id) => {
    
    const updatedPool = pool.map((post) => {
      if (post.id === id) {
        post.comments = newComments;
      }

      return post;
    });

    setPool(updatedPool);
  }

  const changeInput = (value) => {
    if(value.trim() === " "){
      return
    }
    setInput(value);
  }

  if(loading){
    return (<Loading />)
  }


  return (
    <Feed
        {...{
          input,
          posts,
          changeInput,
          updatePool,
        }}
      />
  )
}

export default FeedContainer
