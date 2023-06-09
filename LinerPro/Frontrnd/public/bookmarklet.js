(function (){
console.log("Bookmark");

const selObj = window.getSelection().toString();
    
    if (selObj != "" ){
    var url=window.location.href;
    alert(selObj)
    alert(url);}
   


}
)();

