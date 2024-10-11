import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { ModuleCalculator } from "./components/module-calculator";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ModuleCalculator />
    </StrictMode>,
  );
} else {
  throw new Error("No root element found");
}
