import React, { useState } from "react";
import "./sort.scss";
import MyButton from "../../UI/button/MyButton";
import { ExpandMore, ImportExport } from "@mui/icons-material";
import useToogle from "../../hooks/useToogle";

const Sort = () => {
  const [selectedOption, setSelectedOption] = useState("createdDate");
  const toogle = useToogle(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="sort">
      <MyButton className="button">
        <ImportExport />
        <p>example</p>
      </MyButton>
    </div>
  );
};

export default Sort;
