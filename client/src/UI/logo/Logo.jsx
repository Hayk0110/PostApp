import React from "react";
import "./logo.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearFilter } from "../../store/reducers/FilterReducer";
import { changePage } from "../../store/reducers/PaginationReducer";

const Logo = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToMainPage = () => {
    dispatch(clearFilter());
    dispatch(changePage(1));
    navigate("/posts");
  };

  return (
    <p className={"logo " + className} onClick={goToMainPage}>
      Post<span>APP</span>
    </p>
  );
};

export default Logo;
