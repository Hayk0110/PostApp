import React, { useState } from "react";
import "./feed.scss";

import PostContainer from "../../containers/PostContainer";

import { searchComent } from "../../helpers";
import Search from "../search/Search";
import { Filter, FilterList } from "@mui/icons-material";
import MyButton from "../../UI/button/MyButton";
import Filters from "../filters/Filters";
import Sort from "../sort/Sort";
import Pagination from "../pagination/Pagination";

const Feed = ({ input, posts, changeInput, updatePool }) => {
  const [filters, setFilters] = useState(false);

  const toggle = () =>{
    setFilters(prev => !prev)
  }

  const onSearch = (e) =>{
    e.preventDefault();
    console.log(e.target.value)
  }

  return (
    <div className="feed">
      <div className="top">
        <Search onSubmit={(e) => onSearch(e)} />
        <MyButton onClick={toggle} >
          <FilterList className="filter"/>
        </MyButton>
        <Sort />
      </div>
      {/* <input
          type="text"
          className="search"
          placeholder="Search by comment"
          value={input}
          onChange={(e) => changeInput(e.target.value)}
        /> */}
      <div className="postWrapper">
        <div className="posts">
          {input
            ? searchComent(posts, input).map((post) => (
                <PostContainer
                  key={post.id}
                  post={post}
                  updatePool={updatePool}
                />
              ))
            : posts.map((post) => {
                return post.isInList ? null : (
                  <PostContainer
                    key={post.id}
                    post={post}
                    updatePool={updatePool}
                  />
                );
              })}
              <Pagination />
        </div>
      <Filters />
      </div>
    </div>
  );
};

export default Feed;
