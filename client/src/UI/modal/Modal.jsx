import React from "react";
import "./modal.scss";

const Modal = ({ children, modal, changeModal }) => {
  return (
    <div className={modal ? "modal active" : "modal"} onClick={changeModal}>
      <div
        className={modal ? "modalContent active" : "modalContent"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
