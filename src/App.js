import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./pages/common/footer";
import Home from "./pages/common/home";
import "./css/style.css";
import Login from "./pages/common/login";
import Signup from "./pages/common/signup";
import Fetchfoods from "./pages/Account/fetchfoods";
import Viewmenumeals from "./pages/Account/viewmenumeals";
import Viewbranch from "./pages/Account/viewbranch";
import Mycart from "./pages/Account/cart";
import Myorders from "./pages/Account/myorders";




const App = () => {
  document.title = "Dotdelivery";

  return (

    <Router>
      <div className="mainbody">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/signup" element={<Signup/>} exact />
          <Route path="/fetchfoods" element={<Fetchfoods/>} exact />
          <Route path="/viewmenumeal" element={<Viewmenumeals/>} exact/>
          <Route path="/viewbranch" element={<Viewbranch/>} exact/>
          <Route path="/mycart" element={<Mycart/>} exact />
          <Route path="/myorders" element={<Myorders/>} exact />
        </Routes>
      </div>

      <Footer />
    </Router>
  )
};

export default App;