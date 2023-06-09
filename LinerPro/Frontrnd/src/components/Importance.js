import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../style/mainMenu.css";
import Sidebar from "../components/Sidebar";
import Rightsidebar from "./Rightsidebar";
import { useContext } from "react";
import { toast } from "react-toastify";
import Topbar from "./Topbar";
import { global } from "../App";

function Importance() {
  const { user, setUser } = useContext(global);
  const [user1, setUser1] = useState([]);
  const [temp, settemp] = useState([]);
  var searchPost = [];
  //Search
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      const userObj = {
        searchPost1: values.search
      };
      setUser1(temp);
      var size = user1.length;
      var j = 0;
      for (var i = 0; i < size; i++) {
        if (userObj.searchPost1 == user1[i].Topic) {
          searchPost[j] = user1[i];
          j++;
        }

      }
      if (j == 0) {
        alert("Data Not Found");
      }
      else {
        setUser1(searchPost);
      }
    },
  });

  //Search End
  //Get Data From Backend 

  function userdata() {
    if (window.sessionStorage.getItem("userToken")) {
      axios
        .get("http://localhost:5000/api/users/datarequest?", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.sessionStorage.getItem("userToken")
            )}`,
          },
        })
        .then((res) => {
          setUser1(res.data.postdata);
          settemp(res.data.postdata);
        });
    }
  }

  // Data End

  //Importance
  const Importance =
    [
      { value: "Select Importance:", Number: "1" },
      { value: "Green", Number: "1" },
      { value: "Red", Number: "2" },
    ]

  const [ImportanceValue, setImportanceValue] = useState(0);
  const purchaseHandler2 = (e) => {
    console.log(Importance[ImportanceValue].value);
    setUser1(temp);
    console.log("97");
    console.log(user1);
    var size = user1.length;
    var j = 0;
    for (var i = 0; i < size; i++) {
      if (Importance[ImportanceValue].value == user1[i].Importance) {
        searchPost[j] = user1[i];
        j++;
      }

    }
    if (j == 0) {
      alert("Data Not Found");
    }
    else {
      setUser1(searchPost);
    }
  }
  //Importance End
  const changeToImportant = (importance, _id) => {
    if(importance =="Red"){
      alert("Post is already in Important Section: ")
    }
    else{
      const userObj = {
        _id: _id,
        
      };
      console.log(userObj)
      axios
        .post("http://localhost:5000/api/users/changeToImportant", userObj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          alert("Successfull");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });

        var size = user1.length;
      var j = 0;
      for (var i = 0; i < size; i++) {
        if (_id == user1[i]._id) {
          user1[i].Importance = "Red";
          break;
        }
      }

      }
    }
    const changeToLessImportant = (importance, _id) => {

      
    if(importance =="Green"){
      alert("Post is already Less Important: ")
    }
    else{
      const userObj = {
        _id: _id, 
      };
      console.log(userObj)
      axios
        .post("http://localhost:5000/api/users/changeToLessImportant", userObj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          alert("Successfull");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
        var size = user1.length;
        var j = 0;
        for (var i = 0; i < size; i++) {
          if (_id == user1[i]._id) {
            user1[i].Importance="Green";
            console.log("data Change")
            break;
          }
        }
      }
    }
  const [productIndex, setProductIndex] = useState(0);
  useEffect(() => {

    userdata();
  }, []);

  return (
    <>
      <Box style={{ background: "#f0f2f5", marginTop: "5%"}}>
        <Grid item xs={12} style={{ marginLeft: "34%"}}>
          <select style={{ width: "33%", display: "center", marginLeft: "10px", height: "30px", border: "none" }} onChange={(e) => { setImportanceValue(e.target.value); }}>
            {Importance.map((product, index) => {
              return (
                <option value={index} key={index}>
                  {product.value}
                </option>
              );
            })}
          </select>
          <Button
            variant="contained"
            color="primary"
            onClick={purchaseHandler2}
            style={{ height: "30px", marginLeft: "10px" }}
          >
            Importance
          </Button>
        </Grid>
        <Box sx={{ width: "40%", marginLeft: "30%" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            {user1.map(post => (
              <Box className="card" style={{ marginTop: "15px", width: "100%" }}>
                <Box className="card-header" style={{ width: "200%", marginTop: "-80px", marginLeft: "-65px", display: "flex", flexDirection: "row" }}>
                  <Box style={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <div className="profile">
                      <span className="letter">K</span>
                    </div>
                    <div className="card-title-group" style={{ marginTop: "-16px" }}>
                      <h5 className="card-title">{user.Name}</h5>

                      {/* <div className="card-date">{props.date}</div> */}
                    </div>
                  </Box>
                  <Box class="dropdown" style={{ width: "60px", marginLeft: "70px", marginTop: "-20px" }}>
                    <button style={{ background: "transparent", width: "1px", border: "none", marginLeft: "40%", marginTop: "20%" }} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16" color='black'>
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </button>
                    <div class="dropdown-content" >
                      <button onClick={() => changeToImportant(post.Importance, post._id)} style={{ width: "60px", border: "none", borderRadius: "4px" }}>Important</button>
                      <button onClick={() => changeToLessImportant(post.Importance, post._id)} style={{ width: "60px", border: "none", borderRadius: "4px" }}>Less Important</button>
                    </div>
                  </Box>
                </Box>
                {/* <img className="card-image" src={food} alt="Logo" /> */}
                <div style={{ marginLeft: "-44px", textAlign: "Left" }}><h3>{post.Topic}</h3></div>
                <Box className="card-text" style={{ textAlign: "Justify", marginLeft: "-20px" }}>{post.PostData}</Box>
                

              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Rightsidebar />
      <Sidebar />
    </>
  );
}

export default Importance;