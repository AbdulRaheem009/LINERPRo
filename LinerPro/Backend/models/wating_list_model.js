const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    senderName:{
      type: String,
      trim: true
    },
    receverName:{
      type:String,
    },
    senderEmail: {
      type: String,
      trim: true,
    },
    receverEmail: {
        type: String,
        trim: true,
      },
    Accepted: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Wating", UsersSchema);

