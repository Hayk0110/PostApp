import React from "react";
import './myButton.scss'

const MyButton = ({ children, onClick = null, className = "", disabled = false }) => {
  return (
    <button className={"btn " + className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default MyButton;
