import { AxiosRequestConfig } from "axios";
import { FAKE_STORE_API_KEY } from "../../env.json";
import { Api } from "../Api";

//https://fakestoreapi.com/docs
export class FakeStoreApi extends Api {
  constructor(config?: AxiosRequestConfig<any>) {
    const baseURL = config?.baseURL || "https://fakestoreapi.com/";
    const Authorization =
      config?.headers?.Authorization || `Bearer ${FAKE_STORE_API_KEY}`;

    super({
      ...config,
      baseURL,
      headers: {
        ...config?.headers,
        Authorization,
      },
    });
  }
}
