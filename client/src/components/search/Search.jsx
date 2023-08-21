import React from "react";
import "./search.scss";

import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";

import { Search as SearchIcon } from "@mui/icons-material";
import useInput from "../../hooks/useInput";

const Search = ({onSubmit = null}) => {
  const input = useInput("");

  return (
    <form className="searchForm" value={input.value} onSubmit={onSubmit}>
      <MyInput placeholder="Search" value={input.value} onChange={input.onChange} />
      <MyButton>
        <SearchIcon />
      </MyButton>
    </form>
  );
};

export default Search;
