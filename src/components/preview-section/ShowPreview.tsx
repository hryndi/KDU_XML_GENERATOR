import { useStatements } from "../../context/states/useStates";

const ShowPreview = () => {
  const { xmlOutput, showPreview } = useStatements();

  return (
    <>
      {/* XML Preview */}
      {showPreview && xmlOutput && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">XML Preview</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-xs max-h-96 overflow-y-auto">
            {xmlOutput}
          </pre>
        </div>
      )}
    </>
  );
};

export default ShowPreview;
