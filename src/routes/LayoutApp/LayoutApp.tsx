import React from "react";
import { Outlet } from "react-router-dom";

export const LayoutApp: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
