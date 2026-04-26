import { PostsApi } from "../../Apis/JsonPlaceholder/PostsApi";
import { Controller } from "../Controller";

export class PostsController extends Controller<PostsApi> {
  protected static instance: PostsController;

  // To demonstrate a API prepared call
  public static async GetPost(id: number) {
    const { call, controller, config } = PostsApi.GetPost(id);

    // To demonstrate using the AbortController to cancel the request (optional)
    setTimeout(() => controller?.abort(), 10_000);

    const response = await call();
    return response.data;
  }

  // To demonstrate an API fetch call without preparation
  public static async GetPosts() {
    return (await PostsApi.GetPosts().call())?.data;
  }
}
