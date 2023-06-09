const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/Users_model");
const { request } = require("express");
const Data = require("../models/Data_model");
const Like = require("../models/LikePost");
const sendEmail = require("../services/verifyEmail");
const Token = require("../models/Token_model");
const nlp = require('compromise');
const Friend = require("../models/FriendList_model");
const Comment= require("../models/Comment_model")
const mongoose = require('mongoose');
var dataEmail = "";
var dataName="";
const registerUser = asyncHandler(async (req, res) => {
  const { Name, Email, Password } = req.body;

  if (!Name || !Email || !Password) {
    res.status(400).send("Please add all fields");
  }

  //check id user exists
  const userExists = await User.findOne({ Email });

  if (userExists) {
    res.status(400).send("User already exists");
  }
  else {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create user
    const user = await User.create({
      Name,
      Email,
      Password: hashedPassword,
    });

    //Add in Data table
    //End of Data table entry
    if (user) {
      res.status(201).json({
        _id: user.id,
        Name: user.Name,
        Email: user.Email,
        token: generateToken(user._id),
      });
      const token = await new Token({
        userId: user._id,
        token: generateToken(user._id),
      }).save();
      const Body = `Hello ${user.Name},\n Thank yor for the being part of us. Please verify your email by clicking on link below.\n${process.env.BASE_URL}users/${user.id}/verify/${token.token}\n\nThanks and Regards.\nAdmin LinerPro`;
      await sendEmail(user.Email, "Verify Email", Body);

      res
        .status(201)
        .send({ message: "An Email sent to your account please verify" });
    }
    else {
      res.status(400).send("Invalid User data");
    }

  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
  dataEmail = Email;

  // Check for user email
  const user = await User.findOne({ Email });
    
  if (user && (await bcrypt.compare(Password, user.Password)) ) {

     if(user.userVerify==true){
    res.json({
      token: generateToken(user._id),
    });
  }
  else{
    res.status(400).send("Please Varify");
  }
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }
   
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { userVerified: true } }
    );

    await token.deleteOne({ _id: user._id });

    res.status(200).redirect("http://localhost:3000/SignIn");
  
});

//Read users data from database and show on web page

const blogPost = asyncHandler(async (req, res) => {
  const DataArray = await Data.find();
  console.log(dataEmail);
  const postdata = DataArray.filter(post => post.Email === dataEmail);
 
  res.status(200).json({ postdata });
});

//Friend Data
const friend_Post = asyncHandler(async (req, res) => {
  const UserEmail=req.query;
  console.log("Friend Post Function")
  
  console.log(req.query.UserEmail);
  const DataArray = await Data.find();

  const FriendData = DataArray.filter(post => post.Email ===req.query.UserEmail);
  const postdata=FriendData.filter(post => post.Privacy === "Public")

  res.status(200).json({ postdata });
});
//FriendList 
let friendArray;
let friendEmail=[];
const friendList = asyncHandler(async (req, res) => {
   friendArray=[];
  friendEmail=[];
   friendArray = await Friend.find({dataEmail});
  let size=friendArray.length;

  friendEmail[0]=dataEmail;
  for (let i = 0; i < size; i++) {

    if(dataEmail==friendArray[i].senderEmail ||dataEmail==friendArray[i].receverEmail )
    {

    friendEmail[i+1]=friendArray[i].senderEmail; // Store only the senderEmail in Friends
  }
}

})
  
const friendData = asyncHandler(async (req, res) => {
  await friendList();

  let FriendData=[];
  for (let i = 0; i < friendEmail.length; i++) {
  const posts = await Data.find({ });
  const friendPosts= posts
    .filter(post => post.Privacy === "Public")
   // .filter(post=>post.Email==friendEmail[i])   This can show only friend post
    .map(post => ({
      _id: post._id,
      Name:post.Name,
      Email: post.Email,
      Topic: post.Topic,
      Likes: post.Likes,
      PostUrl: post.PostUrl,
      PostData: post.PostData,
    }));
    FriendData.push(...friendPosts);
  }

  res.status(200).json({ FriendData });
});


const getMe = asyncHandler(async (req, res) => {
  const { _id, Name, Email, userVerified } = await User.findById(req.user.id);
  postID = _id;

  res.status(200).json({
    id: _id,
    Name,
    Email,
    userVerified,

  });

  if (!userVerified) {
    var token = await Token.findOne({
      userId: _id,
    });
    if (token == null) {
      token = await new Token({
        userId: _id,
        token: generateToken(_id),
      }).save();
    }
    const Body = `Hello ${Name},\n Thank yor for the being part of us.\nPlease verify your email by clicking on link below.\n${process.env.BASE_URL}users/${_id}/verify/${token.token}\n\nThanks and Regards.\nAdmin Start Smart`;
    await sendEmail(Email, "Verify Email", Body);
    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  }

});

const getVerified = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { userVerified: true } }
  );
  res.status(201).send({ isUpdated: true });
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const addlikes = asyncHandler(async (req, res) => {
  let { _id, Likes, Email } = req.body;

  PostID = _id;
  const alreadLike = await Like.findOne({ PostID });
 
  if (alreadLike) {
    _id = Object(alreadLike._id)
    const dele = await Like.findByIdAndDelete({ _id })
    Lik = Likes - 3;
    const result = await Data.findByIdAndUpdate(_id, { Likes: Lik });

  }
  else {
    const result = await Data.findByIdAndUpdate(_id, { Likes: Likes });
    const LikeData = await Like.create({
      UserEmail: Email,
      PostID: _id,
      isLike: true
    });

    if (LikeData) {
      res.status(201).json({
        _id: LikeData.id,
        UserEmail: LikeData.UserEmail,
        PostID: LikeData.PostID,
        isLike: LikeData.isLike,
        token: generateToken(LikeData._id),
      });

      const token = await new Token({
        userId: LikeData._id,
        token: generateToken(LikeData._id),
      }).save();

    }

  }


});

