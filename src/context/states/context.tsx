import React from "react";

interface StatementsContext {
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  xmlOutput: string;
  setXmlOutput: React.Dispatch<React.SetStateAction<string>>;
  isPickup: boolean;
  setIsPickup: React.Dispatch<React.SetStateAction<boolean>>;
  isDangerousGoodsActive: boolean;
  setIsDangerousGoodsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StatementsContext = React.createContext<StatementsContext | undefined>(undefined);
