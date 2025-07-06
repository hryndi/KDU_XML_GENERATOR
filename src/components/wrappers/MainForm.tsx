import type React from "react";

const MainForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Main Form */}
      <div className="xl:col-span-2">
        <div className="space-y-6">{children}</div>
      </div>
    </>
  );
};

export default MainForm;
