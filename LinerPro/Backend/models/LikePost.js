const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {

    UserEmail: {
      type: String,
      trim: true,
      required: [true, "Please Add Your Email"],
    },
    PostID:{
      type: Object
    },
    isLike: {
      type: Boolean
      
    }
  },

);

module.exports = mongoose.model("Lisk", UsersSchema);

