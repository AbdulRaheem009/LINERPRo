const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  blogPost,
  getVerified,
  verifyUser,
  addlikes,
  changeToPublic,
  changeToPrivate,
  senddata,
  changeToImportant,
  changeToLessImportant,
  friendData,
  deleatUserPost,
  friend_Post,
  followerData,
  sharePost,
  CommentData,
  GetComment,
} = require("../controllers/usersControllers");

const{
  UserList,
  sendRequest,
  watingUserList,
  acceptRequest,
  deletePost,
  friendList,
  followRequest,
  

} = require("../controllers/manageFriendcontroller");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/datarequest",blogPost);
router.get("/userList",UserList);
router.get("/:id/verify/:token/", verifyUser);
router.put("/verifyUser/:id", getVerified);
router.post("/senderRequest",sendRequest);
router.post("/acceptRequest",acceptRequest);
router.get("/watingUserList", watingUserList);
router.post("/deletePost",deletePost);
router.get("/friendList", friendList);
router.post("/addlikes",addlikes);
router.post("/changeToPublic",changeToPublic);
router.post("/changeToPrivate",changeToPrivate);
router.post("/senddata",senddata);
router.post("/changeToImportant",changeToImportant);
router.post("/changeToLessImportant",changeToLessImportant);
router.get("/friendData", friendData);
router.post("/deleatUserPost",deleatUserPost);
router.get("/friend_Post",friend_Post);
router.get("/followerData",followerData);
router.post("/followRequest",followRequest);
router.post("/sharePost",sharePost);
router.post("/CommentData",CommentData);
router.get('/GetComment', GetComment);





module.exports = router;


// USEREMAIL = LinerPro95@gmail.com
// USERPASS = uogorbbvskkxktei