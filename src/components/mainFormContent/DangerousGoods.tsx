import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import { useActiveShipment } from "../../context/shipment/useActiveShipment";
import { useUpdateShipment } from "../../context/shipment/useUpdateShipment";
import type { DangerousGood } from "../../types/formData";
import { useFormData } from "../../context/FormData/useFormData";
import { useStatements } from "../../context/states/useStates";

const DangerousGoods = () => {
  const { setFormData } = useFormData();
  const updateShipment = useUpdateShipment();
  const { activeShipment, currentShipment } = useActiveShipment();
  const { isDangerousGoodsActive, updateDangerousGoodsActive } = useStatements();

  // Add null checks and default values
  const dangerousGoods = currentShipment?.dangerousGoods || {};
  const placards = dangerousGoods.placards || [];
  const flags = dangerousGoods.flags || [];
  const additionalinfos = dangerousGoods.additionalinfos || [];
  const package_types = dangerousGoods.package_types || [];

  // Early return if no currentShipment
  if (!currentShipment) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p>Loading shipment data...</p>
      </div>
    );
  }

  type DangerousGoodArrayKeys = {
    [K in keyof DangerousGood]: DangerousGood[K] extends any[] ? K : never;
  }[keyof DangerousGood];

  // Fixed: Remove by ID instead of index
  const removeDangerousGood = (key: DangerousGoodArrayKeys, id: string | number): void => {
    setFormData((prev) => {
      const shipments = [...prev.shipments];
      const dangerousGoods = { ...shipments[activeShipment].dangerousGoods };

      if (Array.isArray((dangerousGoods as any)[key])) {
        // Filter out the item with the matching ID
        (dangerousGoods as any)[key] = (dangerousGoods as any)[key].filter((item: any) => item.id !== id);
      }

      shipments[activeShipment] = {
        ...shipments[activeShipment],
        dangerousGoods,
      };

      return {
        ...prev,
        shipments,
      };
    });
  };

  return (
    <>
      {/* Dangerous Goods */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="text-orange-600" size={20} />
            Dangerous Goods
          </h3>
          <button
            type="button"
            onClick={() => updateDangerousGoodsActive()}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            {isDangerousGoodsActive ? "Hide" : "Show"} Details
          </button>
        </div>
        {isDangerousGoodsActive && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 capitalize">Un Number</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dangerousGoods.un_number || ""}
                  onChange={(e) =>
                    updateShipment(activeShipment, "dangerousGoods", { ...dangerousGoods, un_number: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 capitalize">Packinggroup</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dangerousGoods.packinggroup || ""}
                  onChange={(e) =>
                    updateShipment(activeShipment, "dangerousGoods", {
                      ...dangerousGoods,
                      packinggroup: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 capitalize">ADR Amount</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dangerousGoods.adr_amount || ""}
                  onChange={(e) =>
                    updateShipment(activeShipment, "dangerousGoods", { ...dangerousGoods, adr_amount: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 capitalize">Density</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dangerousGoods.density || ""}
                  onChange={(e) =>
                    updateShipment(activeShipment, "dangerousGoods", { ...dangerousGoods, density: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              {/* Placards */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Placards</h4>
                  <button
                    type="button"
                    //   onClick={handleAddPlacard}
                    className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Placard
                  </button>
                </div>
                <div className="space-y-3">
                  {placards.map((placard) => (
                    <div key={placard.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Type</label>
                          <input
                            type="text"
                            placeholder="Type"
                            value={placard.type || ""}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                placards: placards.map((item) =>
                                  item.id === placard.id ? { ...item, type: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Value</label>
                          <input
                            type="text"
                            placeholder="Value"
                            value={placard.value || ""}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                placards: placards.map((item) =>
                                  item.id === placard.id ? { ...item, value: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDangerousGood("placards", placard.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Flags</h4>
                  <button
                    type="button"
                    //   onClick={handleAddFlag}
                    className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Flag
                  </button>
                </div>
                <div className="space-y-3">
                  {flags.map((flag, index) => (
                    <div key={flag.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Type</label>
                          <input
                            type="text"
                            placeholder="Type"
                            value={flag.type || ""}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                flags: flags.map((item) =>
                                  item.id === flag.id ? { ...item, type: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />

                          {
                            // @ts-ignore
                            errors.flags?.[index]?.type?.message && (
                              // @ts-ignore
                              <span className="text-red-500 text-sm">{errors.flags[index].type.message}</span>
                            )
                          }
                        </div>
                      </div>
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Value</label>
                          <input
                            type="text"
                            placeholder="Value"
                            value={flag.value || ""}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                flags: flags.map((item) =>
                                  item.id === flag.id ? { ...item, value: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDangerousGood("flags", flag.id)} // Fixed: was "placards"
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Infos */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Additional Infos</h4>
                  <button
                    type="button"
                    //   onClick={handleAddAdditionalInfo}
                    className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Info
                  </button>
                </div>
                <div className="space-y-3">
                  {additionalinfos.map((info) => (
                    <div key={info.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Type</label>
                          <input
                            type="text"
                            placeholder="Type"
                            value={info.type || ""}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                additionalinfos: additionalinfos.map((item) =>
                                  item.id === info.id ? { ...item, type: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Text</label>
                          <input
                            type="text"
                            placeholder="Text"
                            value={info.text || ""}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                additionalinfos: additionalinfos.map((item) =>
                                  item.id === info.id ? { ...item, text: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDangerousGood("additionalinfos", info.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Types */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Package Types</h4>
                  <button
                    type="button"
                    //   onClick={handleAddPackageType}
                    className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Package Type
                  </button>
                </div>
                <div className="space-y-3">
                  {package_types.map((packageType) => (
                    <div key={packageType.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Desc</label>
                          <input
                            type="text"
                            placeholder="Description"
                            value={packageType.desc || ""}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                package_types: package_types.map((item) =>
                                  item.id === packageType.id ? { ...item, desc: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div>
                          <label className="block text-sm font-medium mb-2 capitalize">Count</label>
                          <input
                            type="number"
                            placeholder="Count"
                            value={packageType.count || 0}
                            onChange={(e) =>
                              updateShipment(activeShipment, "dangerousGoods", {
                                ...dangerousGoods,
                                package_types: package_types.map((item) =>
                                  item.id === packageType.id ? { ...item, count: e.target.value } : item
                                ),
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDangerousGood("package_types", packageType.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DangerousGoods;
