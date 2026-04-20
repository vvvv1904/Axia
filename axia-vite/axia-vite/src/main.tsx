import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

// Convex URL is read from environment variable — never hardcoded in source code.
// Set VITE_CONVEX_URL in your .env file or deployment environment.
// If not set, the app runs in demo mode: UI renders with mock data,
// signups simulate success, and no real backend calls are made.
const convexUrl = (import.meta.env.VITE_CONVEX_URL as string | undefined) || "";

const convex = new ConvexReactClient(
  convexUrl || "https://placeholder.convex.cloud",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App hasBackend={!!convexUrl} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#FFFFFF", border: "1px solid #E8DCC8", color: "#1A1A2E" },
        }}
      />
    </ConvexProvider>
  </StrictMode>,
);
