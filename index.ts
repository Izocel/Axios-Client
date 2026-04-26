import { CartData, CartsApi } from "./Apis/FakeStore/CartsApi";
import { ProductData } from "./Apis/FakeStore/ProductsApi";
import { PostData } from "./Apis/JsonPlaceholder/PostsApi";
import { TodoData } from "./Apis/JsonPlaceholder/TodosApi";
import { CartsController } from "./Controllers/FakeStore/CartsController";
import { ProductsController } from "./Controllers/FakeStore/ProductsController";
import { PostsController } from "./Controllers/JsonPlaceholder/PostsController";
import { TodosController } from "./Controllers/JsonPlaceholder/TodosController";

async function TestConfigMutation() {
  try {
    // Example of using UpdateConfig to add a custom header
    CartsApi.GetInstance(); // Ensure instance is initialized before mutation

    CartsApi.UpdateConfig((config) => {
      delete config.headers?.["Authorization"];
      config.headers = {
        ...config.headers,
        "X-Custom-Header": "MyValue",
      };
    });

    // Make a request to verify the header is set
    const { call, config, controller } = CartsApi.GetCart(1);

    const response = await call();
    console.info("Response with custom header:", response.data);

    if (response.config.headers["X-Custom-Header"] !== "MyValue") {
      throw new Error("Custom header was not set in the request");
    }

    if (response.config.headers["Authorization"]) {
      throw new Error("Authorization header should have been removed");
    }

    console.info("Config mutation test passed");
    return true;
  } catch (error) {
    switch ((error as any).name) {
      case "CanceledError":
        console.warn("The request was canceled.");
        break;
      default:
        throw error;
    }
  }
}

async function TestController() {
  try {
    const results: {
      todo: TodoData;
      todos: TodoData[];
      post: PostData;
      posts: PostData[];
      product: ProductData;
      products: ProductData[];
      cart: CartData;
      carts: CartData[];
    } = {
      todo: {} as TodoData,
      todos: [] as TodoData[],
      post: {} as PostData,
      posts: [] as PostData[],
      product: {} as ProductData,
      products: [] as ProductData[],
      cart: {} as CartData,
      carts: [] as CartData[],
    };

    results.todo = await TodosController.GetTodo(1);
    results.todos = await TodosController.GetTodos();
    results.post = await PostsController.GetPost(1);
    results.posts = await PostsController.GetPosts();

    results.cart = await CartsController.GetCart(1);
    results.carts = await CartsController.GetCarts();
    results.product = await ProductsController.GetProduct(1);
    results.products = await ProductsController.GetProducts();

    const tmp_todo = await TodosController.GetTodo(1);
    const tmp_product = await ProductsController.GetProduct(1);

    // Assert that tmp and results.todo are the same
    if (JSON.stringify(tmp_todo) !== JSON.stringify(results.todo)) {
      throw new Error("The results of API calls are not consistent");
    }

    // Assert that tmp and results.product are the same
    if (JSON.stringify(tmp_product) !== JSON.stringify(results.product)) {
      throw new Error("The results of API calls are not consistent");
    }

    console.log("All API calls returned consistent results.");
    return true;
  } catch (error) {
    switch ((error as any).name) {
      case "CanceledError":
        console.warn("The request was canceled.");
        break;
      default:
        throw error;
    }
  }
}

async function main() {
  try {
    await TestConfigMutation();
    await TestController();
  } catch (error) {
    console.error("An error occurred during execution:", error);
  }
}

main();
