import { CartData } from "./Apis/FakeStore/CartsApi";
import { ProductData } from "./Apis/FakeStore/ProductsApi";
import { PostData } from "./Apis/JsonPlaceholder/PostsApi";
import { TodoData } from "./Apis/JsonPlaceholder/TodosApi";
import { CartsController } from "./Controllers/FakeStore/CartsController";
import { ProductsController } from "./Controllers/FakeStore/ProductsController";
import { PostsController } from "./Controllers/JsonPlaceholder/PostsController";
import { TodosController } from "./Controllers/JsonPlaceholder/TodosController";

async function main() {
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

    console.info("Results:", results);
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

main();