const changeToPublic = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  Privacy = "Public";
  const result = await Data.findByIdAndUpdate(_id, { Privacy: Privacy });

});
const changeToPrivate = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  Privacy = "Private";
  const result = await Data.findByIdAndUpdate(_id, { Privacy: Privacy });

});

const senddata = asyncHandler(async (req, res) => {
  const userData = await User.find({ Email: dataEmail });
  const userName = userData[0].Name;
  console.log(userName);
  
  if (dataEmail != "") {
    let { selectedText, selectedUrl } = req.body;

     console.log(selectedText);

    let Topic = selectedText && nlp(selectedText).topics().data()[0]?.text;
    console.log(Topic);
    let Email = dataEmail;
    let PostData = selectedText;
    let PostUrl = selectedUrl;
    let Name= userName
    // Logging the extracted topic
    

    console.log("267");
    const dataSet = await Data.create({
      Name,
      Email,
      Topic,
      PostData,
      PostUrl,
    });

    if (dataSet) {
      res.status(201).json({
        Name: dataSet.Name,
        Email: dataSet.Email,
        Topic: dataSet.Topic,
        Importance: "Green",
        Privacy: "Private",
        Likes: 0,
        PostData: dataSet.PostData,
        PostUrl: dataSet.PostUrl,
        token: generateToken(dataSet._id),
      });
      const token = await new Token({
        userId: dataSet._id,
        token: generateToken(dataSet._id),
      }).save();
      //console.log("Sucessful");
    }
  }
  else {
    //console.log("No user login");
  }
});
const changeToImportant = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  let Importance = "Red";
  const result = await Data.findByIdAndUpdate(_id, { Importance: Importance });

});
const changeToLessImportant = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  let Importance = "Green";
  const result = await Data.findByIdAndUpdate(_id, { Importance: Importance });

});
const deleatUserPost =asyncHandler(async(req,res)=>{
  const{_id }=req.body;
  const result=await Data.deleteOne({_id})
})
const followerData=asyncHandler(async(req,res)=>{
  const friendArray = await Friend.find({});
  let size=friendArray.length;
  var postdata = [];
  let j=0
  for (i = 0; i < size; i++) {
    if (friendArray[i].senderEmail == dataEmail ) {
      postdata[j] = friendArray[i].receverEmail;
      j++
    }
  }
  
  var Names=[]
  let co=0
  for (i = 0; i < j; i++) {
    const friendName = await User.find({ });
    const FName=friendName.filter(friendName=> friendName.Email==postdata[i])
   Names[co]=FName[i].Name
   co++;
  }
  console.log(Names);
console.log("354")
console.log(postdata)
  let FriendData=[];
  for (let i = 0; i < j; i++) {
  const posts = await Data.find({ });
  const friendPosts= posts
    .filter(post => post.Privacy === "Public")
    .filter(post=>post.Email==postdata[i])   
    .map(post => ({
      _id: post._id,
      Name:Names[0],
      Email: post.Email,
      Topic: post.Topic,
      Likes: post.Likes,
      PostUrl: post.PostUrl,
      PostData: post.PostData,
    }));
    FriendData.push(...friendPosts);
  }
console.log(FriendData);
  res.status(200).json({ FriendData });


})
const sharePost = asyncHandler(async (req, res) => {
  
  const { Name,Email, Topic, PostUrl, PostData } = req.body;
  var OwnerPost= dataEmail;
   const dataSet = await Data.create({
    Name,
    Email,
    Topic,
    PostData,
    PostUrl,
    OwnerPost,
  });

  if (dataSet) {
    res.status(201).json({
      Name: dataSet.Name,
      Email: dataSet.Email,
      Topic: dataSet.Topic,
      Importance: "Green",
      Privacy: "Public",
      Likes: 0,
      PostData: dataSet.PostData,
      PostUrl: dataSet.PostUrl,
      OwnerPost: dataEmail,
      token: generateToken(dataSet._id),
    });
    const token = await new Token({
      userId: dataSet._id,
      token: generateToken(dataSet._id),
    }).save();
    console.log("Sucessful");
  }

else {
  console.log("No user login");
}
});

const CommentData= asyncHandler(async(req,res)=>{
  const {postId,commentData}=req.body;
  console.log("426")
  
  var Email = dataEmail
  const _id = new mongoose.Types.ObjectId(); // Generate a new ObjectId for the _id field
  const comment=await Comment.create({
    _id,
    postId,
    Email,
    commentData,
    OwnerPost,
  });
  console.log(comment);
  if(comment){
    res.status(201).json({
      _id,
      postId:comment.postId,
      Email:comment.Email,
      commentData:comment.commentData,
      
    });
    const token = await new Token({
      userId: dataSet._id,
      token: generateToken(dataSet._id),
    }).save();
    console.log("Sucessful");
  }

  else {
    console.log("Failed");
  }  
});

const GetComment = asyncHandler(async (req, res) => {
  console.log("254")
  const comments = await Comment.find({ postId: req.query.postId });
  console.log(comments)
  res.status(200).json({ comments });
});


module.exports = {
  registerUser,
  loginUser,
  getMe,
  blogPost,
  verifyUser,
  getVerified,
  addlikes,
  changeToPrivate,
  changeToPublic,
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
};
