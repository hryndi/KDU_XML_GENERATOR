import React from "react";
import { SchemaContext } from "./context";

export const useSchemaContext = () => {
  const context = React.useContext(SchemaContext);
  if (!context) {
    throw new Error("useSchemaContext error");
  }
  return context;
};
