import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import MainPage from "./pages/mainPage/MainPage";
import Header from "./components/header/Header";
import MyPosts from "./pages/myPosts/MyPosts";
import Loading from "./UI/loading/Loading";
import { queryString } from "./helpers";
import { login } from "./store/reducers/AuthReducer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);
  const filter = useSelector((state) => state.filter);

  const navigate = useNavigate();
  const location = useLocation();

  const queryFilters = queryString({ ...filter });

  let mainQuery = `/posts/?category=${queryFilters.category}&date=${queryFilters.date}&sort=${queryFilters.sort}`;

  if(filter.author){
    mainQuery = mainQuery + `&author=${filter.author}`
  }

  useEffect(() => {
    if (token !== null) {
      dispatch(login({ token }));
    }
  }, [token]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/posts") {
      navigate(mainQuery);
    }
  }, [location, navigate]);

  if (loading) {
    return <Loading />;
  }

  const BasicLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  return (
    <Routes>
      <Route path="/posts" element={<BasicLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path=":id" element={<MyPosts />} />
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
