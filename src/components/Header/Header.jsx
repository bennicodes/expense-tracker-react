import React from "react";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";
import TotalExpenses from "../TotalExpenses/TotalExpenses";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headingContainer}>
        <h1 className={styles.mainTitle}>Expense Tracker</h1>
        <TotalExpenses />
      </div>
      <div className={styles.actionContainer}>
        <Button onClick="{}" className={styles.addButton}>
          Add
        </Button>
        {/* <Filter /> */}
      </div>
    </div>
  );
};

export default Header;
