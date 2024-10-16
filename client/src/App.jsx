import "./App.css";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { Body } from "./components/body";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Body>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Body>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
