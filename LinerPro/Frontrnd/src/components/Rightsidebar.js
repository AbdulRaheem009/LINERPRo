import React, {createContext,useState, useEffect } from "react";
import axios from "axios";
import "../style/rightsidebar.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import friends from "../img/friends.jpg";
import { ToastContainer, toast } from "react-toastify";

const Rightsidebar = () => {
  // Variables
  const [ user, setUser ] = useState([]);
  const [requestList, setrequestList] = useState([]);
  const [friendlist, setfriendlist] = useState([]);
  //Users Accounts detals coming from database
  function listRequest() {

    if (window.sessionStorage.getItem("userToken")) {
      axios
        .get("http://localhost:5000/api/users/watingUserList", { params: { Useremail: user.Email } } ,{
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.sessionStorage.getItem("userToken")
            )}`,
          },
        })
        .then((res) => {
          setrequestList(res.data.postdata);
          console.log(res.data.postdata);
        });
    }
  }

  //Accept Friend Request

  const acceptRequest = (senderEmail, receverEmail, senderName,receverName, _id) => {
    var size = requestList.length;
    console.log(size);

    const userObj = {
      friendName: senderName,
      receverName:receverName,
      senderEmail: senderEmail,
      receverEmail: receverEmail,
      
    };
    console.log(userObj);
    axios
      .post("http://localhost:5000/api/users/acceptRequest", userObj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        alert("Successfil");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
    deleatPost(_id);
  };
  const deleatPost = (_id) => {
    console.log(_id);
    const userObj = {
      _id: _id,
    };
    axios
      .post("http://localhost:5000/api/users/deletePost", userObj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        alert("Successfil");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
    listRequest();
  };

  // Friend list
  async function friendList_() {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me?", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            window.sessionStorage.getItem("userToken")
          )}`,
        },
      });
  
      setUser(response.data);
  
      if (window.sessionStorage.getItem("userToken")) {
        const friendResponse = await axios.get(
          "http://localhost:5000/api/users/friendList",
          {
            params: { Useremail: response.data.Email },
            headers: {
              Authorization: `Bearer ${JSON.parse(
                window.sessionStorage.getItem("userToken")
              )}`,
            },
          }
        );
  
        setfriendlist(friendResponse.data.postdata);
        console.log(friendResponse.data.friendArray);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    friendList_();
  }, []);
  return (
    <>
    
      <div className="rightsidebar" style={{ background: "#f0f2f5" }}>
        <div>
          <Typography
            sx={{
              marginTop: "7%",
              textAlign: "left",
            }}
          >
            <h3 style={{ color: "#717377" }} > Friends Requests</h3>
          </Typography>
        </div>
        <Box sx={{ width: "250px", marginTop: "20px", display: "flex", flexDirection: "row" }}>
          {requestList.map((post) => (
            <Box>
              <Box
                key={post.id}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <img
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "60/2",
                    marginTop: "5px",
                  }}
                  src={friends}
                ></img>
                <Box style={{ marginTop: "-18px", marginLeft: "15px" }}>
                  <a href="#">
                    <h5>{post.senderName}</h5>
                  </a>
                </Box>
              </Box>
              <Box style={{ marginTop: "-24px", marginLeft: "75px", display: "flex", flexDirection: "row" }}>
                <Button
                  class={post.senderEmail}
                  onClick={() =>
                    acceptRequest(
                      post.senderEmail,
                      post.receverEmail,
                      post.senderName,
                      post.receverName,
                      post._id
                    )
                  }
                  style={{
                    border: "none",
                    color: "Black",
                    marginLeft: "3px",
                    borderRadius: "10px",
                    width: "90px",
                    color: "white",
                    marginBottom: "3px",
                    background: "#1b74e4"
                  }}
                >
                  {" "}
                  Confirm
                </Button>
                <Button
                  class={post.senderEmail}
                  onClick={() => deleatPost(post._id)}
                  style={{
                    width: "90px",
                    border: "none",
                    height: "25px",
                    color: "Black",
                    borderRadius: "10px",
                    marginLeft: "10px",
                    marginBottom: "3px",
                    background: "#e4e6eb"
                  }}
                >
                  {" "}
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <div
          style={{
            position: "absolute",
            left: "0",
            width: "100%",
            marginTop: "30px",
            textAlign: "center",
            borderTop: "1px gray solid",
            background: "#f0f2f5",
          }}
        >
        </div>
        <Box>
          <Typography
            sx={{
              marginTop: "45px",
              marginRight: "20px",
              color: "black",
            }}
          >
            <h3 style={{ color: "#717377" }}>Contacts</h3>
          </Typography>
        </Box>
        <Box
          style={{ width: "280px", display: "flex", flexDirection: "column" }}
        >
          {friendlist.map((post) => (
            <Box
              key={post.id}
              style={{
                marginBottom: "5%",
              }}
            >
              <Box style={{ display: "flex", flexDirection: "row"}}>
                <Box>
                  <img
                    style={{
                      width: "35px",
                      hight: "35px",
                      borderRadius: "100%",
                    }}
                    src={friends}
                  ></img>
                </Box>
                <Box style={{marginLeft: "12px", marginTop: "-10px"}}>
                  <a href="#" style={{ fontSize: "14px" }}>
                    <h3>{post.senderName}</h3>
                  </a>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

      </div>
    </>
  );
};

export default Rightsidebar;
