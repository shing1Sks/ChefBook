import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Portfolios from "./Portfolios.jsx";
import Portfolio from "./Portfolio.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/portfolios" element={<Portfolios />} />
        <Route path="/portfolio/:restaurantName" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
