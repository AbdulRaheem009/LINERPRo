const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId, // Generate new ObjectId for each new comment
    postId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to parent post
      ref: 'Post',
      required: [true, "Please provide a postId"]
    },
    Email: {
      type: String,
      trim: true,
      required: [true, "Please provide an Email"],
    },
    commentData: {
      type: String,
      required: [true, "Please provide a Comment"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", UsersSchema);
