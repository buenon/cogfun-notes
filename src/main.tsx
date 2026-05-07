import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "./index.css";
import { generateNotes, clearNotes } from "./lib/devScripts";

declare global {
  interface Window {
    generateNotes: typeof generateNotes;
    clearNotes: typeof clearNotes;
  }
}

// Expose dev tools to console
if (import.meta.env.DEV) {
  window.generateNotes = generateNotes;
  window.clearNotes = clearNotes;
  console.debug("🛠️ Dev Tools Loaded: use generateNotes(n) and clearNotes() in console");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>

  </StrictMode>,
);
