import React from "react";
import Button from "../Button/Button";
import Filter from "../Filter/Filter";
import TotalExpenses from "../TotalExpenses/TotalExpenses";
import styles from "./Dashboard.module.css";

const Dashboard = ({ openModal }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headingContainer}>
        <h1 className={styles.mainTitle}>Expense Tracker</h1>
        <TotalExpenses />
      </div>
      <div className={styles.actionContainer}>
        <Button onClick={openModal} className={styles.addButton}>
          Add
        </Button>
        {/* <Filter /> */}
      </div>
    </div>
  );
};

export default Dashboard;
