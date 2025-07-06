import { Truck } from "lucide-react";
import { useUpdateShipment } from "../../context/shipment/useUpdateShipment";
import { useFormData } from "../../context/FormData/useFormData";
import { useActiveShipment } from "../../context/shipment/useActiveShipment";
import { useStatements } from "../../context/states/useStates";

const ShipmentType = () => {
  const { formData } = useFormData();
  const { activeShipment } = useActiveShipment();
  const updateShipment = useUpdateShipment();
  const { setIsPickup } = useStatements();
  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];
  return (
    <>
      {/* Shipment Type */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Truck className="text-blue-600" size={20} />
          Shipment Type
        </h3>
        <div className="flex gap-4">
          {["NORMAL", "PICKUP"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipment_type"
                value={type}
                checked={currentShipment.shipmentType === type}
                onChange={(e) => {
                  updateShipment(activeShipment, "shipmentType", e.target.value);
                  setIsPickup(e.target.value === "PICKUP");
                }}
                // ({ ...currentShipment, shipment_type: e.target.value })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShipmentType;
