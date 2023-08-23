import React from "react";
import "./search.scss";

import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";

import { Search as SearchIcon } from "@mui/icons-material";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";

const Search = ({ onSubmit, placeholder = "",  }) => {
  const { author } = useSelector((state) => state.filter);
  const input = useInput(author ? author : "");

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
