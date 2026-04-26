import { AxiosRequestConfig } from "axios";
import { JSON_PLACEHOLDER_API_KEY } from "../../env.json";
import { Api } from "../Api";

//https://jsonplaceholder.typicode.com/
export class JsonPlaceholderApi extends Api {
  constructor(config?: AxiosRequestConfig<any>) {
    const baseURL = config?.baseURL || "https://jsonplaceholder.typicode.com/";
    const Authorization =
      config?.headers?.Authorization || `Bearer ${JSON_PLACEHOLDER_API_KEY}`;

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
