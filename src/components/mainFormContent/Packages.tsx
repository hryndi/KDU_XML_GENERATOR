import { Plus, Trash2 } from "lucide-react";
import { useFormData } from "../../context/FormData/useFormData";
import { useActiveShipment } from "../../context/shipment/useActiveShipment";
import type { Package } from "../../types/formData";

const Packages = () => {
  const { formData, setFormData } = useFormData();
  const { activeShipment } = useActiveShipment();

  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];

  const handlePackageChange = (index: number, field: keyof Package, value: string): void => {
    const newPackages = [...currentShipment.packages];
    newPackages[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      packages: newPackages,
      colliCount: newPackages.length,
    }));
    currentShipment.packages = newPackages; // Update the current shipment's packages
  };

  const addPackage = (): void => {
    const newPackages = [...currentShipment.packages];
    newPackages.push({ weight: "30,3", barcode: "" });
    setFormData((prev) => ({
      ...prev,
      packages: newPackages,
      colliCount: newPackages.length,
    }));
    currentShipment.packages = newPackages; // Update the current shipment's packages
  };

  const removePackage = (index: number): void => {
    const newPackages = currentShipment.packages.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      packages: newPackages,
    }));
    currentShipment.packages = newPackages;
  };
  return (
    <>
      {/* Packages */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Packages</h3>
          <button
            onClick={addPackage}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            Add Package
          </button>
        </div>
        <div className="space-y-3">
          {currentShipment.packages.map((pkg, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <input
                  type="text"
                  value={pkg.weight}
                  onChange={(e) => handlePackageChange(index, "weight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-[2]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                <input
                  type="text"
                  value={pkg.barcode}
                  onChange={(e) => handlePackageChange(index, "barcode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => removePackage(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Packages;
