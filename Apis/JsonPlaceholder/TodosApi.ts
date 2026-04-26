import { AxiosRequestConfig } from "axios";
import { JsonPlaceholderApi } from "./JsonPlaceholderApi";

export interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export class TodosApi extends JsonPlaceholderApi {
  constructor(config?: AxiosRequestConfig<any>) {
    super(config);
    TodosApi.Axios.defaults.baseURL =
      TodosApi.Axios.defaults.baseURL!.concat("todos/");
  }

  public static GetTodo(id: number) {
    return this.Get<TodoData>(`${id}`);
  }

  public static GetTodos() {
    return this.Get<TodoData[]>("");
  }
}
