import React from "react";

interface StatementsContext {
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  xmlOutput: string;
  setXmlOutput: React.Dispatch<React.SetStateAction<string>>;
  isPickup: boolean;
  setIsPickup: React.Dispatch<React.SetStateAction<boolean>>;
  isDangerousGoodsActive: boolean;
  updateDangerousGoodsActive: () => void;
}

export const StatementsContext = React.createContext<StatementsContext | undefined>(undefined);
