import { z } from "zod";

// export const shipmentTypeSchema = z.object({
//   shipmentType: z.enum(["INCORRECT", "NORMAL"], {
//     errorMap: () => ({ message: "Shipment type must be either PICKUP or DELIVERY" }),
//   }),
// });

// export const originFileInformationSchema = z.object({
//   fileName: z.string().min(1, "File name is required"),
//   shipmentDate: z
//     .string()
//     .min(1, "Shipment date is required")
//     .regex(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/, "Shipment date must be in format dd.mm.yyyy"),
// });

// export const ShipmentInformationSchema = z.object({
//   customer: z.string().min(1, "Customer is required"),
//   shipmentDate: z
//     .string()
//     .min(1, "Shipment date is required")
//     .regex(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/, "Shipment date must be in format dd.mm.yyyy"),
//   palletCount: z.number().min(0, "Pallet count must be a non-negative number"),
//   colliCount: z.number().min(0, "Colli count must be a non-negative number"),
//   totalWeight: z
//     .string()
//     .min(1, "Total weight is required")
//     .regex(/^\d+(\.\d{1,2})?$/, "Total weight must be a valid number with up to two decimal places"),
//   shipmentReference: z.number().min(1, "Shipment reference is required"),
// });

// export const AdressValidationSchema = z.object({
//   id: z.number().optional(),
//   adressType: z.enum(["RECIPIENT", "PICKUP"], {
//     errorMap: () => ({ message: "Adress type must be either RECIPIENT or PICKUP" }),
//   }),
//   recipientName1: z.string().min(1, "Recipient name is required"),
//   recipientName2: z.string().optional(),
//   street: z.string().min(1, "Street is required"),
//   streetNumber: z.string().min(1, "Street number is required"),
//   city: z.string().min(1, "City is required"),
//   postalCode: z.string().min(1, "Postal code is required"),
//   country: z.string().min(1, "Country is required").max(2, "Country code must be 2 characters long"),
// });

// export const servicesSchema = z.object({
//   service_types: z.array(
//     z.object({
//       service: z.enum(["NORMAL", "B2B", "DISCRET"], {
//         errorMap: () => ({ message: "Service type must be either NORMAL, B2B, or DISCRET" }),
//       }),
//       timeService: z.enum(["NORMAL", "ABEND", "PLUS12", "PLUS8", "WEEKENDS"], {
//         errorMap: () => ({ message: "Time service must be either NORMAL, ABEND, PLUS12, PLUS8, or WEEKENDS" }),
//       }),
//     })
//   ),
// });

// export const dangerousGoodsSchema = z.object({
//   isActive: z.boolean(),
//   un_number: z.string().optional(),
//   packinggroup: z.string().optional(),
//   adr_amount: z.string().optional(),
//   density: z.number().optional(),
//   placards: z.array(
//     z.object({
//       type: z.string().min(1, "Placard type is required"),
//       value: z.string().min(1, "Placard value is required"),
//       id: z.number().optional(),
//     })
//   ),
//   flags: z.array(
//     z.object({
//       type: z.string().min(1, "Flag type is required"),
//       value: z.string().min(1, "Flag value is required"),
//       id: z.number().optional(),
//     })
//   ),
//   additionalinfos: z.array(
//     z.object({
//       type: z.string().min(1, "Additional info type is required"),
//       text: z.string().min(1, "Additional info text is required"),
//       id: z.number().optional(),
//     })
//   ),
//   package_types: z.array(
//     z.object({
//       desc: z.string().min(1, "Package type description is required"),
//       count: z.number().min(0, "Package count must be a non-negative number"),
//       id: z.number().optional(),
//     })
//   ),
// });

// export const PackageSchema = z.object({
//   weight: z
//     .string()
//     .min(1, "Weight is required")
//     .regex(/^\d+(\.\d{1,2})?$/, "Weight must be a valid number with up to two decimal places"),
//   barcode: z.string().min(1, "Barcode is required"),
// });
// const PackagesSchema = z.array(PackageSchema);

