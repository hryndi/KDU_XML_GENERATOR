import React, { useState } from "react";
import { Download, Eye, FileText, Plus, Trash2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

interface Package {
  weight: string;
  barcode: string;
}

interface Placard {
  type: string;
  value: string;
}

interface Flag {
  type: string;
  value: string;
}

interface AdditionalInfo {
  type: string;
  text: string;
}

interface PackageType {
  desc: string;
  count: number;
}
interface Service {
  service: "NORMAL" | "B2B" | "DISCRET";
}

interface Services {
  service: Service[];
  timeService: "NORMAL" | "ABEND" | "PLUS12" | "PLUS8" | "WEEKENDS";
}

interface DangerousGood {
  un_number: string;
  packinggroup: string;
  adr_amount: string;
  density: string;
  placards: Placard[];
  flags: Flag[];
  additionalinfos: AdditionalInfo[];
  package_types: PackageType[];
}

interface FormData {
  originFileName: string;
  originDate: string;
  customer: string;
  shipmentDate: string;
  palletCount: number;
  colliCount: number;
  totalWeight: string;
  shipmentType: "NORMAL" | "EXPRESS" | "OVERNIGHT";
  shipmentReference: string;
  recipientName1: string;
  recipientName2: string;
  street: string;
  streetNumber: string;
  city: string;
  services: Services[];
  postalCode: string;
  country: string;
  packages: Package[];
  dangerousGoods: DangerousGood[];
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    originFileName: "TOF534455000.DFU",
    originDate: new Date().toLocaleDateString("de-DE"),
    customer: "534455000",
    shipmentDate: new Date().toLocaleDateString("de-DE"),
    palletCount: 0,
    colliCount: 5,
    totalWeight: "151,5",
    shipmentType: "NORMAL",
    shipmentReference: "14498191",
    recipientName1: "Spain Broke Company",
    recipientName2: "Don Anton",
    street: "Camiño Sacido C",
    streetNumber: "34",
    city: "O Vicedo",
    services: [{ service: [{ service: "NORMAL" }], timeService: "NORMAL" }],
    postalCode: "27860",
    country: "ES",
    packages: [
      { weight: "30,3", barcode: "344550160601000013427860" },
      { weight: "30,3", barcode: "344550160602000013427860" },
      { weight: "30,3", barcode: "344550160603000013427860" },
      { weight: "30,3", barcode: "344550160604000013427860" },
      { weight: "30,3", barcode: "344550160605000013427860" },
    ],
    dangerousGoods: [],
  });

  const [xmlOutput, setXmlOutput] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showDangerousGoods, setShowDangerousGoods] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData, value: string | number): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePackageChange = (index: number, field: keyof Package, value: string): void => {
    const newPackages = [...formData.packages];
    newPackages[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      packages: newPackages,
      colliCount: newPackages.length,
    }));
  };

  const addPackage = (): void => {
    const newPackages = [...formData.packages];
    newPackages.push({ weight: "30,3", barcode: "" });
    setFormData((prev) => ({
      ...prev,
      packages: newPackages,
      colliCount: newPackages.length,
    }));
  };

  const removePackage = (index: number): void => {
    const newPackages = formData.packages.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      packages: newPackages,
      colliCount: newPackages.length,
    }));
  };

  const addServices = (): void => {
    const newServices: Services = {
      service: [{ service: "NORMAL" }, { service: "DISCRET" }, { service: "B2B" }],
      timeService: "PLUS12",
    };
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, newServices],
    }));
  };
  const removeServices = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const generateServicesXML = (): string => {
    if (formData.services.length === 0) return "";

    return `<services>
${formData.services
  .map(
    (service) => `${service.service.map((service) => `            <service>${service.service}</service>`).join("\n")}
            <timeService>${service.timeService}</timeService>`
  )
  .join("\n")}
          </services>`;
  };

  const addDangerousGood = (): void => {
    const newDangerousGood: DangerousGood = {
      un_number: "1170",
      packinggroup: "3",
      adr_amount: "20,79",
      density: "0,80",
      placards: [{ type: "PLACARD", value: "3" }],
      flags: [
        { type: "LQ", value: "0" },
        { type: "UNIT_OF_MEASUREMENT", value: "L" },
        { type: "TRANSPORT_CATEGORY", value: "3" },
      ],
      additionalinfos: [
        { type: "MATERIAL_DESCRIPTION", text: "ETHANOL, LÖSUNG" },
        { type: "ADDITIONAL_DESCRIPTION", text: "(Ethylalkohol, Lösung)" },
      ],
      package_types: [{ desc: "Kiste aus Pappe", count: 1 }],
    };
    setFormData((prev) => ({
      ...prev,
      dangerousGoods: [...prev.dangerousGoods, newDangerousGood],
    }));
  };

  const removeDangerousGood = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      dangerousGoods: prev.dangerousGoods.filter((_, i) => i !== index),
    }));
  };

  const updateDangerousGood = (index: number, field: keyof DangerousGood, value: any): void => {
    const newDangerousGoods = [...formData.dangerousGoods];
    newDangerousGoods[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      dangerousGoods: newDangerousGoods,
    }));
  };

  const generateDangerousGoodsXML = (): string => {
    if (formData.dangerousGoods.length === 0) return "";

    return `      <dangerous_goods>
${formData.dangerousGoods
  .map(
    (dg) => `        <dangerous_good>
          <un_number>${dg.un_number}</un_number>
          <packinggroup>${dg.packinggroup}</packinggroup>
          <adr_amount>${dg.adr_amount}</adr_amount>
          <density>${dg.density}</density>
          <placards>
${dg.placards
  .map(
    (placard) => `            <placard>
              <type>${placard.type}</type>
              <value>${placard.value}</value>
            </placard>`
  )
  .join("\n")}
          </placards>
          <flags>
${dg.flags
  .map(
    (flag) => `            <flag>
              <type>${flag.type}</type>
              <value>${flag.value}</value>
            </flag>`
  )
  .join("\n")}
          </flags>
          <additionalinfos>
${dg.additionalinfos
  .map(
    (info) => `            <info>
              <type>${info.type}</type>
              <text>${info.text}</text>
            </info>`
  )
  .join("\n")}
          </additionalinfos>
          <package_types>
${dg.package_types
  .map(
    (pkgType) => `            <package_type>
              <desc>${pkgType.desc}</desc>
              <count>${pkgType.count}</count>
            </package_type>`
  )
  .join("\n")}
          </package_types>
        </dangerous_good>`
  )
  .join("\n")}
      </dangerous_goods>`;
  };

  const generateXML = (): void => {
    const dangerousGoodsXML = generateDangerousGoodsXML();
    const servicesXML = generateServicesXML();
    const xml = `<?xml version="1.0" encoding="UTF-16"?>
<aviso>
  <version>2.8</version>
  <origin_file>
    <name>${formData.originFileName}</name>
    <date>${formData.originDate}</date>
    <type>XML</type>
  </origin_file>
  <shipments>
    <shipment>
      <customer>${formData.customer}</customer>
      <date>${formData.shipmentDate}</date>
      <palletcount>${formData.palletCount}</palletcount>
      <collicount>${formData.colliCount}</collicount>
      <weight>${formData.totalWeight}</weight>
      <type>${formData.shipmentType}</type>
      <references>
        <reference>
          <type>SHIPMENT</type>
          <value>${formData.shipmentReference}</value>
        </reference>
      </references>
      <addresses>
        <address>
          <type>RECIPIENT</type>
          <name1>${formData.recipientName1}</name1>
          <street>${formData.street}</street>
          <name2>${formData.recipientName2}</name2>
          <number>${formData.streetNumber}</number>
          <country>${formData.country}</country>
          <code>${formData.postalCode}</code>
          <city>${formData.city}</city>
          ${servicesXML}
        </address>
      </addresses>
${dangerousGoodsXML}
      <packages>
${formData.packages
  .map(
    (pkg) => `        <package>
          <type>C</type>
          <weight>${pkg.weight}</weight>
          <barcodes>
            <barcode>
              <type>PACKAGE</type>
              <value>${pkg.barcode}</value>
            </barcode>
          </barcodes>
        </package>`
  )
  .join("\n\n")}
      </packages>
    </shipment>
  </shipments>
</aviso>`;

    setXmlOutput(xml);
    setShowPreview(true);
  };

  const downloadXML = (): void => {
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.originFileName.replace(".DFU", "")}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">XML Document Generator</h1>
        <p className="text-gray-600">Fill out the form below to generate your shipping XML document</p>
      </div>
      {/*lg:grid-cols-2 */}
      <div className="grid grid-cols-1  gap-8">
        <div className="space-y-6">
          {/* Origin File Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Origin File Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Origin File Name</label>
                <input
                  type="text"
                  value={formData.originFileName}
                  onChange={(e) => handleInputChange("originFileName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Origin Date</label>
                <input
                  type="text"
                  value={formData.originDate}
                  onChange={(e) => handleInputChange("originDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Shipment Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Shipment Information</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <input
                    type="text"
                    value={formData.customer}
                    onChange={(e) => handleInputChange("customer", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Date</label>
                  <input
                    type="text"
                    value={formData.shipmentDate}
                    onChange={(e) => handleInputChange("shipmentDate", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pallet Count</label>
                  <input
                    type="number"
                    value={formData.palletCount}
                    onChange={(e) => handleInputChange("palletCount", parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colli Count</label>
                  <input
                    type="number"
                    value={formData.colliCount}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Weight</label>
                  <input
                    type="text"
                    value={formData.totalWeight}
                    onChange={(e) => handleInputChange("totalWeight", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Type</label>
                  <select
                    value={formData.shipmentType}
                    onChange={(e) => handleInputChange("shipmentType", e.target.value as FormData["shipmentType"])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="NORMAL">NORMAL</option>
                    <option value="EXPRESS">EXPRESS</option>
                    <option value="OVERNIGHT">OVERNIGHT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Reference</label>
                  <input
                    type="text"
                    value={formData.shipmentReference}
                    onChange={(e) => handleInputChange("shipmentReference", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recipient Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Recipient Address</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.recipientName1}
                    onChange={(e) => handleInputChange("recipientName1", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={formData.recipientName2}
                    onChange={(e) => handleInputChange("recipientName2", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange("street", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                  <input
                    type="text"
                    value={formData.streetNumber}
                    onChange={(e) => handleInputChange("streetNumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Services</h3>
            <div className="space-y-4">
              {formData.services.map((serviceGroup, groupIndex) => (
                <div key={groupIndex} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">Service Group #{groupIndex + 1}</h4>
                    {groupIndex > 0 && (
                      <button
                        onClick={() => {
                          const newServices = formData.services.filter((_, i) => i !== groupIndex);
                          setFormData((prev) => ({ ...prev, services: newServices }));
                        }}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
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
                              checked={serviceGroup.service.some((s) => s.service === serviceType)}
                              onChange={(e) => {
                                const newServices = [...formData.services];
                                const currentServices = newServices[groupIndex].service;

                                if (e.target.checked) {
                                  // Add service if not present
                                  if (!currentServices.some((s) => s.service === serviceType)) {
                                    currentServices.push({ service: serviceType as Service["service"] });
                                  }
                                } else {
                                  // Remove service
                                  newServices[groupIndex].service = currentServices.filter(
                                    (s) => s.service !== serviceType
                                  );
                                }

                                setFormData((prev) => ({ ...prev, services: newServices }));
                              }}
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
                        onChange={(e) => {
                          const newServices = [...formData.services];
                          newServices[groupIndex].timeService = e.target.value as Services["timeService"];
                          setFormData((prev) => ({ ...prev, services: newServices }));
                        }}
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
              ))}

              <button
                onClick={addServices}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} />
                Add Service Group
              </button>
            </div>
          </div>
          {/* Dangerous Goods Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg">
            <button
              onClick={() => setShowDangerousGoods(!showDangerousGoods)}
              className="w-full p-4 flex items-center justify-between hover:bg-orange-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">Dangerous Goods (Optional)</h3>
              </div>
              {showDangerousGoods ? (
                <ChevronUp className="text-orange-600" size={20} />
              ) : (
                <ChevronDown className="text-orange-600" size={20} />
              )}
            </button>

            {showDangerousGoods && (
              <div className="p-4 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Configure dangerous goods for this shipment</p>
                  <button
                    onClick={addDangerousGood}
                    className="flex items-center gap-2 px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    <Plus size={16} />
                    Add Dangerous Good
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.dangerousGoods.map((dg, dgIndex) => (
                    <div key={dgIndex} className="bg-white p-4 rounded-lg border border-orange-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">Dangerous Good #{dgIndex + 1}</h4>
                        <button
                          onClick={() => removeDangerousGood(dgIndex)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">UN Number</label>
                          <input
                            type="text"
                            value={dg.un_number}
                            onChange={(e) => updateDangerousGood(dgIndex, "un_number", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Packing Group</label>
                          <input
                            type="text"
                            value={dg.packinggroup}
                            onChange={(e) => updateDangerousGood(dgIndex, "packinggroup", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ADR Amount</label>
                          <input
                            type="text"
                            value={dg.adr_amount}
                            onChange={(e) => updateDangerousGood(dgIndex, "adr_amount", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Density</label>
                          <input
                            type="text"
                            value={dg.density}
                            onChange={(e) => updateDangerousGood(dgIndex, "density", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-2">
                        <p>
                          <strong>Note:</strong> This is a simplified interface. The full dangerous goods form includes
                          placards, flags, additional info, and package types as shown in the XML output.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Packages */}
          <div className="bg-gray-50 p-4 rounded-lg">
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
              {formData.packages.map((pkg, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-md border">
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

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={generateXML}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <FileText size={16} />
              Generate XML
            </button>
            {xmlOutput && (
              <>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Eye size={16} />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
                <button
                  onClick={downloadXML}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                >
                  <Download size={16} />
                  Download XML
                </button>
              </>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6">
          {showPreview && xmlOutput && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">XML Preview</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm max-h-96 overflow-y-auto">
                {xmlOutput}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
