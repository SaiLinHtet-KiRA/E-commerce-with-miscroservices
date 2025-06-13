import ReviewInput from "../../model/dto/ReviewInput.dto";

export default interface ReviewServiceInterface {
  createReviews(): Promise<string>;
  getByIDReviews(id: string, offset: number): Promise<ReviewInput[]>;
  addReview(id: string, data: ReviewInput): Promise<ReviewInput>;
  removeReview(id: string, data: ReviewInput): Promise<ReviewInput>;
  deleteReviews(id: string): Promise<void>;
}
