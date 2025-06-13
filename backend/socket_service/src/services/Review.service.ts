import ReviewServiceInterface from "../interface/Review/Review.service.interface";
import ReviewInput from "../model/dto/ReviewInput.dto";
import { ReviewRespository } from "../repository/Review.respository";
import { socketSercer } from "../server";
import { NotFoundError, APIError } from "../util/error/errors";

export default class ReviewService implements ReviewServiceInterface {
  repo: ReviewRespository;
  constructor() {
    this.repo = new ReviewRespository();
  }
  /// This Service Method is for RPC connection
  async createReviews(): Promise<string> {
    try {
      return this.repo.create();
    } catch (error) {
      console.log(error);
      throw new Error("SomeThing went wrong " + error);
    }
  }
  async deleteReviews(id: string): Promise<void> {
    try {
      await this.repo.delete(id);
    } catch (error) {
      throw error;
    }
  }
  /// This Service Method is for REST api
  async getByIDReviews(id: string, offset: number): Promise<ReviewInput[]> {
    try {
      const Reviews = await this.repo.getByID(id, offset);
      if (!Reviews) throw new NotFoundError("ReviewCollection is not found");
      return Reviews;
    } catch (error) {
      throw error;
    }
  }
  async addReview(id: string, data: ReviewInput): Promise<ReviewInput> {
    try {
      const addedReview = await this.repo.update(id, data);
      if (!addedReview) throw new Error("");
      socketSercer.socket.emit(id, { ...addedReview, remove: false });
      return addedReview;
    } catch (error) {
      throw error;
    }
  }
  async removeReview(id: string, data: ReviewInput): Promise<ReviewInput> {
    try {
      const removedReview = await this.repo.update(id, data, true);
      if (!removedReview) throw new Error("");
      socketSercer.socket.emit(id, { ...removedReview, remove: true });
      return removedReview;
    } catch (error) {
      throw error;
    }
  }
}
