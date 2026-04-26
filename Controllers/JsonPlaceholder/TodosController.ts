import { TodosApi } from "../../Apis/JsonPlaceholder/TodosApi";
import { Controller } from "../Controller";

export class TodosController extends Controller<TodosApi> {
  protected static instance: TodosController;

  // To demonstrate a API prepared call
  public static async GetTodo(id: number) {
    const { call, controller, config } = TodosApi.GetTodo(id);

    // To demonstrate using the AbortController to cancel the request (optional)
    setTimeout(() => controller?.abort(), 10_000);

    const response = await call();
    return response.data;
  }

  // To demonstrate an API fetch call without preparation
  public static async GetTodos() {
    return (await TodosApi.GetTodos().call())?.data;
  }
}
