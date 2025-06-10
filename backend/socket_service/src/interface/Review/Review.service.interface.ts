import ReviewInput from "../../model/dto/ReviewInput.dto";

export default interface ReviewServiceInterface {
  createReviews(): Promise<void>;
  getByIDReviews(id: string): Promise<ReviewInput[] | null>;
  updateReviews(
    id: string,
    data: ReviewInput,
    remove: boolean
  ): Promise<ReviewInput>;
  deleteReviews(id: string): Promise<void>;
}
