import type React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">{children}</div>;
};
export default Layout;
