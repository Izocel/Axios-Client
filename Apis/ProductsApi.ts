import { AxiosRequestConfig } from "axios";
import { ProductData } from "../Models/Response/ProductData";
import { FakeStoreApi } from "./FakeStoreApi";

export class ProductsApi extends FakeStoreApi {
  constructor(config?: AxiosRequestConfig<any>) {
    super(config);
    ProductsApi.UpdateConfig((cfg) => {
      if (!cfg.baseURL) cfg.baseURL = "https://fakestoreapi.com/";
      cfg.baseURL = cfg.baseURL.concat("products/");
    });
  }

  public static GetProduct(id: number) {
    return this.Get<ProductData>(`${id}`);
  }

  public static GetProducts() {
    return this.Get<ProductData[]>(``);
  }
}
