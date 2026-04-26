import { CartsApi } from "../../Apis/FakeStore/CartsApi";
import { Controller } from "../Controller";

export class CartsController extends Controller<CartsApi> {
  protected static instance: CartsController;

  // To demonstrate a API prepared call
  public static async GetCart(id: number) {
    const { call, controller, config } = CartsApi.GetCart(id);

    // To demonstrate using the AbortController to cancel the request (optional)
    setTimeout(() => controller?.abort(), 10_000);

    const response = await call();
    return response.data;
  }

  // To demonstrate an API fetch call without preparation
  public static async GetCarts() {
    return (await CartsApi.GetCarts().call())?.data;
  }
}
