import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { CartContextProvider } from "./components/context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CartContextProvider>
  </StrictMode>
);
