import { AxiosRequestConfig } from "axios";
import { CartData } from "../Models/Response/CartData";
import { FakeStoreApi } from "./FakeStoreApi";

export class CartsApi extends FakeStoreApi {
  constructor(config?: AxiosRequestConfig<any>) {
    super(config);
    CartsApi.UpdateConfig((cfg) => {
      if (!cfg.baseURL) cfg.baseURL = "https://fakestoreapi.com/";
      cfg.baseURL = cfg.baseURL.concat("carts/");
    });
  }

  public static GetCart(id: number) {
    return this.Get<CartData>(`${id}`);
  }

  public static GetCarts() {
    return this.Get<CartData[]>(``);
  }
}
