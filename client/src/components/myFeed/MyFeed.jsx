import React from "react";
import "./myFeed.scss";

import PostContainer from "../../containers/PostContainer";

import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import PostModal from "../postModal/PostModal";
import NoPosts from "../noPosts/NoPosts";

import MyButton from "../../UI/button/MyButton";
import Modal from "../../UI/modal/Modal";

import { Add } from "@mui/icons-material";

const MyFeed = ({ posts, modal, addPost, onSearch, title, user, author }) => {
  return (
    <div className="myFeed">
      <h1 className="authorName">
        {author === user?.email ? "My" : author} Posts
      </h1>
      <div className="top">
        <Search
          placeholder="Search by title"
          value={title}
          onSubmit={onSearch}
        />
        {user?.email === author && (
          <MyButton onClick={modal.onClick}>
            <Add />
          </MyButton>
        )}
      </div>
      <div className="postWrapper">
        {posts.length ? (
          posts.map((post) => <PostContainer key={post.id} post={post} />)
        ) : (
          <NoPosts />
        )}
      </div>
      <Pagination />
      <Modal modal={modal.clicked} changeModal={modal.onClick}>
        <PostModal
          title="Add new post"
          buttonText="Add"
          modal={modal}
          onSubmit={addPost}
        />
      </Modal>
    </div>
  );
};

export default MyFeed;
