import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String, required: true },
    likes: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: { type: String },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', PostSchema)

export default Post
