import { ProductsApi } from "../../Apis/FakeStore/ProductsApi";
import { Controller } from "../Controller";

export class ProductsController extends Controller<ProductsApi> {
  protected static instance: ProductsController;

  // To demonstrate a API prepared call
  public static async GetProduct(id: number) {
    const { call, controller, config } = ProductsApi.GetProduct(id);

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
