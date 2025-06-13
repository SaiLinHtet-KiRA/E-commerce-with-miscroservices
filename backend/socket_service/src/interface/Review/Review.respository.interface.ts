import ReviewInput from "../../model/dto/ReviewInput.dto";

export default interface ReviewRespositoryInterface {
  create(): Promise<string>;
  getByID(id: string, offset: number): Promise<ReviewInput[] | undefined>;
  update(
    id: string,
    data: ReviewInput,
    remove: boolean
  ): Promise<ReviewInput | undefined>;
  delete(id: string): Promise<void>;
}
