import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { login } from "./store/reducers/AuthReducer";

import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import MyPosts from "./pages/myPosts/MyPosts";
import MainPage from "./pages/mainPage/MainPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import Header from "./components/header/Header";
import Loading from "./UI/loading/Loading";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(login());
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/posts");
    }
  }, [navigate, location.pathname]);

  if (loading) {
    return <Loading />;
  }

  const BasicLayout = React.memo(() => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  });

  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route path="posts/" element={<MainPage />} />
        <Route path="users/:author/posts" element={<MyPosts />} />
      </Route>
      <Route
        exact
        path="/signin"
        element={user ? <Navigate to="/" /> : <SignIn />}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