// export const CombinedSchema = shipmentTypeSchema;
// //   .merge(originFileInformationSchema)
// //   .merge(ShipmentInformationSchema)
// //   .merge(AdressValidationSchema)
// //   .merge(servicesSchema);
// export type ShipmentTypeFormData = z.infer<typeof shipmentTypeSchema>;

// const FormDataSchema = z.object({
//   originFileName: z.string(),
//   originDate: z.string(),
//   shipments: z.array(
//     z.object({
//       id: z.number(),
//       customer: z.string(),
//       shipmentDate: z.string(),
//       palletCount: z.number(),
//       colliCount: z.number(),
//       totalWeight: z.string(),
//       shipmentType: z.enum(["NORMAL", "PICKUP"]),
//       shipmentReference: z.string(),
//       adresses: z.array(
//         z.object({
//           id: z.number(),
//           adressType: z.enum(["RECIPIENT", "PICKUP"]),
//           recipientName1: z.string(),
//           recipientName2: z.string(),
//           street: z.string(),
//           streetNumber: z.string(),
//           city: z.string(),
//           postalCode: z.string(),
//           country: z.string(),
//         })
//       ),
//       services: z.array(
//         z.object({
//           service: z.array(
//             z.object({
//               service: z.enum(["NORMAL", "B2B", "DISCRET"]),
//             })
//           ),
//           timeService: z.enum(["NORMAL", "ABEND", "PLUS12", "PLUS8", "WEEKENDS"]),
//         })
//       ),
//       packages: z.array(
//         z.object({
//           weight: z.string(),
//           barcode: z.string(),
//         })
//       ),
//       dangerousGoods: z.object({
//         isActive: z.boolean(),
//         un_number: z.string(),
//         packinggroup: z.string(),
//         adr_amount: z.string(),
//         density: z.string(),
//         placards: z.array(
//           z.object({
//             type: z.string(),
//             value: z.string(),
//             id: z.number(),
//           })
//         ),
//         flags: z.array(
//           z.object({
//             type: z.string(),
//             value: z.string(),
//             id: z.number(),
//           })
//         ),
//         additionalinfos: z.array(
//           z.object({
//             type: z.string(),
//             text: z.string(),
//             id: z.number(),
//           })
//         ),
//         package_types: z.array(
//           z.object({
//             desc: z.string(),
//             count: z.number(),
//             id: z.number(),
//           })
//         ),
//       }),
//     })
//   ),
// });

export const AdressSchema = z.object({
  id: z.number(),
  adressType: z.enum(["RECIPIENT", "PICKUP"]),
  recipientName1: z.string(),
  recipientName2: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

export const PackageSchema = z.object({
  weight: z.string(),
  barcode: z.string(),
});

export const dangerousGoodsSchema = z.object({
  isActive: z.boolean(),
  un_number: z.string(),
  packinggroup: z.string(),
  adr_amount: z.string(),
  density: z.string(),
  placards: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
      id: z.number(),
    })
  ),
  flags: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
      id: z.number(),
    })
  ),
  additionalinfos: z.array(
    z.object({
      type: z.string(),
      text: z.string(),
      id: z.number(),
    })
  ),
  package_types: z.array(
    z.object({
      desc: z.string(),
      count: z.number(),
      id: z.number(),
    })
  ),
});

export const ServicesSchema = z.object({
  service: z.array(
    z.object({
      service: z.enum(["NORMAL", "B2B", "DISCRET"]),
    })
  ),
  timeService: z.enum(["NORMAL", "ABEND", "PLUS12", "PLUS8", "WEEKENDS"]),
});

export const ShipmentSchema = z.object({
  id: z.number(),
  customer: z.string(),
  shipmentDate: z.string(),
  palletCount: z.number(),
  colliCount: z.number(),
  totalWeight: z.string(),
  shipmentType: z.enum(["NORMAL", "PICKUP"]),
  shipmentReference: z.string(),
  adresses: z.array(AdressSchema),
  services: z.array(ServicesSchema),
  packages: z.array(PackageSchema),
  dangerousGoods: dangerousGoodsSchema,
});

export const FormDataSchema = z.object({
  originFileName: z.string(),
  originDate: z.string(),
  shipments: z.array(ShipmentSchema),
});

export type ShipmentTypeFormData = z.infer<typeof FormDataSchema>;
