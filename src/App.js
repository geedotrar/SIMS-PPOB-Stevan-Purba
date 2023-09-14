import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import HomePage from "./components/pages/HomePage";
import TopUp from "./components/pages/TopUp";
import Transaction from "./components/pages/Transaction";
import Akun from "./components/pages/Akun";
import Header from "./components/pages/Header";
import ServicePayment from "./components/pages/ServicePayment";
import Registrasi from "./components/pages/Registrasi";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="register" element={<Registrasi />}></Route>
          <Route path="/topUp" element={<TopUp />}></Route>
          <Route path="/transaction" element={<Transaction />}></Route>
          <Route path="/akun" element={<Akun />}></Route>
          <Route path="/ServicePayment/:serviceCode" element={<ServicePayment />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
