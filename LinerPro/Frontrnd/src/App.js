import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
import MainMenu from "./components/MainMenu";
import AddFriends from "./components/AddFriends";
import Download from "./components/Download";
import Listen from "./components/ListenHighlight"
import FriendRequest from "./components/FriendRequest";
import Importance from "./components/Importance";
import MyPost from "./components/MyPost";
import FriendsData from "./components/FriendData";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import ArticalHistory from "./components/ArticalHistory";
import Translate from "./components/Tranalator";

const global = createContext();
function App() {
  const [user, setUser] = useState(false);

  function userLogin() {
    console.log(JSON.parse(window.sessionStorage.getItem("userToken")));
    if (window.sessionStorage.getItem("userToken")) {
      axios
        .get("http://localhost:5000/api/users/me?", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.sessionStorage.getItem("userToken")
            )}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        });
    }
  }

  useEffect(() => {
    userLogin();
  }, []);

  
  return (
    <div>
      <global.Provider value={{ user, setUser, userLogin }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/mainMenu" element={<MainMenu />} />
          <Route path="/addFriends" element={<AddFriends />} />
          <Route path="/downloadHighlight" element={<Download />} />
          <Route path="/Listen" element={<Listen />} />
          <Route path="/friendrequest" element={<FriendRequest />} />
          <Route path="/MyPost" element={<MyPost />} />
          <Route path="/Translate" element={<Translate />} />
          <Route path="/Importance" element={<Importance />} />
          <Route path="/FriendsData" element={<FriendsData />} />
          <Route path="/ArticalHistory" element={<ArticalHistory/>}/>
        </Routes>
      </global.Provider>
      
      </div>
  );
}

export default App;
export { global };
