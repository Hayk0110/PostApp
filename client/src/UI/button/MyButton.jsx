import React from "react";
import "./myButton.scss";

const MyButton = ({
  children,
  onClick = null,
  className = "",
  disabled = false,
  title = null,
  type = "button",
}) => {
  return (
    <button
      className={"btn " + className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default MyButton;
