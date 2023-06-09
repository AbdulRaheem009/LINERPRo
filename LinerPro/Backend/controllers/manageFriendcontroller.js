const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Friend = require("../models/FriendList_model");
const Wating = require("../models/wating_list_model");
const User = require("../models/Users_model");

// Get User List
const UserList = asyncHandler(async (req, res) => {

  const UserArray = await User.find();
  const friendArray =await Friend.find();
  let size1=friendArray.length;
    let size2=UserArray.length
    let count=0;
  
     var temp=[]
     for(var i=0;i<size2;i++){
       var check=false;
       for (var j=0;j<size1;j++){
         if(friendArray[j].senderEmail==UserArray[i].Email)
         {
             check=true;         
            break;
         }
      }
       if(check==false)
       {
       temp[count]=UserArray[i]
       count=count+1;
       }   
      }  
  res.status(200).json({
    temp,
  });
});

//Send Requesr
const sendRequest = asyncHandler(async (req, res) => {
  const { senderName,receverName,senderEmail, receverEmail } = req.body;
  const user = await Wating.create({
    senderName,
    receverName,
    senderEmail,
    receverEmail,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      senderName: user.senderName,
      receverName: user.receverName,
      senderEmail: user.senderEmail,
      receverEmail: user.receverEmail,
      token: generateToken(user._id),
    });
    const token = await new Token({
      userId: user._id,
      token: generateToken(user._id),
    }).save();
  }
});

//Get WatingUser List
const watingUserList = asyncHandler(async (req, res) => {
  const UserEmail=req.query;

 
  const UserArray = await Wating.find();
  var size = UserArray.length;
  j = 0;

  var postdata = [];

  j = 0;
  for (i = 0; i < size; i++) {
    if (UserArray[i].receverEmail == req.query.Useremail) {
      postdata[j] = UserArray[i];
      j++;
    }
  }

  res.status(200).json({
    postdata,
  });
});

// Accept request

const acceptRequest = asyncHandler(async (req, res) => {
  const { friendName,receverName,senderEmail, receverEmail } = req.body;
  const user = await Friend.create({
    friendName,
    receverName,
    senderEmail,
    receverEmail,
  
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      friendName: user.friendName,
      receverName:user.receverName,
      senderEmail: user.senderEmail,
      receverEmail: user.receverEmail,
      
      token: generateToken(user._id),
    });
    const token = await new Token({
      userId: user._id,
      token: generateToken(user._id),
    }).save();
    removeList(user)
  }
});

const deletePost=asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const result=await Wating.deleteOne({_id})
 
});
  // Upadaed Follow request code
const friendList = asyncHandler(async (req, res) => {
  const UserEmail=req.query;
  const friendArray = await Friend.find({});
  let size=friendArray.length;
  var postdata = [];
  console.log("Firend List ", UserEmail);
  let j=0
  for (i = 0; i < size; i++) {
    if (friendArray[i].senderEmail == req.query.Useremail ) {
      postdata[j] = friendArray[i];
      j++
    }
  }
  console.log(postdata)
  res.status(200).json({
    postdata,
  });
});
const followRequest= asyncHandler(async(req,res)=>{
  const { senderEmail, receverEmail } = req.body;
  const UserArray = await User.find();
  let size=UserArray.length;
  let senderName=""
  for (let i=0;i<size;i++)
  {
    if(UserArray[i].Email==receverEmail)
    {
      senderName=UserArray[i].Name
    }
  }
  const user = await Friend.create({
    senderName,
    senderEmail,
    receverEmail,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      senderName: user.senderName,
      senderEmail: user.senderEmail,
      receverEmail: user.receverEmail,
      token: generateToken(user._id),
    });
    const token = await new Token({
      userId: user._id,
      token: generateToken(user._id),
    }).save();
    }
})

module.exports = {
  UserList,
  sendRequest,
  watingUserList,
  acceptRequest,
  deletePost,
  friendList,
  followRequest,
};
