import React from "react";
import "./search.scss";

import useInput from "../../hooks/useInput";

import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";

import { Search as SearchIcon } from "@mui/icons-material";

const Search = ({ onSubmit, placeholder = "", value }) => {
  const input = useInput(value ? value : "");

  return (
    <form className="searchForm" onSubmit={onSubmit}>
      <MyInput
        placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
      />
      <MyButton>
        <SearchIcon />
      </MyButton>
    </form>
  );
};

export default Search;
