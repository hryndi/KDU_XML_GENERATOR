import React from "react";
import { ActiveShipmentContext } from "./contexts";

export const useActiveShipment = () => {
  const context = React.useContext(ActiveShipmentContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
