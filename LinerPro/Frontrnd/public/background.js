// // document.getElementById('button').addEventListener('click', function() {
// //   chrome.tabs.create({ url: 'http://localhost:3000/mainMenu' });
// // });
// // document.getElementById("SelectText").addEventListener("click", function() {
// //   foo();
// // });

// // function foo() {
// //   const selObj = window.getSelection().toString();

// //   if (selObj != "") {
// //     var url = window.location.href;
// //     console.log(url)
// //     console.log(selObj);
// //   }
// //   else {
// //     console.log("No selected")
// //   }
// // }

// document.addEventListener("DOMContentLoaded", function() {
//   var openWebsiteButton = document.getElementById("open-website");
//   openWebsiteButton.addEventListener("click", function() {
//     chrome.tabs.create({ url: "http://localhost:3000/extensionUi" });
//   });
// });

// function foo() {
//   const selObj = window.getSelection().toString();

//   if (selObj != "") {
//     var url = window.location.href;
//     console.log(url)
//     console.log(selObj);
//   }
//   else {
//     console.log("No selected")
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   var highlightTextButton = document.getElementById("highlight-text");
//   highlightTextButton.addEventListener("click", function() {
//     foo();
//   });
// });


chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, "highlight");
});
