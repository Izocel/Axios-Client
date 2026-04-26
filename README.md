# Axios-Client POC

This repository is a **Proof of Concept (POC)** for an Axios-based API client in TypeScript. It demonstrates a pattern for API calls that return both a `Promise` for the request and an `AbortController` for better request management (such as cancellation/abort).

## Features

- **Axios-based API client**: Uses Axios for HTTP requests with TypeScript support.
- **AbortController integration**: Each API response returns an `AbortController` alongside the response promise, allowing you to abort requests as needed.
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
const { response, controller } = NAASApi.GetNope();
```

This approach is especially useful for applications where you want a single, shared API client throughout your codebase.

## Usage Example

```typescript
import { NAASApi } from "./NAASApi";

async function main() {
  NAASApi.GetInstance();

  const { response, controller } = NAASApi.GetNope();

  // Optionally abort the request after some time
  setTimeout(() => {
    controller?.abort();
    console.log("Request aborted");
  }, 10_000);

  try {
    const resp = await response;
    const reason = resp.data?.reason || "No reason provided";
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
- `index.ts` - Example usage

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
