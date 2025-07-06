import { Copy, MapPin, Plus, Trash2 } from "lucide-react";
import type { Shipment } from "../types/formData";
import { useFormData } from "../context/FormData/useFormData";
import { useActiveShipment } from "../context/shipment/useActiveShipment";
const ShipmentManager = () => {
  const { setFormData, formData } = useFormData();
  const { activeShipment, setActiveShipment } = useActiveShipment();

  const addShipment = () => {
    const newShipment: Shipment = {
      id: Date.now(),
      customer: "",
      shipmentDate: "",
      palletCount: 0,
      colliCount: 0,
      totalWeight: "",
      shipmentType: "NORMAL",
      shipmentReference: "",
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
      services: [
        {
          service: [{ service: "NORMAL" }],
          timeService: "NORMAL",
        },
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
      packages: [{ weight: "", barcode: "" }],
    };

    setFormData((prev) => ({
      ...prev,
      shipments: [...prev.shipments, newShipment],
    }));
    setActiveShipment(formData.shipments.length);
  };

  const removeShipment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      shipments: prev.shipments.filter((_, i) => i !== index),
    }));
    if (activeShipment >= formData.shipments.length - 1) {
      setActiveShipment(Math.max(0, formData.shipments.length - 2));
    }
  };

  const duplicateShipment = (index: number) => {
    const shipmentToDuplicate = { ...formData.shipments[index] };
    shipmentToDuplicate.id = Date.now();
    shipmentToDuplicate.shipmentReference = shipmentToDuplicate.shipmentReference + "_copy";

    setFormData((prev) => ({
      ...prev,
      shipments: [...prev.shipments, shipmentToDuplicate],
    }));
    setActiveShipment(formData.shipments.length);
  };

  return (
    <>
      {/* Shipment Selector Sidebar */}
      <div className="xl:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Shipments</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {formData.shipments.length} shipments
              </span>
            </div>
            <button
              onClick={addShipment}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Shipment
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {formData.shipments.map((shipment, index) => (
              <div
                key={shipment.id}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  activeShipment === index ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveShipment(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                      <h3 className="font-medium text-gray-900 truncate">
                        {shipment.adresses[0].recipientName1 || `Shipment ${index + 1}`}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{shipment.adresses[0].city || "No address set"}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-500">{shipment.packages.length} packages</span>
                      <span className="text-xs text-gray-500">{shipment.totalWeight || "0 kg"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateShipment(index);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Duplicate shipment"
                    >
                      <Copy size={14} />
                    </button>
                    {formData.shipments.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeShipment(index);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove shipment"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ShipmentManager;
