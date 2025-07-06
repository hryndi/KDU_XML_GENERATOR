import { useContext } from "react";
import { ActiveShipmentContext } from "../../context/shipment/contexts";
import { FormDataContext } from "../../context/FormData/context";

const CurrentShipmentHeader = () => {
  const activeShipment = useContext(ActiveShipmentContext);
  const formData = useContext(FormDataContext);
  if (!activeShipment || !formData) {
    throw new Error("C context is not available");
  }
  const currentShipment = formData.formData.shipments[activeShipment?.activeShipment] || formData.formData.shipments[0];
  return (
    <>
      {/* Current Shipment Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Editing: {currentShipment.adresses[0].recipientName1 || `Shipment ${activeShipment.activeShipment + 1}`}
            </h3>
            <p className="text-blue-100 text-sm">Configure shipment details for this destination</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Shipment</p>
            <p className="text-xl font-bold">
              {activeShipment.activeShipment + 1} of {formData.formData.shipments.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentShipmentHeader;
