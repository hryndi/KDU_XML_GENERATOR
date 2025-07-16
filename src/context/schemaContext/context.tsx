import React from "react";
import type { ShipmentTypeFormData } from "../../lib/inputsValidation";
import type { UseFormReturn } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";

interface SchemaContext {
  form: UseFormReturn<ShipmentTypeFormData>;
  errors: FieldErrors<ShipmentTypeFormData>;
  isSubmitting: boolean;
}

export const SchemaContext = React.createContext<SchemaContext | undefined>(undefined);
