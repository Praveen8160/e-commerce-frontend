import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import store from "./store/Store.js";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </Provider>
  );
}

export default App;
