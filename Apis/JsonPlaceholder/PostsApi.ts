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
    PostsApi.Axios.defaults.baseURL =
      PostsApi.Axios.defaults.baseURL!.concat("posts/");
  }

  public static GetPost(id: number) {
    return this.Get<PostData>(`${id}`);
  }

  public static GetPosts() {
    return this.Get<PostData[]>("");
  }
}
