import React from "react";
import "./confirmModal.scss";

import MyButton from "../../UI/button/MyButton";

const ConfirmModal = ({ onClose, onConfirm, text }) => {
  return (
    <div className="confirmModal">
      <p>{text}</p>
      <div className="buttons">
        <MyButton onClick={onConfirm}>Confirm</MyButton>
        <MyButton onClick={onClose} className="cancel">
          Cancel
        </MyButton>
      </div>
    </div>
  );
};

export default ConfirmModal;
