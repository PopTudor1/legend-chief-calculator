import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LegendChiefCalculator from "./legend-chief-calculator.tsx";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LegendChiefCalculator />
  </StrictMode>
);
