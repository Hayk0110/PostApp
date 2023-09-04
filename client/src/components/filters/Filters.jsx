import React, { useState } from "react";
import "./filters.scss";

import { useDispatch, useSelector } from "react-redux";

import { clearFilter, setFilters } from "../../store/reducers/FilterReducer";
import { setPage } from "../../store/reducers/PaginationReducer";

import MyButton from "../../UI/button/MyButton";

const Filters = () => {
  const checkboxGroups = [
    {
      groupName: "category",
      items: ["all", "football", "news", "coding", "something else"],
    },
    { groupName: "date", items: ["all", "today", "this week", "this month"] },
    { groupName: "sort", items: ["by date", "by rate"] },
  ];

  const filter = useSelector((state) => state.filter);

  const [checkedItems, setCheckedItems] = useState(filter);
  const dispatch = useDispatch();

  const handleCheckboxChange = (group, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [group]: item,
    }));
  };

  const buttonClick = () => {
    dispatch(
      setFilters({
        category: checkedItems.category,
        date: checkedItems.date,
        sort: checkedItems.sort,
      })
    );
    dispatch(setPage(1));
  };

  const clearAll = () => {
    dispatch(clearFilter());
  };

  return (
    <div className="filters">
      <h1>Filters</h1>
      {checkboxGroups.map((groupData) => (
        <div key={groupData.groupName}>
          <h2>{groupData.groupName}</h2>
          {groupData.items.map((item) => (
            <div key={item} className="filterName">
              <input
                type="checkbox"
                checked={checkedItems[groupData.groupName] === item}
                onChange={() => handleCheckboxChange(groupData.groupName, item)}
              />
              <p>{item}</p>
            </div>
          ))}
        </div>
      ))}
      <div className="buttons">
        <MyButton onClick={buttonClick}>Confirm</MyButton>
        <MyButton onClick={clearAll}>Clear</MyButton>
      </div>
    </div>
  );
};

export default Filters;
