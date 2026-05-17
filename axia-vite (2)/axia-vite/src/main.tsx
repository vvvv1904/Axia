import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const CONVEX_PRODUCTION_URL = "https://tangible-orca-566.convex.cloud";

const convexUrl = (import.meta.env.VITE_CONVEX_URL as string | undefined) || CONVEX_PRODUCTION_URL;

const hasBackend = !!(convexUrl && convexUrl.startsWith("https://") && convexUrl.includes(".convex.cloud"));

console.log("%c[AXIA DEBUG]", "color: #C8A04D; font-weight: bold;", "Convex URL:", convexUrl, "| hasBackend:", hasBackend, "| Mode:", hasBackend ? "CONNECTED" : "DEMO");

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
