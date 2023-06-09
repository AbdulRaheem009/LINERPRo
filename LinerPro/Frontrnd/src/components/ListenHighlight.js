import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "../style/mainMenu.css";
import Sidebar from "./Sidebar";
import Rightsidebar from "./Rightsidebar";
import { useFormik } from "formik";
import { useContext } from "react";
import { global } from "../App";
import listen from "../img/listen.png";
import Condition from 'yup/lib/Condition';
function Listen() {
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
  useEffect(() => {
    userdata();
  }, []);
  const apiKey = 'eabfd2188cc148b391f0f78d7b6fe055';
  const [speech, setSpeech] = useState(null);

  //Listen Function

  const [audioElement, setAudioElement] = useState(null);

  const handleClick = (lan, Topic) => {
    const language = lan;
    const audioSrc = `http://api.voicerss.org/?key=${apiKey}&hl=${language}&src=${Topic}`;
  
    // Clear previous audio element
    if (audioElement) {
      audioElement.pause();
      audioElement.src = "";
    }
  
    // Create new audio element and play audio
    const audio = new Audio(audioSrc);
    setAudioElement(audio);
    audio.play();
  };
  const language =
    [
      { value: "ar-eg", Name: "	Arabic (Egypt)	" },
      { value: "ar-sa", Name: "	Arabic (Saudi Arabia)	" },
      { value: "bg-bg", Name: "	Bulgarian	" },
      { value: "ca-es", Name: "	Catalan	" },
      { value: "zh-cn", Name: "	Chinese (China)	" },
      { value: "zh-hk", Name: "	Chinese (Hong Kong)	" },
      { value: "zh-tw", Name: "	Chinese (Taiwan)	" },
      { value: "hr-hr", Name: "	Croatian	" },
      { value: "cs-cz", Name: "	Czech	" },
      { value: "da-dk", Name: "	Danish	" },
      { value: "nl-be", Name: "	Dutch (Belgium)	" },
      { value: "nl-nl", Name: "	Dutch (Netherlands)	" },
      { value: "en-au", Name: "	English (Australia)	" },
      { value: "en-ca", Name: "	English (Canada)	" },
      { value: "en-gb", Name: "	English (Great Britain)	" },
      { value: "en-in", Name: "	English (India)	" },
      { value: "en-ie", Name: "	English (Ireland)	" },
      { value: "en-us", Name: "	English (United States)	" },
      { value: "fi-fi", Name: "	Finnish	" },
      { value: "fr-ca", Name: "	French (Canada)	" },
      { value: "fr-fr", Name: "	French (France)	" },
      { value: "fr-ch", Name: "	French (Switzerland)	" },
      { value: "de-at", Name: "	German (Austria)	" },
      { value: "de-de", Name: "	German (Germany)	" },
      { value: "de-ch", Name: "	German (Switzerland)	" },
      { value: "el-gr", Name: "	Greek	" },
      { value: "he-il", Name: "	Hebrew	" },
      { value: "hi-in", Name: "	Hindi	" },
      { value: "hu-hu", Name: "	Hungarian	" },
      { value: "id-id", Name: "	Indonesian	" },
      { value: "it-it", Name: "	Italian	" },
      { value: "ja-jp", Name: "	Japanese	" },
      { value: "ko-kr", Name: "	Korean	" },
      { value: "ms-my", Name: "	Malay	" },
      { value: "nb-no", Name: "	Norwegian	" },
      { value: "pl-pl", Name: "	Polish	" },
      { value: "pt-br", Name: "	Portuguese (Brazil)	" },
      { value: "pt-pt", Name: "	Portuguese (Portugal)	" },
      { value: "ro-ro", Name: "	Romanian	" },
      { value: "ru-ru", Name: "	Russian	" },
      { value: "sk-sk", Name: "	Slovak	" },
      { value: "sl-si", Name: "	Slovenian	" },
      { value: "es-mx", Name: "	Spanish (Mexico)	" },
      { value: "es-es", Name: "	Spanish (Spain)	" },
      { value: "sv-se", Name: "	Swedish	" },
      { value: "ta-in", Name: "	Tamil	" },
      { value: "th-th", Name: "	Thai	" },
      { value: "tr-tr", Name: "	Turkish	" },
      { value: "vi-vn", Name: "	Vietnamese	" },
    ]
  const [languageValue, setlanguageValue] = useState(0);
  var count=0;
  const purchaseHandler1 = (e) => {
   
    console.log("143");
    console.log(language[languageValue].value);
    console.log(e);
    if(count==0){
    handleClick(language[languageValue].value,e);
    count=1}
  }

  return (
    <>
      <Box style={{ background: "#f0f2f5"}}>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "34%",
            marginTop: "5%"
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
              width: "220px"
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
              marginTop: "15px",
              marginLeft: "10px"
            }}
          >
            Search
          </Button>
          <Box>
          <select style={{ width: "140px", display: "center", marginLeft: "10px", height: "30px", border: "none", marginTop: "15px"}} onChange={(e) => { setlanguageValue(e.target.value); }}>
            {language.map((product, index) => {
              return (
                <option value={index} key={index}>
                  {product.value}-{product.Name}
                </option>
              );
            })}
          </select>
          </Box>
        </Box>
        <Box sx={{ width: "40%", marginTop: "10px", marginLeft: "30%" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            {user1.map(post => (
              <Box className="card" style={{ marginTop: "15px", width: "100%" }}>
                <Box>
                  <Box className="card-header" style={{ width: "250px",marginTop: "-80px", marginLeft: "-75px"}}>
                    <Box className="profile">
                      <span className="letter">K</span>
                    </Box>
                    <Box className="card-title-group" style={{ marginTop: "-16px" }}>
                      <h5 className="card-title">{user.Name}</h5>
                      {/* <div className="card-date">{props.date}</div> */}
                    </Box>
                  </Box>
                  <div style={{ width: "50px", marginLeft: "325px", marginTop: "-70px"}}>
                  <Button  onClick={() => purchaseHandler1(post.PostData)} variant="text" style={{background: "white", border: "none" }}>
                    <img style={{ width: "40px", borderRadius: "100%" }} src={listen} >
                    </img>
                    {/* handleClick(post.PostData) */}
                  </Button>
                  <Grid item xs={12} >
                    {speech && <audio autoPlay src={speech}></audio>}
                  </Grid>
                  </div>
                </Box>
                {/* <img className="card-image" src={food} alt="Logo" /> */}
                <div style={{ marginLeft: "-44px", marginTop: "45px",textAlign: "Left" }}><h3>{post.Topic}</h3></div>
                <Box className="card-text" style={{ textAlign: "Justify", marginLeft: "-20px" }}>{post.PostData}</Box>
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
      </Box>

      <Rightsidebar />
      <Sidebar />
    </>
  );
}

export default Listen;