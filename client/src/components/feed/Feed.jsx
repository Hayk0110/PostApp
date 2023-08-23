import React, { useState } from "react";
import "./feed.scss";

import PostContainer from "../../containers/PostContainer";

import Search from "../search/Search";
import { FilterList } from "@mui/icons-material";
import MyButton from "../../UI/button/MyButton";
import Filters from "../filters/Filters";
import Sort from "../sort/Sort";
import Pagination from "../pagination/Pagination";

const Feed = ({ posts, onSearch }) => {
  const [filters, setFilters] = useState(false);

  const toggle = () => {
    setFilters((prev) => !prev);
  };

  console.log(posts);

  return (
    <div className="feed">
      <div className="top">
        <Search onSubmit={onSearch} placeholder="Search by author" />
        <MyButton onClick={toggle}>
          <FilterList className="filter" />
        </MyButton>
        <Sort />
      </div>
      <div className="postWrapper">
        <div className="posts">
          {posts.map((post) => (
            <PostContainer key={post.id} post={post} />
          ))}
          <Pagination />
        </div>
        <Filters />
      </div>
    </div>
  );
};

export default Feed;
