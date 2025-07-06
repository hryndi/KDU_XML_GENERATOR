import React from "react";
("../types/formData");
import type { Shipment } from "../../types/formData";

export type shipmentContextType = {
  activeShipment: number;
  setActiveShipment: React.Dispatch<React.SetStateAction<number>>;
  currentShipment: Shipment;
};
type ShipmentFieldValueT = string | number | boolean | Date | null | undefined | object | [];

export const ActiveShipmentContext = React.createContext<shipmentContextType | undefined>(undefined);

export const updateShipmentContext = React.createContext<
  ((index: number, field: keyof Shipment, value: ShipmentFieldValueT) => void) | undefined
>(undefined);
