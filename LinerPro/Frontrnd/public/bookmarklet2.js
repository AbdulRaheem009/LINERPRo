javascript:(function () {
    console.log("Bookmark");
  
    const selObj = window.getSelection().toString();
  
    if (selObj != "") {
      var url = window.location.href;
      alert(selObj);
      alert(url);
      var data = {
        selectedText: selObj,
        selectedUrl: url,
      };
      window.bookmarkData = data;
      fetch("http://localhost:5000/api/users/senddata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log(data);
            alert("Data saved successfully!");
          } else {
            console.log(data);
            alert("Error saving data.");
          }
        })
        .catch((error) => {
          console.log(data);
          alert("Error saving data.");
          console.error(error);
        });
    }
  })();
  
// javascript:(function() {
//   console.log("Bookmark");

//   const selection = window.getSelection();
//   let content = "";

//   if (selection.type === "Range") {
//     // If the selection is a range of text, extract it
//     content = selection.toString();
//   } else {
//     // Otherwise, check if the selection is an image or video
//     const node = selection.anchorNode.parentNode;

//     if (node.tagName === "IMG") {
//       // If the selection is an image, extract the URL
//       content = node.src;
//     } else if (node.tagName === "VIDEO") {
//       // If the selection is a video, extract the URL
//       content = node.src;
//     }
//   }

//   if (content !== "") {
//     const url = window.location.href;
//     const data = {
//       selectedContent: content,
//       selectedUrl: url,
//     };

//     // Send the data to the server
//     fetch("http://localhost:5000/api/users/senddata", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log(data);
//           alert("Data saved successfully!");
//         } else {
//           console.log(data);
//           alert("Error saving data.");
//         }
//       })
//       .catch((error) => {
//         console.log(data);
//         alert("Error saving data.");
//         console.error(error);
//       });
//   } else {
//     alert("No content selected.");
//   }
// })();
