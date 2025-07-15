import { useEffect, useState, type ReactNode } from "react";
import { StatementsContext } from "./context";
import { useFormData } from "../FormData/useFormData";
import { useActiveShipment } from "../shipment/useActiveShipment";
import { useUpdateShipment } from "../shipment/useUpdateShipment";
import { useForm } from "react-hook-form";
import { FormDataSchema } from "../../lib/inputsValidation";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

type StatesProviderProps = {
  children: ReactNode;
};

export const StatementsProvider = ({ children }: StatesProviderProps) => {
  const { formData } = useFormData();
  const { activeShipment } = useActiveShipment();

  const [showPreview, setShowPreview] = useState(false);
  const [xmlOutput, setXmlOutput] = useState("");
  const [isPickup, setIsPickup] = useState<boolean>(false);
  const [isDangerousGoodsActive, setIsDangerousGoodsActive] = useState<boolean>(false);
  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];
  useEffect(() => {
    setIsPickup(currentShipment?.shipmentType === "PICKUP");
    setIsDangerousGoodsActive(currentShipment?.dangerousGoods.isActive);
  }, [currentShipment]);
  const updateShipment = useUpdateShipment();
  const dangerousGoods = currentShipment?.dangerousGoods || {};
  const updateDangerousGoodsActive = () => {
    updateShipment(activeShipment, "dangerousGoods", { ...dangerousGoods, isActive: !isDangerousGoodsActive });
  };

  const form = useForm({
    resolver: zodResolver(FormDataSchema),
  });

  // useEffect(() => {
  //   if (Object.keys(formState.errors).length > 0) {
  //     console.group("🔴 Validation Errors:");
  //     Object.entries(formState.errors).forEach(([field, error]) => {
  //       console.log(`${field}: ${error?.message}`);
  //     });
  //     console.groupEnd();
  //   }
  // }, [formState.errors]);
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
        updateDangerousGoodsActive,
      }}
    >
      {children}
    </StatementsContext.Provider>
  );
};
