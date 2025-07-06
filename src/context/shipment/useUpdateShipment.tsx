import React from "react";
import { updateShipmentContext } from "./contexts";

export const useUpdateShipment = () => {
  const context = React.useContext(updateShipmentContext);
  if (!context) {
    throw new Error("useUpdateShipment must be used within a ShipmentProvider");
  }
  return context;
};
