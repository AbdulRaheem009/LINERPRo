import { Button } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function ExtensionUI(){
  
    const selObj = window.getSelection().toString();
  
    if (selObj !== "") {
      const range = window.getSelection().getRangeAt(0);
      const newNode = document.createElement("span");
      newNode.style.backgroundColor = "#FFFF00";
      range.surroundContents(newNode);
    }
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "highlight") {
      highlightText();
    }
  });
  
