import React, { useEffect } from "react";
import FeedContainer from "../../containers/FeedContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/reducers/PostReducer";

const MyPosts = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.posts);
  const { currentPage } = useSelector((state) => state.paginate);
  const { category, date, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    dispatch(
      fetchPosts({ currentPage, category, date, sort, author: user.email })
    );
  }, []);

  return (
    <div className="container">
      <FeedContainer posts={posts} loading={loading} />
    </div>
  );
};

export default MyPosts;
