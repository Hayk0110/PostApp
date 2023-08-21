import React from "react";
import './myInput.scss'

const MyInput = ({
  type = "text",
  className = "",
  placeholder = "",
  value = "",
  onChange = null,
}) => {
  return (
    <input
      type={type}
      className={"myInput " + className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default MyInput;
