import { CircularProgress } from "@mui/material";
import "./loading.scss";
import React from "react";

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress size="75px" />
    </div>
  );
};

export default Loading;
