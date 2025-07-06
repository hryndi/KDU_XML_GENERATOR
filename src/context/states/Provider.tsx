import { useEffect, useState, type ReactNode } from "react";
import { StatementsContext } from "./context";
import { useFormData } from "../FormData/useFormData";
import { useActiveShipment } from "../shipment/useActiveShipment";

type StatesProviderProps = {
  children: ReactNode;
};

export const StatementsProvider = ({ children }: StatesProviderProps) => {
  const { formData } = useFormData();
  const { activeShipment } = useActiveShipment();
  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];
  const [showPreview, setShowPreview] = useState(false);
  const [xmlOutput, setXmlOutput] = useState("");
  const [isPickup, setIsPickup] = useState<boolean>(false);
  const [isDangerousGoodsActive, setIsDangerousGoodsActive] = useState<boolean>(false);
  useEffect(() => {
    setIsPickup(currentShipment?.shipmentType === "PICKUP");
    setIsDangerousGoodsActive(currentShipment?.dangerousGoods.isActive);
  }, [currentShipment]);
  return (
    <StatementsContext.Provider
      value={{
        showPreview,
        setShowPreview,
        xmlOutput,
        setXmlOutput,
        isPickup,
        setIsPickup,
        isDangerousGoodsActive,
        setIsDangerousGoodsActive,
      }}
    >
      {children}
    </StatementsContext.Provider>
  );
};
