import { CartsApi } from "./Apis/CartsApi";
import { CartsController } from "./Controllers/CartsController";
import { ProductsController } from "./Controllers/ProductsController";
import { CartData } from "./Models/Response/CartData";
import { ProductData } from "./Models/Response/ProductData";

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
      product: ProductData;
      products: ProductData[];
      cart: CartData;
      carts: CartData[];
    } = {
      product: {} as ProductData,
      products: [] as ProductData[],
      cart: {} as CartData,
      carts: [] as CartData[],
    };

    results.cart = await CartsController.GetCart(1);
    results.product = await ProductsController.GetProduct(1);
    results.carts = await CartsController.GetCarts();
    results.products = await ProductsController.GetProducts();
    const tmp_product = await ProductsController.GetProduct(1);

    // Assert that tmp and results.product are the same
    if (JSON.stringify(tmp_product) !== JSON.stringify(results.product)) {
      throw new Error("The results of API calls are not consistent");
    }

    console.log("Controller test passed");
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
