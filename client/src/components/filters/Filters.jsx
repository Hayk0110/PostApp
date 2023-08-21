import React, { useState } from "react";
import "./filters.scss";
import MyButton from "../../UI/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearFilter, setFilters } from "../../store/reducers/FilterReducer";
import { setPage } from "../../store/reducers/PaginationReducer";

const Filters = () => {
  const checkboxGroups = [
    { groupName: "category", items: ["all", "football", "news", "coding"] },
    { groupName: "date", items: ["all", "today", "this week", "this month"] },
    { groupName: "sort", items: ["by date", "by rate"] },
  ];

  const filter = useSelector((state) => state.filter);
  const [searchParams, setSearchParams] = useSearchParams();

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
    setSearchParams({
      category: checkedItems.category,
      date: checkedItems.date,
      sort: checkedItems.sort,
    });
  };

  const clearAll = () => {
    dispatch(clearFilter());
    setSearchParams({
      category: checkboxGroups[0].items[0],
      date: checkboxGroups[1].items[0],
      sort: checkboxGroups[2].items[0],
    });
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
