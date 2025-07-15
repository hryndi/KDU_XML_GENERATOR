import { Download, FileText, Eye } from "lucide-react";
import { useStatements } from "../../context/states/useStates";
import { useFormData } from "../../context/FormData/useFormData";
import { useActiveShipment } from "../../context/shipment/useActiveShipment";
import type { Shipment } from "../../types/formData";
import { useEffect } from "react";
import { useSchemaContext } from "../../context/schemaContext/useSchemaContext";
import { FormDataSchema } from "../../lib/inputsValidation";

const Actions = () => {
  const { formData } = useFormData();
  const { isPickup } = useStatements();
  const { activeShipment } = useActiveShipment();
  const { xmlOutput, showPreview, setShowPreview, setXmlOutput, isDangerousGoodsActive } = useStatements();
  const { form } = useSchemaContext();

  const currentShipment = formData.shipments[activeShipment] || formData.shipments[0];

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const generateServicesXML = (shipment: Shipment): string => {
    if (formData.shipments.length === 0) return "";

    return `<services>
${shipment.services
  .map(
    (service) => `${service.service.map((service) => `            <service>${service.service}</service>`).join("\n")}
            <timeService>${service.timeService}</timeService>`
  )
  .join("\n")}
          </services>`;
  };

  const generateDangerousGoodsXML = (shipment: Shipment): string => {
    if (formData.shipments.length === 0) return "";
    const dg = shipment.dangerousGoods;
    return `      <dangerous_goods>
${`        <dangerous_good>
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
        </dangerous_good>`}
      </dangerous_goods>`;
  };

  const generateXML = (): void => {
    // const dangerousGoodsXML = generateDangerousGoodsXML();
    // const servicesXML = generateServicesXML();

    const xml = `<?xml version="1.0" encoding="UTF-16"?>
<aviso>
  <version>2.8</version>
  <origin_file>
    <name>${formData.originFileName}</name>
    <date>${formData.originDate}</date>
    <type>XML</type>
  </origin_file>
  <shipments>
  ${formData.shipments
    .map((shipment) =>
      `    <shipment>
      <customer>${shipment.customer}</customer>
      <date>${shipment.shipmentDate}</date>
      <palletcount>${shipment.palletCount}</palletcount>
      <collicount>${currentShipment.colliCount}</collicount>
      <weight>${shipment.totalWeight}</weight>
      <type>${shipment.shipmentType}</type>
      <references>
        <reference>
          <type>SHIPMENT</type>
          <value>${shipment.shipmentReference}</value>
        </reference>
      </references>
      <addresses>
        <address>
          <type>RECIPIENT</type>
          <name1>${shipment.adresses[0].recipientName1}</name1>
          <street>${shipment.adresses[0].street}</street>
          <name2>${shipment.adresses[0].recipientName2}</name2>
          <number>${shipment.adresses[0].streetNumber}</number>
          <country>${shipment.adresses[0].country}</country>
          <code>${shipment.adresses[0].postalCode}</code>
          <city>${shipment.adresses[0].city}</city>
          ${generateServicesXML(shipment)}
        </address>
        ${
          isPickup &&
          `<address>
          <type>PICKUP</type>
          <name1>${shipment.adresses[1].recipientName1}</name1>
          <street>${shipment.adresses[1].street}</street>
          <name2>${shipment.adresses[1].recipientName2}</name2>
          <number>${shipment.adresses[1].streetNumber}</number>
          <country>${shipment.adresses[1].country}</country>
          <code>${shipment.adresses[1].postalCode}</code>
          <city>${shipment.adresses[1].city}</city>
          ${generateServicesXML(shipment)}
        </address>`
        }
      </addresses>
${isDangerousGoodsActive ? generateDangerousGoodsXML(shipment) : ""}
      ${!isPickup ? "<packages>" : ""}
${
  !isPickup
    ? shipment.packages
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
        .join("\n\n")
    : ""
}
       ${!isPickup ? "</packages>" : ""}
    </shipment>`
        .replace(/\n\s*\n/g, "\n")
        .trim()
    )
    .join("\n")}
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

  const onGenerate = () => {
    const result = FormDataSchema.safeParse(formData);
    if (!result.success) {
      generateXML();
    } else {
      console.log("Shipment valid!", result.data);
      console.error(result.error);
    }
  };
  const onError = (errors: any) => {
    console.group("🚨 Form Submission Failed - Validation Errors:");
    console.log("Full error object:", errors);

    Object.entries(errors).forEach(([field, error]: [string, any]) => {
      console.log(`❌ ${field}: ${error?.message || "Unknown error"}`);
    });

    console.log("Current form values:", form.getValues());
    console.groupEnd();
  };

  return (
    <>
      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={form.handleSubmit(onGenerate, onError)}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          <FileText size={18} />
          Generate XML
        </button>
        {xmlOutput && (
          <>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              <Eye size={18} />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              onClick={downloadXML}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              <Download size={18} />
              Download XML
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Actions;
