import mongoose, { Schema, Types } from "mongoose";

const ReviewSchema = new Schema(
  {
    userID: { type: Types.ObjectId },
    text: {
      type: String,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
    },
  },
  { timestamps: true }
);

const ReviewsSchema = new Schema({
  reviews: [ReviewSchema],
});

const Reviews =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Reviews;
