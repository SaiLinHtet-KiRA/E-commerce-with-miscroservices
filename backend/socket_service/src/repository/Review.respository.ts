import ReviewRespositoryInterface from "../interface/Review/Review.respository.interface";
import ReviewInput from "../model/dto/ReviewInput.dto";
import Reviews from "../model/Review";

export class ReviewRespository implements ReviewRespositoryInterface {
  async create(): Promise<void> {
    await Reviews.create();
  }
  async getByID(id: string): Promise<ReviewInput[] | null> {
    return await Reviews.findById(id);
  }
  async update(
    id: string,
    data: ReviewInput,
    remove: boolean = false
  ): Promise<any> {
    if (!remove) {
      return await Reviews.findByIdAndUpdate(id, {
        $add: { reviews: data },
      });
    } else {
      return await Reviews.findByIdAndUpdate(id, {
        $pull: { reviews: { _id: data._id } },
      });
    }
  }
  async delete(id: string): Promise<void> {
    await Reviews.findByIdAndDelete(id);
  }
}
