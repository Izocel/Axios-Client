import { ProductsApi } from "../Apis/ProductsApi";
import { Request } from "../Models/Requests/Request";
import { Controller } from "./Controller";

export class ProductsController extends Controller<ProductsApi> {
  protected static instance: ProductsController;

  // To demonstrate a API prepared call
  public static async GetProduct(data: Partial<Request> | number) {
    const model = new Request(typeof data === "number" ? { id: data } : data);

    model.enforce();
    const { call, controller, config } = ProductsApi.GetProduct(model.id!);

    // To demonstrate using the AbortController to cancel the request (optional)
    setTimeout(() => controller?.abort(), 10_000);

    const response = await call();
    return response.data;
  }

  // To demonstrate an API fetch call without preparation
  public static async GetProducts() {
    return (await ProductsApi.GetProducts().call())?.data;
  }
}
