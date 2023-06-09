const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    Name:{
      type: String,
    },
    Email: {
      type: String,
      trim: true,
      required: [true, "Please Add Your Email"],
    },
    Topic: {
      type: String,
      //required: [true, "Please Add Topic "],
    },
    Importance: {
      type: String,
      default: "Red",
    },
    Privacy: {
      type: String,
      default: "Private",
    },
    Likes: {
      type: Number, 
      default: "0",
    },
    PostData: {
      type: String,
      //required: [true, "Please Add Data"],
    },
    PostUrl:{
      type: String,
    },
    OwnerPost:{
      type: String,
    },
    OwnerName:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Data", UsersSchema);

