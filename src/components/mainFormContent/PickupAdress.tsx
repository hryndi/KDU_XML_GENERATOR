import { MapPin } from "lucide-react";
import { useFormData } from "../../context/FormData/useFormData";
import { useActiveShipment } from "../../context/shipment/useActiveShipment";
import { useUpdateShipment } from "../../context/shipment/useUpdateShipment";

const PickupAdress = () => {
  const { formData } = useFormData();
  const { activeShipment } = useActiveShipment();
  const updateShipment = useUpdateShipment();

  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];

  return (
    <>
      {/* Pickup Address */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <MapPin size={18} className=" text-green-600" />
          Pickup Address
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={currentShipment.adresses[1].recipientName1 || ""}
                onChange={(e) =>
                  updateShipment(
                    activeShipment,
                    "adresses",
                    currentShipment.adresses.map((adress) =>
                      adress.id === 1 ? { ...adress, recipientName1: e.target.value } : adress
                    )
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
              <input
                type="text"
                value={currentShipment.adresses[1].recipientName2 || ""}
                onChange={(e) =>
                  updateShipment(
                    activeShipment,
                    "adresses",
                    currentShipment.adresses.map((adress) =>
                      adress.id === 1 ? { ...adress, recipientName2: e.target.value } : adress
                    )
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
              <input
                type="text"
                value={currentShipment.adresses[1].street || ""}
                onChange={(e) =>
                  updateShipment(
                    activeShipment,
                    "adresses",
                    currentShipment.adresses.map((adress) =>
                      adress.id === 1 ? { ...adress, street: e.target.value } : adress
                    )
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
              <input
                type="text"
                value={currentShipment.adresses[1].streetNumber || ""}
                onChange={(e) =>
                  updateShipment(
                    activeShipment,
                    "adresses",
                    currentShipment.adresses.map((adress) =>
                      adress.id === 1 ? { ...adress, streetNumber: e.target.value } : adress
                    )
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={currentShipment.adresses[1].city || ""}
                onChange={(e) =>
                  updateShipment(
                    activeShipment,
                    "adresses",
                    currentShipment.adresses.map((adress) =>
                      adress.id === 1 ? { ...adress, city: e.target.value } : adress
                    )
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input
                type="text"
                value={currentShipment.adresses[1].postalCode || ""}
                onChange={(e) =>
                  updateShipment(
                    activeShipment,
                    "adresses",
                    currentShipment.adresses.map((adress) =>
                      adress.id === 1 ? { ...adress, postalCode: e.target.value } : adress
                    )
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={currentShipment.adresses[1].country || ""}
                onChange={(e) =>
                  updateShipment(
                    activeShipment,
                    "adresses",
                    currentShipment.adresses.map((adress) =>
                      adress.id === 1 ? { ...adress, country: e.target.value } : adress
                    )
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PickupAdress;
