import { Button } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function ExtensionUI(){
function foo() {
    const selObj = window.getSelection().toString();

    if (selObj != "") {
      var url = window.location.href;
      console.log(url)
      console.log(selObj);
    }
    else {
      console.log("No selected")
    }
    //const selRange = selObj.getRangeAt(0);

    // do stuff with the range
  }
  function WebPage(){
    //chrome.tabs.create({ url: "http://localhost:3000/" });
    console.log("New web page");
  }
return(
    <Container style=  {{  marginTop: "100px" ,marginLeft: "50%"}}>
        <p>Hi I am good Coder</p>
    <Button onClick={()=>WebPage()} > Open Main WebSite</Button>
    <Button onClick={() => foo()}>Highlite Text</Button>
    </Container>
);
}
export default ExtensionUI;
