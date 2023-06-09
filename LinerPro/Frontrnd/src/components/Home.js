import {  Button, Container} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import About from "./About";
import ContactUs from "./ContactUs";
import "../style/Home.css";
import Highlight from "../img/Highlight.jpg";

const Home = () => {
  return (
    <>
      <div id="Home" className="homeBody" style={{ background: "#fbfbfb"}}>
        <div style={{ marginLeft: "7%", marginTop: "20%" }}>
          <h1 style={{ width: "500px"}}>We have extended the reading experience.</h1>
          <div style={{ marginLeft: "50%", marginTop: "15%" }}>
            <Link to="/SignUp">
              <Button type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{
                  mt: 3, mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                style={{
                  width: "55%",
                  background: "black"
                }}
              >
                Get Register
              </Button>
            </Link>
          </div>
        </div>
        <Container className="homeBody" maxWidth="xl">
          <img src={Highlight} style={{ display: "flex", alignContent: "flex-end", marginLeft: "-42px"}}>
          </img>
        </Container>
      </div>
      <div style={{ display: "flex", flexDirection: "row", bgcolor: "black" }}>
        <div style={{ width: "50%", height: "50%", textAlign: "center", marginTop: "0%", background: "#e5e4d2" }}>
          <h1 style={{ marginTop: "15%" }}>Vision</h1>
          <h3 style={{ marginBottom: "17.75%", fontWeight: "normal" }}>To be the foremost driver that pioneers the latest<br /> technological breakthroughts to propel our <br />society toward the perfect blend of science and art.</h3>
        </div>
        <div style={{ width: "50%", height: "50%", textAlign: "center", marginTop: "0%", background: "#ebb2b9" }}>
          <h1 style={{ marginTop: "15%" }}>Motto</h1>
          <h3 style={{ marginBottom: "20%", fontWeight: "normal" }}>If oppertunity doesn't knock,<br /> build a door.</h3>
        </div>
      </div>
      <About />
      <ContactUs />
    </>
  );
};

export default Home;
