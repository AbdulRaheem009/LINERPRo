import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../img/logo.png";
import React from "react";

const TabHistory = () => {

  const tabHistory = () => {
    // chrome.history.search({text: '', maxResults: 100}, function(data) {
    //     console.log(data);
    //   });
  }
  
  return (
    <div id="About" style={{ marginTop: "150px" }}>
      <Container style={{ textAlign: "center", marginTop: "0px" }}>
        <Typography variant="h4">About Us</Typography>
        <Box style={{ display: "flex" }}>
          <Box>
            <img src={Logo} style={{ height: "150px", marginTop: "85px", marginLeft: "-50px"}} />
          </Box>
          <Box>
            <h1>TabHistory</h1>
            <button onClick={()=>tabHistory()}> TabHistory</button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default TabHistory;
