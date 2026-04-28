import z from "zod";
import { Model } from "../Model";

export const RequestSchema = z.object({
  id: z.number().gt(0).optional().describe("The ID of the item to retrieve"),
});

export class Request extends Model<typeof RequestSchema> {
  private _id?: number;

  constructor(data: Partial<z.infer<typeof RequestSchema>> = {}) {
    super(RequestSchema, data, true);
    Object.assign(this, data);
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number | undefined) {
    this._id = id;
  }
}
