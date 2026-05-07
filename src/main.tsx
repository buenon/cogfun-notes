import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "./index.css";
import { generateNotes, clearNotes } from "./lib/devScripts";

// Expose dev tools to console
if (import.meta.env.DEV) {
  (window as any).generateNotes = generateNotes;
  (window as any).clearNotes = clearNotes;
  console.debug("🛠️ Dev Tools Loaded: use generateNotes(n) and clearNotes() in console");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>

  </StrictMode>,
);
