import React, { useState, useEffect } from "react";
import { global } from "../App";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Rightsidebar from "./Rightsidebar";
import moeed from "../img/moeed.jpg"
import '../style/AddFriends.css';
import { Input } from "@mui/material";

function AddFriends() {

  // Variables
  const [user1, setUser1] = useState([]);
  const [temp, settemp] = useState([]);
  const { user, setUser } = useContext(global);
  var searchPost = [];


  //Users Accounts detals coming from database
  function Request() {
    console.log("HI i am");
    if (window.sessionStorage.getItem("userToken")) {
      axios
        .get("http://localhost:5000/api/users/userList", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.sessionStorage.getItem("userToken")
            )}`,
          },
        })
        .then((res) => {
          setUser1(res.data.temp);
          settemp(res.data.temp);
        });
    }
  }

  const sendRequest = (receverEmail,receverName) => {

    console.log(29);
    //console.log(UserEmail);
    console.log("Sender ");
    console.log(user.Email);
    const userObj = {
      senderName: user.Name,
      receverName: receverName,
      senderEmail: user.Email,
      receverEmail: receverEmail,
    };
    console.log(userObj);
    axios
      .post("http://localhost:5000/api/users/senderRequest", userObj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        alert("Successfil");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });

    alert("Request Send");
  };

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
        if (userObj.searchPost1 == user1[i].Email || userObj.searchPost1 == user1[i].Name) {
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

  useEffect(() => {
    Request();
  }, []);
  return (
    <>
      <div style={{ background: "#f0f2f5" }}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "28%",
            marginTop: "5%",
          }}
        >
          <br />
          <TextField
            id="search"
            name="search"
            variant="standard"
            type="text"
            label="Enter Topic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: "450px",
              marginTop: "0px",
            }}
            value={formik.values.search}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: ""
            }}
            style={{
              width: "130px",
              height: "30px",
              marginTop: "15px",
              marginLeft: "20px"
            }}
          >
            Search
          </Button>
        </Box>
        <Grid container spacing={-50} style= {{marginTop: "20px", marginLeft: "20%", width: "58%"}}>
          {user1.map((post) => (
            <Grid xs={3} class="cardFriend" style={{marginRight: "40px", background: "white", width: "25%", height: "250px"}}>
              <Grid style={{ width: "100%", height: "150px" }}>
                <img src={moeed} style={{ width: "100%", height: "100%" }}></img>
              </Grid>
              <center><h2>{post.Name}</h2></center> 
              <p><button className="button" class={post.Email} onClick={() => sendRequest(post.Email,post.Name)} style={{ color: "white", background: "black", width: "100%", fontSize: "18px", cursor: "pointer", padding: "8px" }}>Request</button></p>
            </Grid>
          ))}
        </Grid>
        <Sidebar />
        <Rightsidebar />

      </div>
    </>
  );
}

export default AddFriends;
