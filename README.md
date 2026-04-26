# Axios-Client POC

This repository is a **Proof of Concept (POC)** for an Axios-based API client in TypeScript. It demonstrates a pattern for API calls that return a callable function for the request, an `AbortController` for better request management (such as cancellation/abort), and the request config.

## Features

- **Axios-based API client**: Uses Axios for HTTP requests with TypeScript support.
- **AbortController integration**: Each API method returns an object containing a `call` function (to execute the request), an `AbortController` (to abort the request if needed), and the Axios config.
- **Extensible API structure**: Easily extend the base API client for different endpoints or services.

## Static Functionality Explained

This POC uses static methods and singletons for API client management:

- **Singleton Pattern**: The `GetInstance()` static method ensures only one instance of each API client exists. This avoids unnecessary re-initialization and keeps configuration consistent.
- **Static API Methods**: Methods like `Get()` and `GetNope()` are static, so you can response them directly on the class without creating an object. They automatically use the singleton instance internally.
- **Why Static?**
  - Simplifies usage: No need to manually instantiate the API client.
  - Centralizes configuration: All requests share the same Axios instance and settings.
  - Encourages a service-like pattern, ideal for API clients in TypeScript/JavaScript projects.

**Example:**

```typescript
// No need to do: const api = new NAASApi();
// Just use static methods:
const { call, controller, config } = NAASApi.GetNope();
const response = await call();
const data = response.data;
```

This approach is especially useful for applications where you want a single, shared API client throughout your codebase. The API methods return an object with a callable function, the controller, and the config, making usage simple and flexible.

## Usage Example

```typescript
import { NAASApi } from "./NAASApi";

async function main() {
  NAASApi.GetInstance();

  const { call, controller, config } = NAASApi.GetNope();

  // Optionally abort the request after some time
  setTimeout(() => {
    controller?.abort();
    console.log("Request aborted");
  }, 10_000);

  try {
    const response = await call();
    const reason = response.data?.reason || "No reason provided";
    console.log("API response successful:", reason);
  } catch (error) {
    switch ((error as any).name) {
      case "CanceledError":
        console.warn("Request was canceled");
        break;
      default:
        console.error("Error during API response:", error);
        break;
    }
  }
}

main();
```

## Project Structure

- `Api.ts` - Base API client with Axios instance and abort support
- `NAASApi.ts` - Example API client extending the base for a specific endpoint
- `Controller.ts` - Generic singleton controller for managing API logic
- `NAASController.ts` - Example controller extending the base for a specific API
- `index.ts` - Example usage

## Controller Class Explained

The `Controller` class is a generic singleton controller designed to manage API logic and provide a consistent interface for interacting with API clients. It uses a static `GetInstance()` method to ensure only one instance of each controller exists, following the singleton pattern. This is similar to the API client pattern, but for controller logic.

**Key Features:**

- **Singleton Pattern:** Only one instance of each controller is created and reused throughout the application.
- **Generic Design:** The controller can be extended for different API clients, making it flexible and reusable.
- **Centralized Logic:** Keeps business or orchestration logic separate from the API client, promoting clean architecture.

**Example:**

```typescript
import { NAASController } from "./Controllers/NAASController";

const controller = NAASController.GetInstance();
// Use controller methods to interact with the API
```

This approach helps organize your codebase by separating API request logic (in the API classes) from higher-level orchestration or business logic (in the controller classes).

## Requirements

- Node.js
- TypeScript
- Axios

## Install

```
npm install
```

## Run Example

```
npx ts-node index.ts
```

---

**Note:** This is a POC and not intended for production use. Feel free to adapt the pattern for your own projects!
