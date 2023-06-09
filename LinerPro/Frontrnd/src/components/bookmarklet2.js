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
