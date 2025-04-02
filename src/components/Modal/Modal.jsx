import React from "react";
import Form from "../Form/Form";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, children }) => {
  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.show : ""}`}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
