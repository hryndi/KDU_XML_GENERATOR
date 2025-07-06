import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FormDataProvider } from "./context/FormData/Provider.tsx";
import { ShipmentProvider } from "./context/shipment/ShipmentProvider.tsx";
import { StatementsProvider } from "./context/states/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormDataProvider>
      <ShipmentProvider>
        <StatementsProvider>
          <App />
        </StatementsProvider>
      </ShipmentProvider>
    </FormDataProvider>
  </StrictMode>
);
