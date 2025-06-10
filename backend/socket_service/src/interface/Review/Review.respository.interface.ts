import ReviewInput from "../../model/dto/ReviewInput.dto";

export default interface ReviewRespositoryInterface {
  create(): Promise<void>;
  getByID(id: string): Promise<ReviewInput[] | null>;
  update(id: string, data: ReviewInput, remove: boolean): Promise<ReviewInput>;
  delete(id: string): Promise<void>;
}
