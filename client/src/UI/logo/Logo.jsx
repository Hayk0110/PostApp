import React, { useState } from "react";
import "./logo.scss";
import { useNavigate } from "react-router-dom";

const Logo = ({ className = ""}) => {

  const navigate = useNavigate()

  return (
    <p className={"logo " + className} onClick={()=>navigate("/")}>
      Post<span>APP</span>
    </p>
  );
};

export default Logo;
