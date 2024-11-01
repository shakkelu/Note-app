import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from "./store/authSlice";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { Body } from "./components/body";
import LandingPage from "./components/landingPage";

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the checkAuthentication thunk on initial load
    dispatch(checkAuthentication());
  }, [dispatch]);

  // Show a loading text while the auth check is in progress
  if (loading) return "Loading...";

  return (
    <>
      <Header />
      <Body>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <LandingPage />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<LandingPage />}></Route>
        </Routes>
      </Body>
      <Footer />
    </>
  );
}

export default App;
