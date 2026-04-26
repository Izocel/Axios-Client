import { AxiosRequestConfig } from "axios";
import { JsonPlaceholderApi } from "./JsonPlaceholderApi";

export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class PostsApi extends JsonPlaceholderApi {
  constructor(config?: AxiosRequestConfig<any>) {
    super(config);
    PostsApi.UpdateConfig((cfg) => {
      if (!cfg.baseURL) cfg.baseURL = "https://jsonplaceholder.typicode.com/";
      cfg.baseURL = cfg.baseURL.concat("posts/");
    });
  }

  public static GetPost(id: number) {
    return this.Get<PostData>(`${id}`);
  }

  public static GetPosts() {
    return this.Get<PostData[]>("");
  }
}
