/* eslint-disable */
/**
 * Convex API — uses `anyApi` from convex/server for runtime function reference
 * resolution. This works without running `npx convex dev` for code generation.
 *
 * `anyApi` uses a JavaScript Proxy that creates proper `FunctionReference`
 * objects dynamically when you access properties like `api.waitlist.getCount`.
 *
 * If you run `npx convex dev` in the future, it will overwrite this file with
 * fully type-safe generated code — that's fine and expected.
 */
import { anyApi } from "convex/server";

export const api = anyApi;

export const internal = anyApi;
