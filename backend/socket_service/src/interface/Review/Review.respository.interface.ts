import ReviewInput from "../../model/dto/ReviewInput.dto";

export default interface ReviewRespositoryInterface {
  create(): Promise<string>;
  getByID(id: string, offset: number): Promise<ReviewInput[] | undefined>;
  update<T extends string | ReviewInput>(
    id: string,
    data: T,
    remove: boolean
  ): Promise<ReviewInput | undefined>;
  delete(id: string): Promise<void>;
}
