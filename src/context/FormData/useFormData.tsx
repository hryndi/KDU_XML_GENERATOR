import React from "react";
import { FormDataContext } from "./context";

export const useFormData = () => {
  const context = React.useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
