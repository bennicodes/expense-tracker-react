import styles from "./App.module.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className={styles.rootContainer}>
      <Header></Header>
      <Form></Form>
    </div>
  );
}
export default App;
