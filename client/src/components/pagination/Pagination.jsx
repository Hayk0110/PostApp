import React from "react";
import "./pagination.scss";

import { useDispatch, useSelector } from "react-redux";
import { generatePageButtons } from "../../helpers";

import MyButton from "../../UI/button/MyButton";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { setPage } from "../../store/reducers/PaginationReducer";

const Pagination = () => {
  const { currentPage, totalPages } = useSelector((state) => state.paginate);
  const dispatch = useDispatch();

  const btns = generatePageButtons(totalPages, currentPage);

  const buttonClick = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="pagination">
      <div className="paginateButtons">
        <MyButton
          className="paginate"
          onClick={() => buttonClick(1)}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeft /> first
        </MyButton>
        <MyButton
          className="paginate"
          onClick={() => buttonClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeft /> prev
        </MyButton>
        {btns.map((btn, index) => (
          <MyButton
            className="paginate"
            disabled={currentPage === btn}
            key={index}
            onClick={() => buttonClick(btn)}
          >
            {btn}
          </MyButton>
        ))}
        <MyButton
          className="paginate"
          onClick={() => buttonClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          next <KeyboardArrowRight />
        </MyButton>
        <MyButton
          className="paginate"
          onClick={() => buttonClick(totalPages)}
          disabled={currentPage === totalPages}
        >
          last <KeyboardArrowRight />
        </MyButton>
      </div>
    </div>
  );
};

export default Pagination;
