# Axios API Client Management POC

This repository is a **Proof of Concept (POC)** for managing API clients using Axios in TypeScript. It demonstrates a scalable, extensible pattern for building, organizing, and using API classes with static methods, singleton instantiation, and controller separation.

## Concept

- **Centralized API Management:** Each API is represented as a class, using Axios for HTTP requests.
- **Singleton Pattern:** Ensures only one instance of each API or controller exists, preventing config override and maintaining consistency.
- **Static Methods:** API methods are exposed statically, so you never need to manually instantiate API classes.
- **AbortController Support:** Each API call provides an `AbortController` for request cancellation.
- **Separation of Concerns:** Controllers manage orchestration/business logic, while API classes handle HTTP requests.

## Features

- TypeScript-first, Axios-powered API client base
- Static method access for all API calls
- Singleton instance management (no accidental config override)
- Extensible: add new APIs or endpoints by subclassing
- AbortController for request cancellation
- Clean separation between API and controller logic

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

---

**Note:** This is a POC for architectural demonstration. Adapt and expand for your own projects!
