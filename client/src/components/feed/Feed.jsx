import React from "react";
import "./feed.scss";

import PostContainer from "../../containers/PostContainer";

import Search from "../search/Search";
import Filters from "../filters/Filters";
import Pagination from "../pagination/Pagination";
import NoPosts from "../noPosts/NoPosts";

const Feed = ({ posts, onSearch, author, title, search, changeSearchType }) => {
  return (
    <div className="feed">
      <div className="top">
        <div className="search">
          <Search
            onSubmit={onSearch}
            placeholder={"Search " + search}
            value={search === "by author" ? author : title}
          />
          <select
            className="searchSelect"
            value={search}
            onChange={changeSearchType}
          >
            <option value="by author">By Author</option>
            <option value="by title">By Title</option>
          </select>
        </div>
      </div>
      <div className="postWrapper">
        <div className="posts">
          {posts.length ? (
            posts.map((post) => <PostContainer key={post.id} post={post} />)
          ) : (
            <NoPosts />
          )}
          <Pagination />
        </div>
        <Filters />
      </div>
    </div>
  );
};

export default Feed;
