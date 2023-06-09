import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import "../style/mainMenu.css";
import Sidebar from "./Sidebar";
import Rightsidebar from "./Rightsidebar";
import { useContext } from "react";
import { global } from "../App";
import { toast } from "react-toastify";
import Topbar from "./Topbar";
import shareicon from "../img/shareicon.png";
import likeicon from "../img/likeicon.png";
import commenticon from "../img/commenticon.png";
import heartFill from "../img/heart-fill.png";
import heartOutline from "../img/heart-outline.png";
import { useLocation } from 'react-router-dom';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/modal';
import comment from "../img/comment.png";
import closeButton from "../img/closeButton.png";

function FriendData() {


  const [user1, setUser1] = useState([]);
  const { user, setUser } = useContext(global);
  const [temp, settemp] = useState([]);
  var searchPost = [];
  const location = useLocation();
  const email = location.state.email;
  //Get Data From Backend 

  function userdata() {
    console.log("Friend Data Page ")
    console.log(email)
    if (window.sessionStorage.getItem("userToken")) {

      axios
        .get("http://localhost:5000/api/users/friend_Post?", { params: { UserEmail: email } }, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.sessionStorage.getItem("userToken")
            )}`,
          },
        })
        .then((res) => {
          setUser1(res.data.postdata);
        });
    }
  }
  useEffect(() => {
    userdata();

  }, []);


  //Add Likes
  var Post_ID = []
  const addlikes = (likes, _id, email) => {

    var check = false
    for (let x of Post_ID) {
      if (_id == x) {
        check = true
      }

    }
    if (check == false) {
      Post_ID.push(_id)
      const userObj = {
        _id: _id,
        Likes: likes + 1,
        Email: email,

      };
      console.log(userObj)
      axios
        .post("http://localhost:5000/api/users/addlikes", userObj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          alert("Successfil");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
    else {
      console.log("All ready liked")


    }
  }



  //Search Data
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
  //Follow Code
  const followFun = () => {
    const userObj = {
      senderEmail: user.Email,
      receverEmail: email,
    };
    axios
      .post("http://localhost:5000/api/users/followRequest", userObj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        alert("Successful");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }
  //Share Post
  const SharePost = (Topic, PostUrl, PostData) => {
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

    const userObj = {
      Name: user.Name,
      Email: user.Email,
      Topic: Topic,
      PostUrl: PostUrl,
      PostData: PostData,
    }
    axios
      .post("http://localhost:5000/api/users/sharePost", userObj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        alert("Successfil");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  const CommentPost = (postId, commentData) => {

    if (commentData) {
      const userObj = {
        postId: postId,
        commentData: commentData
      }
      axios
        .post("http://localhost:5000/api/users/CommentData", userObj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          alert("SuccessFull");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
    handleClick(modelID)

  }

  const [showModal, setShowModal] = useState(false);

  const [commentDa, setcommentDa] = useState([]);
  const [modelID, setmodelID] = useState('');
  const [modelData, setmodelData] = useState('');
  const [modelEmail, setmodelEmail] = useState('');
  const handleClick = (postID, PostData, Email) => {
    console.log(postID);
    if (window.sessionStorage.getItem("userToken")) {
      axios
        .get("http://localhost:5000/api/users/GetComment", { params: { postId: postID } }, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.sessionStorage.getItem("userToken")
            )}`,
          },
        })
        .then((res) => {
          setcommentDa(res.data.comments)
        });
    }
    setmodelID(postID)
    setShowModal(true);
    setmodelData(PostData)
    setmodelEmail(Email)
  }
  return (
    <>
      <Topbar />
      <Box style={{ background: "#f0f2f5" }}>
        {/* Follow Button Code */}
        <Box>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
          sx={{
            marginLeft: "45%",
          }} 
          style={{
            width: "100px",
            height: "30px",
            marginTop: "20px",
          }}
          onClick={() => followFun()}>Follow
          </Button>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "35%",
          }}
        >
          <br />
        </Box>
        <Box sx={{ width: "40%", marginLeft: "30%" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            {user1.map(post => (
              <Box className="card" style={{ marginTop: "15px", width: "100%" }}>
                <Box className="card-header" style={{ width: "200%", marginTop: "-80px", marginLeft: "-65px", display: "flex", flexDirection: "row" }}>
                  <Box style={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <div className="profile" style={{ marginLeft: "-10px" }}>
                      <span className="letter">K</span>
                    </div>
                    <div className="card-title-group" style={{ marginTop: "-16px" }}>
                      <h5 className="card-title">{post.Name}</h5>
                      <h9>{post.Privacy}</h9>
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
                    </div>
                  </Box>
                </Box>
                {/* <img className="card-image" src={food} alt="Logo" /> */}
                <a href={post.PostUrl} target="_blank">
                  <div style={{ marginLeft: "-44px", textAlign: "Left" }}><h3>{post.Topic}</h3></div>
                </a>
                <Box className="card-text" style={{ textAlign: "Justify", marginLeft: "-20px" }}>{post.PostData}</Box>
                <br></br>
                <Box style={{ display: "flex", flexDirection: "row", marginBottom: "-8%", marginLeft: "-20%" }}>
                  <img className="card-like-icon" src={likeicon} alt="Logo" style={{ width: "19px", height: "19px", borderRadius: "19/2" }} />
                  <div style={{ marginTop: "-21px" }}>
                    <h4>{post.Likes}</h4>
                  </div>
                </Box>
                <hr style={{ marginLeft: "-20%", width: "135%", color: "black" }}></hr>
                <Box className="card-like-bar" style={{ marginTop: "8%", marginBottom: "-80px", marginLeft: "-84px" }}>
                  <div style={{ marginLeft: "12%", display: "flex", flexDirection: "row" }}>

                    <Button onClick={() => addlikes(post.Likes, post._id, post.Email)} style={{ background: "none", border: "none", marginTop: "-31px", display: "flex", flexDirection: "row", marginLeft: "-2%" }}>
                      <div>
                        {post.liked ? (
                          <img className="card-like-icon" src={heartFill} alt="Logo" style={{ width: "18px", height: "18px", borderRadius: "18/2" }}>
                          </img>
                        ) : (
                          <img className="card-like-icon" src={heartOutline} alt="Logo" style={{ width: "18px", height: "18px", borderRadius: "18/2" }} />
                        )}
                      </div>
                      <p style={{ fontSize: "16px", color: "black", marginTop: "6px", marginLeft: "4px" }}>Like</p>
                    </Button>
                    <Button style={{ marginTop: "-12%", marginLeft: "18%", display: "flex", flexDirection: "row" }} onClick={() => SharePost(post.Topic, post.PostUrl, post.PostData)}>
                      <img className="card-like-icon" src={shareicon} alt="Logo" style={{ width: "40px", height: "40px", borderRadius: "40/2" }} />
                      <p style={{ marginLeft: "-20px", fontSize: "16px", color: "black", marginLeft: "4px" }}>Share</p>
                    </Button>
                    <Button onClick={() => handleClick(post._id, post.PostData, post.Email)} style={{ marginTop: "-12%", marginLeft: "29%", display: "flex", flexDirection: "row" }}>
                      <img className="card-like-icon" src={commenticon} alt="Logo" style={{ width: "17px", height: "17px", borderRadius: "17/2" }} />
                      <p style={{ fontSize: "16px", color: "black", marginLeft: "8px" }}>Comment</p>
                    </Button>
                    <Box>
                      <Modal
                        show={showModal}
                        setShow={setShowModal}
                      // hideCloseButton
                      >
                        <ModalHeader>
                          <h2>Modal header</h2>
                        </ModalHeader>
                        <ModalBody>
                          <Box className="cardComment" style={{ marginTop: "15px" }}>
                            <Box className="card-header" style={{ marginTop: "-80px", marginLeft: "-65px" }}>
                              <Box style={{ width: "200%", display: "flex", flexDirection: "column" }}>
                                <Box style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                                  <div className="profile" style={{ marginLeft: "-10px" }}>
                                    <icon style={{ width: "40px", height: "40px", borderRadius: "40/2" }} className="letter">K</icon>
                                  </div>
                                  <div className="card-title-group">
                                    <h2 className="card-title" style={{ cursor: "pointer" }}>{modelEmail}</h2>
                                  </div>
                                </Box>
                                <div style={{ textAlign: "Left" }}><h3>{post.Topic}</h3></div>
                                <Box className="card-text" style={{ textAlign: "Justify", marginLeft: "25px" }}>{post.PostData}</Box>
                                <br></br>
                                <hr style={{ width: "108%", color: "black" }}></hr>
                                <Box className="card-like-bar" style={{ marginBottom: "-7%", marginTop: "4%" }}>
                                  <div style={{ marginLeft: "22%", display: "flex", flexDirection: "row" }}>
                                    <Button onClick={() => addlikes(post.Likes, post._id, post.Email)} style={{ background: "none", border: "none", marginTop: "-31px", display: "flex", flexDirection: "row", marginLeft: "-2%" }}>
                                      <div>
                                        {post.liked ? (
                                          <img className="card-like-icon" src={heartFill} alt="Logo" style={{ width: "18px", height: "18px", borderRadius: "18/2" }}>
                                          </img>
                                        ) : (
                                          <img className="card-like-icon" src={heartOutline} alt="Logo" style={{ width: "18px", height: "18px", borderRadius: "18/2" }} />
                                        )}
                                      </div>
                                      <p style={{ fontSize: "16px", color: "black", marginTop: "6px", marginLeft: "4px" }}>Like</p>
                                    </Button>
                                    <Button style={{ marginTop: "-22%", marginLeft: "45%", display: "flex", flexDirection: "row" }} onClick={() => SharePost(post.Topic, post.PostUrl, post.PostData)}>
                                      <img className="card-like-icon" src={shareicon} alt="Logo" style={{ width: "40px", height: "40px", borderRadius: "40/2" }} />
                                      <p style={{ marginLeft: "-20px", fontSize: "16px", color: "black", marginLeft: "4px" }}>Share</p>
                                    </Button>
                                  </div>
                                </Box>
                                <hr style={{ marginBottom: "10px", width: "108%", color: "black" }}></hr>
                                {commentDa.map(com => (
                                  <Box style={{ display: "flex", flexDirection: "column" }}>
                                    <Box style={{ display: "flex", flexDirection: "row" }}>
                                      <div className="profile" style={{ marginLeft: "-10px", width: "25px", height: "25px" }}>
                                        <span style={{ fontSize: "20px" }}>L</span>
                                      </div>
                                    </Box>
                                    <Box style={{ marginLeft: "20px", marginTop: "-36px", backgroundColor: "#f0f2f5", borderRadius: "4px" }}>
                                      <div className="card-title-group" style={{ marginTop: "0px", marginTop: "-10px", marginLeft: "3px" }}>
                                        <h3 style={{ cursor: "pointer", fontSize: "15px", fontWeight: "bold" }}>{com.Email}</h3>
                                      </div>
                                      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "-12px", marginBottom: "-1px", marginLeft: "5px" }}>{com.commentData}</h3>
                                    </Box>
                                    <br></br>
                                  </Box>
                                ))}

                              </Box>
                            </Box>
                          </Box>
                          <div style={{ marginLeft: "34.25%", marginTop: "-5px" }}>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              CommentPost(modelID, e.target.commentData.value);
                            }}>
                              <input
                                id="commentData"
                                name="commentData"
                                type="text"
                                label=" Enter Comment"
                                placeholder="  Enter Comment"
                                borderRadius="20px"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  width: "47.4%",
                                  height: "40px",
                                  border: "none"
                                }}
                                value={formik.values.commentData}
                              />
                              <Box style={{ display: "flex", flexDirection: "row", marginTop: "-4%", marginLeft: "43.5%" }}>
                                <button type="submit" style={{ background: "none", border: "none" }}>
                                  <img style={{ width: "30px", height: "30px", borderRadius: "30/2" }} src={comment} >
                                  </img>
                                </button>
                              </Box>
                            </form>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button onClick={() => setShowModal(false)} style={{ marginTop: "-80%", marginLeft: "61%" }}>
                            <img style={{ width: "25px", height: "25px", borderRadius: "25/2" }} src={closeButton} >
                            </img>
                          </Button>
                          <Button onClick={() => setShowModal(false)} style={{ marginTop: "-80%", marginLeft: "68%", width: "30%", paddingBottom: "70%" }}>
                          </Button>
                          <Button onClick={() => setShowModal(false)} style={{ marginTop: "-80%", width: "30%", paddingBottom: "70%" }}>
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </Box>
                  </div>
                </Box>
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

export default FriendData;