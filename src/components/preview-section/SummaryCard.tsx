import { useFormData } from "../../context/FormData/useFormData";

const SummaryCard = () => {
  const { formData } = useFormData();
  return (
    <>
      {/* Summary Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Shipments:</span>
            <span className="font-medium">{formData.shipments.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Packages:</span>
            <span className="font-medium">{formData.shipments.reduce((sum, s) => sum + s.packages.length, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Pallets:</span>
            <span className="font-medium">{formData.shipments.reduce((sum, s) => sum + s.palletCount, 0)}</span>
          </div>
          <div className="pt-3 border-t">
            <div className="text-sm text-gray-500 mb-2">Destinations:</div>
            <div className="space-y-1">
              {formData.shipments.map((shipment, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{shipment.adresses[0].recipientName1 || `Shipment ${index + 1}`}</span>
                  <br />
                  <span className="text-gray-500">
                    {shipment.adresses[0].city}, {shipment.adresses[0].country}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
