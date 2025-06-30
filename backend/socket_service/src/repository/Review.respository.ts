import { error } from "console";
import ReviewRespositoryInterface from "../interface/Review/Review.respository.interface";
import ReviewInput from "../model/dto/ReviewInput.dto";
import Reviews from "../model/Review";

export class ReviewRespository implements ReviewRespositoryInterface {
  async create(): Promise<string> {
    const review = new Reviews();
    return (await review.save())._id;
  }
  async getByID(
    id: string,
    offset: number
  ): Promise<ReviewInput[] | undefined> {
    return (
      await Reviews.findById(id, {
        reviews: { $slice: [10 * offset, 10] },
      })
    )?.reviews;
  }

  async update<T extends string | ReviewInput>(
    id: string,
    data: T,
    remove: boolean = false
  ): Promise<any> {
    console.log("typeof data", typeof data);
    if (!remove) {
      return (
        await Reviews.findByIdAndUpdate(
          id,
          {
            $push: { reviews: data },
          },
          { new: true, fields: { reviews: { $slice: -1 } } }
        )
      )?.reviews;
    } else {
      const isexist = await Reviews.exists({
        _id: id,
        "reviews._id": data,
      });

      if (!isexist) throw new Error("This Review is not exist");
      return (
        await Reviews.findByIdAndUpdate(
          id,
          {
            $pull: { reviews: { _id: data } },
          },
          { fields: { reviews: { $slice: -1 } } }
        )
      )?.reviews;
    }
  }
  async delete(id: string): Promise<void> {
    await Reviews.findByIdAndDelete(id);
  }
}
