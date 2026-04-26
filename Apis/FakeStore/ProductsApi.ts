import { AxiosRequestConfig } from "axios";
import { FakeStoreApi } from "./FakeStoreApi";

export interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export class ProductsApi extends FakeStoreApi {
  constructor(config?: AxiosRequestConfig<any>) {
    super(config);
    ProductsApi.Axios.defaults.baseURL =
      ProductsApi.Axios.defaults.baseURL!.concat("products/");
  }

  public static GetProduct(id: number) {
    return this.Get<ProductData>(`${id}`);
  }

  public static GetProducts() {
    return this.Get<ProductData[]>(``);
  }
}
