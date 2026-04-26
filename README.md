# Axios API Client Management POC

This repository is a **Proof of Concept (POC)** for managing API clients using Axios in TypeScript. It demonstrates a scalable, extensible pattern for building, organizing, and using API classes with static methods, singleton instantiation, and controller separation.

## Concept

- **Class-based API Management:** Each API is encapsulated as a TypeScript class, leveraging Axios for HTTP requests.
- **Singleton Enforcement:** Guarantees a single instance per API/controller, ensuring consistent configuration and preventing accidental overrides.
- **Static API Methods:** All API actions are exposed as static methods, enabling direct usage without manual instantiation.
- **Runtime Config Mutation:** Instantly update or mutate Axios instance configuration (e.g., headers, baseURL) at runtime.
- **AbortController Integration:** Every API call supports cancellation for robust request management.
- **Separation of Concerns:** Business/orchestration logic is handled in controllers, while API classes focus on HTTP logic.
- **Extensible & Maintainable:** Easily extend or compose new APIs and controllers for scalable projects.

## Features

- TypeScript-first, class-based API client architecture
- Direct static method access for all API endpoints
- Singleton instance management for config safety
- Runtime mutation of Axios config (headers, baseURL, etc.)
- AbortController support for request cancellation
- Clear separation between API and controller logic
- Easily extensible for new endpoints or services
- Integration-ready for runtime/integration testing

## Example Usage

```typescript
import { ProductsApi } from "./Apis/FakeStore/ProductsApi";

// No need to instantiate!
const { call, controller, config } = ProductsApi.GetProductById(1);
const response = await call();
console.log(response.data);

// Abort if needed
controller.abort();
```

## Mutating API Config at Runtime

You can update the Axios instance configuration at runtime for any API class using the static `UpdateConfig` method. This is useful for changing or removing headers (such as Authorization) or any other Axios config property after the instance is created.

**Example:**

```typescript
// Remove the Authorization header and add a custom header
CartsApi.UpdateConfig((config) => {
  delete config.headers?.["Authorization"];
  config.headers = {
    ...config.headers,
    "X-Custom-Header": "MyValue",
  };
});

// All subsequent requests will use the updated config
const { call } = CartsApi.GetCart(1);
const response = await call();
```

This allows you to dynamically adjust authentication, base URLs, or any other Axios config at runtime.

## Singleton & Static Inheritance

- All API classes use a static `GetInstance()` method to ensure a single instance per class.
- Subclasses inherit static methods and singleton logic, so extending APIs is safe and consistent.
- Once an instance is created, its config cannot be overridden.

```typescript
class MyApi extends BaseApi {}
const instance = MyApi.GetInstance(); // Always the same instance
```

## Project Structure

- `Apis/` - API classes (grouped by service)
  - `Api.ts` - Base API client
  - `FakeStore/` - Example: `ProductsApi.ts`, `CartsApi.ts`
  - `JsonPlaceholder/` - Example: `PostsApi.ts`, `TodosApi.ts`
- `Controllers/` - Controller classes for orchestration/business logic
- `index.ts` - Example entry point
- `env.json` - Example environment/config file

## Extending the Pattern

1. **Create a new API class:**
   - Extend the base API class
   - Add static methods for each endpoint
2. **Create a controller (optional):**
   - Extend the base controller for business logic

## Requirements

- Node.js
- TypeScript
- Axios

## Install & Run

```bash
npm install
npx ts-node index.ts
```

## Tests & Validation

This POC uses runtime/integration tests directly in `index.ts` to validate API logic and config mutation. There are no separate test files; instead, test functions are called from `main()`.

**Example test for config mutation:**

```typescript
async function TestConfigMutation() {
  CartsApi.UpdateConfig((config) => {
    delete config.headers?.["Authorization"];
    config.headers = {
      ...config.headers,
      "X-Custom-Header": "MyValue",
    };
  });
  const { call } = CartsApi.GetCart(1);
  const response = await call();
  if (response.config.headers["X-Custom-Header"] !== "MyValue") {
    throw new Error("Custom header was not set in the request");
  }
  if (response.config.headers["Authorization"]) {
    throw new Error("Authorization header should have been removed");
  }
  console.info("Config mutation test passed");
}
```

You can add or modify test functions in `index.ts` to validate new features or API behaviors as needed.

---

**Note:** This is a POC for architectural demonstration. Adapt and expand for your own projects!
