import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

// Convex production URL — hardcoded as fallback.
// The Convex URL is a public endpoint (visible in browser network tab),
// so it's safe to include in client-side code.
// If VITE_CONVEX_URL is set (e.g., in Vercel env vars), it takes precedence.
const CONVEX_PRODUCTION_URL = "https://agile-ladybug-573.convex.cloud";

const convexUrl = (import.meta.env.VITE_CONVEX_URL as string | undefined) || CONVEX_PRODUCTION_URL;

// Determine if we have a real Convex backend
const hasBackend = !!(convexUrl && convexUrl.startsWith("https://") && convexUrl.includes(".convex.cloud"));

const convex = new ConvexReactClient(
  hasBackend ? convexUrl : "https://placeholder.convex.cloud",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App hasBackend={hasBackend} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "var(--card, #FFFFFF)", border: "1px solid var(--border-color, #E8DCC8)", color: "var(--foreground, #1A1A2E)" },
        }}
      />
    </ConvexProvider>
  </StrictMode>,
);
