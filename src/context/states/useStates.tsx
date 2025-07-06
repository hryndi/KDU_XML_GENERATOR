import React from "react";
import { StatementsContext } from "./context";

export const useStatements = () => {
  const context = React.useContext(StatementsContext);
  if (!context) {
    throw new Error("useStatements error");
  }
  return context;
};
