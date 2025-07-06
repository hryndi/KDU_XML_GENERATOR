import { useState, type ReactNode } from "react";

import { ActiveShipmentContext } from "./contexts";
import { updateShipmentContext } from "./contexts";
import { useFormData } from "../FormData/useFormData";
import type { Shipment } from "../../types/formData";

type ShipmentProviderProps = {
  children: ReactNode;
};

type ShipmentFieldValueT = string | number | boolean | Date | null | undefined | object | [];

export const ShipmentProvider = ({ children }: ShipmentProviderProps) => {
  const [activeShipment, setActiveShipment] = useState<number>(0);
  const { formData, setFormData } = useFormData();

  const updateShipment = (index: number, field: keyof Shipment, value: ShipmentFieldValueT) => {
    setFormData((prev) => ({
      ...prev,
      shipments: prev.shipments.map((shipment, i) => (i === index ? { ...shipment, [field]: value } : shipment)),
    }));
  };

  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];

  return (
    <ActiveShipmentContext.Provider value={{ activeShipment, setActiveShipment, currentShipment }}>
      <updateShipmentContext.Provider value={updateShipment}>{children}</updateShipmentContext.Provider>
    </ActiveShipmentContext.Provider>
  );
};

// type FormDataProviderProps = {
//   children: ReactNode;
// };

// export const ShipmentProvider = ({ children }: FormDataProviderProps) => {
//   return (
//     <ActiveShipmentProvider>
//       <UpdateShipmentProvider>{children}</UpdateShipmentProvider>
//     </ActiveShipmentProvider>
//   );
// };
