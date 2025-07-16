import { Dice5, Package } from "lucide-react";
import { useActiveShipment } from "../../context/shipment/useActiveShipment";
import { useFormData } from "../../context/FormData/useFormData";
import { useUpdateShipment } from "../../context/shipment/useUpdateShipment";
import { generateUniqueID } from "../../helpers/random";
import { ShipmentSchema } from "../../lib/inputsValidation";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";

const ShipmentInformation = () => {
  const updateShipment = useUpdateShipment();
  //   const activeShipment = useContext(ActiveShipmentContext);
  //   const formData = useContext(FormDataContext);
  const { formData, setFormData } = useFormData();
  const { activeShipment } = useActiveShipment();

  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];

  const updateShipmentDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shipmentId = activeShipment;
    currentShipment.shipmentDate = e.target.value; // Update the shipment date in the current shipment
    const updatedShipment = currentShipment;
    setFormData((prev) => ({
      ...prev,
      shipments: prev.shipments.map((shipment) => (shipment.id === shipmentId ? updatedShipment : shipment)),
    }));
  };

  return (
    <>
      {/* Shipment Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Package size={18} className="text-green-600" />
          Shipment Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
              <input
                type="text"
                value={currentShipment.customer || ""}
                onChange={(e) => updateShipment(activeShipment, "customer", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipment Date</label>
              <input
                type="date"
                value={currentShipment.shipmentDate}
                // onChange={(e) => (currentShipment.shipmentDate = e.target.value)}
                onChange={(e) => updateShipmentDate(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pallet Count</label>
              <input
                type="number"
                value={currentShipment?.palletCount || 0}
                onChange={(e) => updateShipment(activeShipment, "palletCount", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Colli Count</label>
              <input
                type="number"
                value={currentShipment?.colliCount || 0}
                onChange={(e) => updateShipment(activeShipment, "colliCount", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Weight</label>
              <input
                type="text"
                value={currentShipment?.totalWeight || ""}
                onChange={(e) => updateShipment(activeShipment, "totalWeight", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipment Type</label>
              <select
                value={currentShipment?.shipmentType || "NORMAL"}
                onChange={(e) => updateShipment(activeShipment, "shipmentType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="NORMAL">NORMAL</option>
                <option value="EXPRESS">EXPRESS</option>
                <option value="OVERNIGHT">OVERNIGHT</option>
              </select>
            </div> */}
            <div>
              <div className="flex gap-2 items-center mb-2">
                <label className="block  text-sm font-medium text-gray-700 ">Shipment Reference</label>
                <Dice5
                  size={18}
                  onClick={() => updateShipment(activeShipment, "shipmentReference", generateUniqueID(8))}
                />
              </div>
              <input
                type="text"
                value={currentShipment?.shipmentReference || ""}
                onChange={(e) => updateShipment(activeShipment, "shipmentReference", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShipmentInformation;
