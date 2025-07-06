import { useState, type ReactNode } from "react";
import { FormDataContext } from "./context";
import type { FormData } from "../../types/formData";

const defaultFormData: FormData = {
  originFileName: "TOF534455000.DFU",
  originDate: "",
  shipments: [
    {
      id: 1,
      customer: "534455000",
      shipmentDate: "",
      palletCount: 0,
      colliCount: 5,
      totalWeight: "151,5",
      shipmentType: "NORMAL",
      shipmentReference: "14498191",
      adresses: [
        {
          id: 0,
          adressType: "RECIPIENT",
          recipientName1: "Spain Broke Company",
          recipientName2: "Don Anton",
          street: "Camiño Sacido C",
          streetNumber: "34",
          city: "O Vicedo",
          postalCode: "27860",
          country: "ES",
        },
        {
          id: 0,
          adressType: "PICKUP",
          recipientName1: "Spain Rich Company",
          recipientName2: "Don Hua",
          street: "Volskaya St.",
          streetNumber: "89",
          city: "Zaporizhzhia",
          postalCode: "27860",
          country: "UA",
        },
      ],
      services: [{ service: [{ service: "NORMAL" }], timeService: "NORMAL" }],
      packages: [
        { weight: "30,3", barcode: "344550160601000013427860" },
        { weight: "30,3", barcode: "344550160602000013427860" },
        { weight: "30,3", barcode: "344550160603000013427860" },
        { weight: "30,3", barcode: "344550160604000013427860" },
        { weight: "30,3", barcode: "344550160605000013427860" },
      ],
      dangerousGoods: {
        isActive: false,
        un_number: "UN1234",
        packinggroup: "II",
        adr_amount: "1000",
        density: "1.2",
        placards: [
          { type: "flammable", value: "Flammable", id: 1 },
          { type: "toxic", value: "Toxic", id: 2 },
        ],
        flags: [
          { type: "hazardous", value: "Hazardous", id: 1 },
          { type: "fragile", value: "Fragile", id: 2 },
        ],
        additionalinfos: [
          { type: "handling", text: "Handle with care", id: 1 },
          { type: "storage", text: "Store in a cool place", id: 2 },
        ],
        package_types: [
          { desc: "Box", count: 2, id: 1 },
          { desc: "Pallet", count: 1, id: 2 },
        ],
      },
    },
  ],
};

type FormDataProviderProps = {
  children: ReactNode;
};

export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  return <FormDataContext.Provider value={{ formData, setFormData }}>{children}</FormDataContext.Provider>;
};
