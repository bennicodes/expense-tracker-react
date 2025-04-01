import React from "react";
import styles from "./Button.module.css";

const Button = ({ children }) => {
  return <button className={styles.addButton}>{children}</button>;
};

export default Button;
