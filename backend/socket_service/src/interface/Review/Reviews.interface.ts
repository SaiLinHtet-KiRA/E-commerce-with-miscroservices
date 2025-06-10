import ReviewInput from "../../model/dto/ReviewInput.dto";

export default interface Reviews {
  _id: string;
  reviews: ReviewInput[];
}
