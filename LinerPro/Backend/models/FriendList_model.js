const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      trim: true,
    },
    senderEmail: {
      type: String,
      trim: true,
    },
    receverEmail: {
        type: String,
        trim: true,
      }, 
    },

  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Friend", UsersSchema);

