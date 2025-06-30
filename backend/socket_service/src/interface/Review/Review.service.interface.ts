import ReviewInput from "../../model/dto/ReviewInput.dto";

export default interface ReviewServiceInterface {
  createReviews(): Promise<string>;
  getByIDReviews(id: string, offset: number): Promise<ReviewInput[]>;
  addReview<T extends string | ReviewInput>(
    id: string,
    data: T
  ): Promise<ReviewInput>;
  removeReview<T extends string | ReviewInput>(
    id: string,
    data: T
  ): Promise<ReviewInput>;
  deleteReviews(id: string): Promise<void>;
}
