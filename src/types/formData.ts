export interface Package {
  weight: string;
  barcode: string;
}

export interface Placard {
  type: string;
  value: string;
  id: number;
}

export interface Flag {
  type: string;
  value: string;
  id: number;
}

export interface AdditionalInfo {
  type: string;
  text: string;
  id: number;
}

export interface PackageType {
  desc: string;
  count: number;
  id: number;
}
export interface Service {
  service: "NORMAL" | "B2B" | "DISCRET";
}

export interface Services {
  service: Service[];
  timeService: "NORMAL" | "ABEND" | "PLUS12" | "PLUS8" | "WEEKENDS";
}

export interface DangerousGood {
  isActive: boolean;
  un_number: string;
  packinggroup: string;
  adr_amount: string;
  density: string;
  placards: Placard[];
  flags: Flag[];
  additionalinfos: AdditionalInfo[];
  package_types: PackageType[];
}

interface Adress {
  id: number;
  adressType: "RECIPIENT" | "PICKUP";
  recipientName1: string;
  recipientName2: string;
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Shipment {
  id: number;
  customer: string;
  shipmentDate: string;
  palletCount: number;
  colliCount: number;
  totalWeight: string;
  shipmentType: "NORMAL" | "PICKUP";
  shipmentReference: string;
  adresses: Adress[];
  services: Services[];
  packages: Package[];
  dangerousGoods: DangerousGood;
}

export interface FormData {
  originFileName: string;
  originDate: string;
  shipments: Shipment[];
}

export type FormDataContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
