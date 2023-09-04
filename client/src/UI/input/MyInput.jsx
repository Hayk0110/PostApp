import React from "react";
import "./myInput.scss";

const MyInput = ({
  name = null,
  type = "text",
  className = "",
  placeholder = "",
  value = "",
  onChange = null,
  onBlur = null,
}) => {
  return (
    <input
      type={type}
      className={"myInput " + className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
    />
  );
};

export default MyInput;
