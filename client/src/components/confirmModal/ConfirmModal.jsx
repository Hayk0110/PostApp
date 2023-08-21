import React from "react";
import "./confirmModal.scss";
import MyButton from "../../UI/button/MyButton";

const ConfirmModal = ({onClose, onConfirm}) => {
  return (
    <div className="confirmModal">
      <div className="modal">
        <p>Do you really want to confirm changes?</p>
        <div className="buttons">
          <MyButton onClick={onConfirm}>Confirm</MyButton>
          <MyButton onClick={onClose} className="cancel">Cancel</MyButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
