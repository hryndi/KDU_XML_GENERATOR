import { FileText } from "lucide-react";

import { useFormData } from "../../context/FormData/useFormData";

const OriginFileInfo = () => {
  const { formData, setFormData } = useFormData();

  const dateUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setFormData((prev) => ({
      ...prev,
      originDate: newDate, // Update the origin date in formData
    }));
  };

  return (
    <>
      {/* Origin File Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <FileText size={18} className="text-blue-600" />
          Origin File Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Origin File Name</label>
            <input
              type="text"
              value={formData.originFileName}
              onChange={(e) => setFormData((prev) => ({ ...prev, originFileName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Origin Date</label>
            <input
              type="date"
              // value={convertToInputFormat(formData.originDate)}
              onChange={(e) => dateUpdate(e)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default OriginFileInfo;
