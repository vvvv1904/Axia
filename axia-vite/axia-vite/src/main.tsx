import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const convexUrl = (import.meta.env.VITE_CONVEX_URL as string | undefined) || "";
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
          style: { background: "#FFFFFF", border: "1px solid #E8DCC8", color: "#1A1A2E" },
        }}
      />
    </ConvexProvider>
  </StrictMode>,
);
