import axios from "axios";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../style/mainMenu.css";
import Sidebar from "../components/Sidebar";
import Rightsidebar from "./Rightsidebar";
import { useFormik } from "formik";
import { useContext } from "react";
import { global } from "../App";
import Download from "../img/download.png";
function MainMenu() {
  const { user, setUser } = useContext(global);
  const [user1, setUser1] = useState([]);
  const [temp, settemp] = useState([]);
  //Get Data From Backend
  var searchPost = [];
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
  //Search

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      const userObj = {
        searchPost1: values.search,
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
      } else {
        setUser1(searchPost);
      }
    },
  });

  useEffect(() => {
    userdata();
  }, []);
  //Download
  const download = () => {
    const element = document.createElement("a");
    var size = user1.length;
    var data = "";
    var j = 1;
    for (var i = 0; i < size; i++) {
      data = data + "Post# " + j + "\n" + "Topic: " + user1[i].Topic + "\n";
      data = data + user1[i].PostData + "\n";
      j++;
    }
    const file = new Blob([data], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "NewDocument.txt";
    document.body.appendChild(element);
    element.click();
  };

  //Download End

  //Download Spacific
  const downloadSpacific = (topic) => {
    const element = document.createElement("a");
    var size = user1.length;
    var data = "";
    for (var i = 0; i < size; i++) {
      if (user1[i].Topic == topic) {
        data = "Topic: " + user1[i].Topic + "\n";
        data = data + user1[i].PostData + "\n";
        console.log(data);
      }
    }
    const file = new Blob([data], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "NewDocument.txt";
    document.body.appendChild(element);
    element.click();
  };
  const bookmarkFun = () => {
    console.log("I am bookmark Func");
    let script=document.createElement('script');
    // script.src=bookmark;
     document.body.appendChild(script);
   
   const selObj = window.getSelection();
   var url = window.location.href;
   
   if (selObj != "") {
    console.log("BookMarklet Js Page")
     console.log(selObj.baseNode);
     console.log(selObj);
    
     //const selRange = selObj.getRangeAt(0);
   }
  };
  return (
    <>
      <Box style={{ background: "#f0f2f5" }}>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "35%",
            marginTop: "5%",
          }}
        >
          <br />
          <TextField
            id="search"
            name="search"
            type="text"
            variant="standard"
            label="Enter Topic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: "250px",
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
              color: "",
            }}
            style={{
              width: "100px",
              height: "30px",
              marginTop: "15px",
              marginLeft: "10px",
            }}
          >
            Search
          </Button>
          <Box style={{ marginTop: "5px" }}>
            <Button
              onClick={download}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "",
                width: "100px",
                height: "30px",
                marginTop: "10px",
                marginLeft: "5px",
              }}
            >
              Download
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "40%", marginTop: "20px", marginLeft: "30%" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            {user1.map((post) => (
              <Box
                className="card"
                style={{ marginTop: "15px", width: "100%" }}
              >
                <Box>
                  <Box
                    className="card-header"
                    style={{
                      width: "250px",
                      marginTop: "-80px",
                      marginLeft: "-75px",
                    }}
                  >
                    <Box className="profile">
                      <span className="letter">K</span>
                    </Box>
                    <Box
                      className="card-title-group"
                      style={{ marginTop: "-16px" }}
                    >
                      <h5 className="card-title">{user.Name}</h5>
                      {/* <div className="card-date">{props.date}</div> */}
                    </Box>
                  </Box>
                  <div
                    style={{
                      width: "50px",
                      marginLeft: "325px",
                      marginTop: "-70px",
                    }}
                  >
                    <Button
                      class={post.Topic}
                      onClick={() => downloadSpacific(post.Topic)}
                      variant="text"
                      style={{ background: "white", border: "none" }}
                    >
                      <img
                        style={{ width: "40px", borderRadius: "100%" }}
                        src={Download}
                      ></img>
                    </Button>
                  </div>
                </Box>
                {/* <img className="card-image" src={food} alt="Logo" /> */}
                <div
                  style={{
                    marginLeft: "-44px",
                    marginTop: "45px",
                    textAlign: "Left",
                  }}
                >
                  <h3>{post.Topic}</h3>
                </div>
                <Box
                  className="card-text"
                  style={{ textAlign: "Justify", marginLeft: "-20px" }}
                >
                  {post.PostData}
                </Box>
                {/* <Box className="card-like-bar">
                 {props.liked ? (
                  <img className="card-like-icon" src={heartFill} alt="Logo" />
                ) : (
                  <img className="card-like-icon" src={heartOutline} alt="Logo" />
                )}
               <Box className="like-text">
                  <b></b> kişi bu tarifi beğendi.
                </Box>
              </Box> */}
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: "40%", marginTop: "20px", marginLeft: "30%" }}>
          <Button onClick={() => bookmarkFun()}>BookMark</Button>
        </Box>
      </Box>

      <Rightsidebar />
      <Sidebar />
    </>
  );
}

export default MainMenu;
