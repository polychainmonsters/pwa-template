import React from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import {
  Home,
  Intro,
  LayoutApp,
  LayoutAuth,
  PageError,
  PageNotFound,
} from "./routes";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutApp />} errorElement={<PageError />}>
      <Route index element={<Intro />} />
      <Route element={<LayoutAuth />}>
        <Route path="home" element={<Home />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
