import React from "react";
import "./noPosts.scss";

import { Warning } from "@mui/icons-material";

const NoPosts = () => {
  return (
    <div className="noPosts">
      <Warning className="warning" />
      <p>Posts not found</p>
    </div>
  );
};

export default NoPosts;
