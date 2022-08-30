import React from "react";
import { lazy } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import urlRoute from "./utils/urlRoute";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./views/Dashboard/Dashboard";
import Account from "./views/Account/Account"

const getLinkRouter = (str: string) => str.replace("/", "");

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route
            path={getLinkRouter(urlRoute.dashboard)}
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path={getLinkRouter(urlRoute.account)}
            element={
              <MainLayout>
                <Account />
              </MainLayout>
            }
          />
        </Route>

        <Route index element={<Navigate to={urlRoute.dashboard} />} />
        <Route path="/*" element={<Navigate to={urlRoute.dashboard} />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
