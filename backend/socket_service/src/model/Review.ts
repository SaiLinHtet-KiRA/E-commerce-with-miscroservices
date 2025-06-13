import mongoose, { Schema, Types } from "mongoose";
import Reviews from "../interface/Review/Reviews.interface";

const ReviewSchema = new Schema(
  {
    userID: { type: Number, require: [true, "UserID is Required"] },
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
  reviews: { type: [ReviewSchema], default: [] },
});

const Reviews = mongoose.model<Reviews>("Review", ReviewsSchema);
export default Reviews;
