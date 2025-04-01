import { useState } from "react";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.rootContainer}>
      <Header openModal={() => setIsModalOpen(true)} />
      <Form isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
}
export default App;
