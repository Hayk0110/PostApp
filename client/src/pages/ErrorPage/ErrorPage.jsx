import React from "react";
import "./errorPage.scss";
import { Warning } from "@mui/icons-material";
import MyButton from "../../UI/button/MyButton";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Header />
    <div className="container errorPage">
      <div className="error">
        <Warning className="errorIcon" />
        <div>
          <p>Page not found</p>
          <MyButton onClick={() => navigate("/")}>Go back</MyButton>
        </div>
      </div>
    </div>

    </>
  );
};

export default ErrorPage;
