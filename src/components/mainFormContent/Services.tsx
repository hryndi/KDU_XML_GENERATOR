import { useFormData } from "../../context/FormData/useFormData";

import { useActiveShipment } from "../../context/shipment/useActiveShipment";
import type { Service, Services as ServicesT } from "../../types/formData";



const Services = () => {
  const { formData, setFormData } = useFormData();
  const { activeShipment } = useActiveShipment();


  const changeService = (e: React.ChangeEvent<HTMLInputElement>, groupIndex: number) => {
    const serviceType = e.target.value as ServicesT["service"][number]["service"];
    const isChecked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      shipments: prev.shipments.map((shipment, index) =>
        index === activeShipment
          ? {
              ...shipment,
              services: shipment.services.map((serviceGroup, serviceGroupIndex) => {
                if (serviceGroupIndex === groupIndex) {
                  let updatedServices = [...serviceGroup.service];

                  if (isChecked) {
                    // Add service type if not already present
                    if (!updatedServices.some((service) => service.service === serviceType)) {
                      updatedServices.push({ service: serviceType });
                    }
                  } else {
                    // Remove service type if present
                    updatedServices = updatedServices.filter((service) => service.service !== serviceType);
                  }

                  return {
                    ...serviceGroup,
                    service: updatedServices,
                  };
                }
                return serviceGroup;
              }),
            }
          : shipment
      ),
    }));
  };

  const changeTimeService = (e: React.ChangeEvent<HTMLSelectElement>, groupIndex: number) => {
    const timeService = e.target.value as ServicesT["timeService"];

    setFormData((prev) => ({
      ...prev,
      shipments: prev.shipments.map((shipment, index) =>
        index === activeShipment
          ? {
              ...shipment,
              services: shipment.services.map((serviceGroup, serviceGroupIndex) =>
                serviceGroupIndex === groupIndex ? { ...serviceGroup, timeService: timeService } : serviceGroup
              ),
            }
          : shipment
      ),
    }));
  };

  return (
    <div className="bg-gray-50 rounded-lg">
      <div className="space-y-4">
        {formData.shipments[activeShipment].services.map((serviceGroup, groupIndex) => {
         const servicePath = `shipments.${activeShipment}.services.${groupIndex}`;
        return (
            
          <div key={groupIndex} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Services</h3>
            </div>

            <div className="space-y-4">
              {/* Service Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Types</label>
                <div className="grid grid-cols-3 gap-3">
                  {["NORMAL", "B2B", "DISCRET"].map((serviceType) => (
                    <label key={serviceType} className="flex items-center">
                      <input
                    
                        type="checkbox"
                        value={serviceType}
                        checked={serviceGroup.service.some((service: Service) => service.service === serviceType)}
                        onChange={(e) => changeService(e, groupIndex)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{serviceType}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Service</label>
                <select
                  value={serviceGroup.timeService}
                  onChange={(e) => changeTimeService(e, groupIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="NORMAL">NORMAL</option>
                  <option value="ABEND">ABEND</option>
                  <option value="PLUS12">PLUS12</option>
                  <option value="PLUS8">PLUS8</option>
                  <option value="WEEKENDS">WEEKENDS</option>
                </select>
              </div>
            </div>
          </div>
        )})}
        {/* <button
          onClick={addServices}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={16} />
          Add Service Group
        </button> */}
      </div>
    </div>
  );
};

export default Services;
