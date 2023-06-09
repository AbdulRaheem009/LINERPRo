import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../style/mainMenu.css";
import Sidebar from "./Sidebar";
import Rightsidebar from "./Rightsidebar";
import { useContext } from "react";
import { global } from "../App";
import { toast } from "react-toastify";
import likeicon from "../img/likeicon.png";
import commenticon from "../img/commenticon.png";
import comment from "../img/comment.png";
import closeButton from "../img/closeButton.png";
import Topbar from "./Topbar";
import heartFill from "../img/heart-fill.png";
import heartOutline from "../img/heart-outline.png";
import mypost from "../img/mypost.png";
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/modal';

function MyPost() {
  const [user1, setUser1] = useState([]);
  const { user, setUser } = useContext(global);
  const [temp, settemp] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentDa, setcommentDa] = useState([]);
  const [modelID, setmodelID] = useState('');
  const [modelData, setmodelData] = useState('');
  const [modelEmail, setmodelEmail] = useState('');
  var searchPost = [];
  //New Comments Post
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
  //Comment
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
          console.log(user1);
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


  const changeToPubilc = (privacy, _id) => {


    if (privacy == "Public") {
      alert("Post is already Public ")
    }
    else {
      const userObj = {
        _id: _id,

      };
      console.log(userObj)
      axios
        .post("http://localhost:5000/api/users/changeToPublic", userObj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          alert("Successfil");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });

      var size = user1.length;
      var j = 0;
      for (var i = 0; i < size; i++) {
        if (_id == user1[i]._id) {
          user1[i].Privacy = "Publiuc";
          break;
        }
      }

    }
  }
  const changeToPrivate = (privacy, _id) => {


    if (privacy == "Private") {
      alert("Post is already Private ")
    }
    else {
      const userObj = {
        _id: _id,
      };
      console.log(userObj)
      axios
        .post("http://localhost:5000/api/users/changeToPrivate", userObj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          alert("Successfil");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
      var size = user1.length;
      var j = 0;
      for (var i = 0; i < size; i++) {
        if (_id == user1[i]._id) {
          user1[i].Privacy = "Private";
          console.log("data Change")
          break;
        }
      }
    }
  }
  const DeletePost = (_id) => {
    const userObj = {
      _id: _id
    }
    console.log(userObj);
    axios
      .post("http://localhost:5000/api/users/deleatUserPost", userObj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        alert("Successfil");
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
    alert("Deleted Sucessfull")
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


  async function recommendArticles(url, topic) {
    try {
      // fetch user data
      const response = await axios.get("http://localhost:5000/api/users/friendData", {
        headers: {
          Authorization: `Bearer ${JSON.parse(window.sessionStorage.getItem("userToken"))}`,
        },
      });
      const userData = response.data.FriendData;

      // calculate total number of words in topic
      const totalWordsInTopic = topic ? topic.trim().split(/\s+/).length : 1;

      // sort articles by relevance to user input
      const sortedArticles = userData.sort((a, b) => {
        const aMatchCount = getMatchCount(a, topic);
        const bMatchCount = getMatchCount(b, topic);
        const aMatchProbability = aMatchCount / (a.Topic.trim().split(/\s+/).length || 1);
        const bMatchProbability = bMatchCount / (b.Topic.trim().split(/\s+/).length || 1);
        return bMatchProbability - aMatchProbability;
      });

      // filter articles with match probability greater than 60%
      const recommendedArticles = sortedArticles.filter((article) => {
        const matchCount = getMatchCount(article, topic);
        const matchProbability = matchCount / (article.Topic.trim().split(/\s+/).length || 1);
        return matchProbability > 0.6;
      }).slice(0, 5);

      console.log("Recommended articles:", recommendedArticles);

      // return recommended articles
      return recommendedArticles;
    } catch (error) {
      console.error(error);
    }
  }

  function getMatchCount(article, topic) {
    let matchCount = 0;
    if (topic && article.Topic === topic) {
      matchCount++;
    }

    return matchCount;
  }


  return (
    <>
      <Topbar />
      <Box style={{ background: "#f0f2f5" }}>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "35%",
            marginTop: "2%",
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
              width: "340px",
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
        </Box>
        {/* <Box>
      <Grid item xs={12} style=  {{marginLeft: "270px", border: "1px solid"}}>
          <select style={{ width: "25 %", display: "center", marginLeft: "10px", height: "30px"}} onChange={(e) => { setImportanceValue(e.target.value); }}>
            {Importance.map(( product, index) => {
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
            style={{height: "30px", marginLeft: "10px"}}
          >
            Importance
          </Button>
        </Grid>
      </Box> */}
        {/* <Box sx={{ width: "100%", display: "flex", flexDirection: "row", height: "200px", border: "1px solid"}}>
        <button onClick={download} className="Download" variant="contained"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                style={{
                  width: "100px",
                  height: "30px",
                  marginTop: "15px",
                  background: "green",
                  color: "white"
                }}>
          Download
        </button>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "400px",
          }}
        >
          <br/>
          <TextField
            id="search"
            name="search"
            type="text"
            label="Enter Topic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: "200px",
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
              width: "100px",
              height: "30px",
              marginTop: "10px",
              marginLeft: "10px"
            }}
          >
            Search
          </Button>
        </Box>
        <Grid item xs={12} style=  {{marginLeft: "270px", border: "1px solid"}}>
          <input 
          placeholder= "Enter Topic" id="listen" style= {{height: "50px"}}>

          </input>
          <select style={{ width: "20%", display: "center", marginLeft: "10px", height: "30px"}} onChange={(e) => { setlanguageValue(e.target.value); }}>
            {language.map((product, index) => {
              return (
                <option value={index} key={index}>
                  {product.value}-{product.Name}
                </option>
              );
            })}
          </select>
          <Button
            variant="contained"
            color="primary"
            onClick={purchaseHandler1}
            style={{height: "30px", marginLeft: "10px"}}
          >
            Listen
          </Button>
        </Grid>
        <Grid item xs={12} >
          {speech && <audio autoPlay src={speech}></audio>}
        </Grid>
      </Box> */}
        <Box sx={{ width: "40%", marginLeft: "30%" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            {user1.map(post => (
              <Box className="card" style={{ marginTop: "15px", width: "100%" }}>
                <Box className="card-header" style={{ width: "200%", marginTop: "-80px", marginLeft: "-65px", display: "flex", flexDirection: "row" }}>
                  <Box style={{ width: "50%", display: "flex", flexDirection: "row" }}>
                    <div className="profile" style={{ marginLeft: "-10px" }}>
                      <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={mypost} >
                      </img>
                    </div>

                    <div className="card-title-group" style={{ marginTop: "-10px" }}>
                      <h5 className="card-title">{user.Name}</h5>
                      <h9>{post.Privacy}</h9>
                      <div>
                        {post.OwnerPost ? (
                          <div>
                            <hr style={{ marginLeft: "-20%", width: "200%", color: "black" }}></hr>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                              <div className="profile" style={{ marginLeft: "-10px" }}>
                                <img style={{ width: "40px", height: "40px", borderRadius: "40/2" }} src={mypost} >
                                </img>
                              </div>
                              <h5 className="card-title" style={{ marginBottom: "-5%", marginTop: "7%" }}>{post.OwnerPost}</h5>
                            </div>
                          </div>
                        ) :
                          (<h5 className="card-title"></h5>)}
                      </div>
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
                      <button onClick={() => changeToPubilc(post.Privacy, post._id)} style={{ width: "60px", border: "none", borderRadius: "4px" }}>Public</button>
                      <button onClick={() => changeToPrivate(post.Privacy, post._id)} style={{ width: "60px", border: "none", borderRadius: "4px" }}>Private</button>
                      <button onClick={() => DeletePost(post._id)} style={{ width: "60px", border: "none", borderRadius: "4px" }}>Delete</button>
                      <button
                        onClick={() => {
                          recommendArticles(post.PostUrl, post.Topic).then((recommendedArticles) => {
                            const popupOptions = "width=600,height=500,resizable=yes,scrollbars=yes,status=yes";
                            const win = window.open("", "Recommended Articles", popupOptions);
                            win.document.write(`<h1>Recommended Articles</h1>`);
                            recommendedArticles.forEach((article) => {
                              win.document.write(`
          <div>
            <h3>${article.Topic}</h3>
            <p>${article.PostData}</p>
            <a href="${article.PostUrl}" target="_blank">${article.PostUrl}</a>
          </div>
        `);
                            });
                          });
                        }}
                        style={{ width: "40px", border: "none", borderRadius: "4px" }}
                      >
                        Recommend
                      </button>

                    </div>
                  </Box>
                </Box>
                {post.OwnerPost ?
                  (
                    <div style={{ border: "1px solid", width: "135%", marginLeft: "-10%" }}>
                      {/* <img className="card-image" src={food} alt="Logo" /> */}
                      <a href={post.PostUrl} target="_blank">
                        <div style={{ textAlign: "Left", marginLeft: "1%" }}><h3>{post.Topic}</h3></div>
                      </a>
                      <div className="card-text" style={{ textAlign: "Justify", marginLeft: "4%" }}>{post.PostData}</div>
                    </div>)
                  :
                  (
                    <div>{/* <img className="card-image" src={food} alt="Logo" /> */}
                      <a href={post.PostUrl} target="_blank">
                        <div style={{ marginLeft: "-44px", textAlign: "Left" }}><h3>{post.Topic}</h3></div>
                      </a>
                      <Box className="card-text" style={{ textAlign: "Justify", marginLeft: "-20px" }}>{post.PostData}</Box>
                      <br></br>
                    </div>
                  )
                }
                <Box style={{ display: "flex", flexDirection: "row", marginBottom: "-8%", marginTop: "5%", marginLeft: "-20%" }}>
                  <img className="card-like-icon" src={likeicon} alt="Logo" style={{ width: "19px", height: "19px", borderRadius: "19/2" }} />
                  <div style={{ marginTop: "-21px" }}>
                    <h4>{post.Likes}</h4>
                  </div>
                </Box>
                <hr style={{ marginLeft: "-20%", width: "135%", color: "black" }}></hr>
                <Box className="card-like-bar" style={{ marginTop: "8%", marginBottom: "-80px", marginLeft: "-84px" }}>
                  <div style={{ marginLeft: "23%", display: "flex", flexDirection: "row" }}>

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
                    <Button onClick={() => handleClick(post._id, post.PostData, post.Email)} style={{ marginTop: "-19%", marginLeft: "70%", display: "flex", flexDirection: "row" }}>
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
                                    <Box style={{ marginLeft: "20px", marginTop: "-36px", backgroundColor: "#f0f2f5" }}>
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
                            close
                          </Button>
                          <Button onClick={() => setShowModal(false)} style={{ marginTop: "-80%", width: "30%", paddingBottom: "70%" }}>
                            close
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

export default MyPost;