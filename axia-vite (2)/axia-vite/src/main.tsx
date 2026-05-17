import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const CONVEX_URL = "https://tangible-orca-566.convex.cloud";

const convex = new ConvexReactClient(CONVEX_URL);

console.log("[AXIA] Connected to Convex:", CONVEX_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "var(--card, #FFFFFF)", border: "1px solid var(--border-color, #E8DCC8)", color: "var(--foreground, #1A1A2E)" },
        }}
      />
    </ConvexProvider>
  </StrictMode>,
);
