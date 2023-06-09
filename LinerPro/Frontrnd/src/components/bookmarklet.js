
// expect= "bookmark";

function bookmark() {

(function () {
  console.log("Bookmark");
   const selObj = window.getSelection().toString;
   var url = window.location.href.toString;
   console.log("BookMarklet Js Page")
   if (selObj.toString != "") {
     console.log(selObj);
    // alert(url);
     //const selRange = selObj.getRangeAt(0);
   }
})();

}


export default bookmark;