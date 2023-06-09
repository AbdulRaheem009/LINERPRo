document.addEventListener("DOMContentLoaded", function() {
  console.log("popuup");
    var myButton = document.getElementById("myButton");
    myButton.addEventListener("click", function() {
      chrome.runtime.sendMessage({action: "open_new_tab"});
    });
  });
  