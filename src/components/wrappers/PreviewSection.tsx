const PreviewSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Preview Section */}
      <div className="xl:col-span-1">
        <div className="sticky top-6">{children}</div>
      </div>
    </>
  );
};
export default PreviewSection;
