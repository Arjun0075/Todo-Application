import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes , Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user")
    if(user == "undefined"){
      console.log("useEffect return")
      navigate("/login")
      return;
    }
    const userParse = user ? JSON.parse(user) : {}
    console.log("App", userParse)
    if(userParse.email) {
      console.log("logged in already")
      navigate("/")
    }
    else {
      navigate("login")
    }
  } , [])
  return (
    <div>

      <Routes>
        <Route path="/" element = {<Home/>} /> 
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Login/>}/>
        <Route path="*" element = {"Page not found"}/>
      </Routes>
    </div>
  );
};

export default App;
