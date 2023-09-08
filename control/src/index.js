import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './ui/App';
import Login from './ui/login/login';
import Dashboard from './ui/dashboard/dashboard';
import DashboardPurchaseOrder from './ui/purchase/order/dashboard-purchase-order';
import DashboardInvoicePurchase from './ui/purchase/invoice/DashboardInvoicePurchase';
import DetailInvoicePurchase from './ui/purchase/invoice/detail/DetailInvoicePurchase';
import DetailPurchaseOrder from './ui/purchase/order/detail/detail-purchase-order';
import DashboardPettyCashPurchase from './ui/purchase/pettycash/DashboardPettyCashPurchase';
import DetailPettyCashPurchase from './ui/purchase/pettycash/detail/DetailPettyCashPurchase';
import DashboardFeature from './ui/feature/dashboard-feature';
import DashboardMinuteService from 'ui/service/minute/DashboardMinuteService';
import DetailMinuteService from 'ui/service/minute/detail/DetailMinuteService';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "feature",
        element: <DashboardFeature />
      },
      // Order [Purchase]
      {
        path: "/purchase/order/:spreadsheetId",
        element: <DashboardPurchaseOrder />
      },
      {
        path: "/purchase/order/:spreadsheetId/:action",
        element: <DetailPurchaseOrder />
      },
      {
        path: "/purchase/order/:spreadsheetId/:action/start/:start/end/:end",
        element: <DetailPurchaseOrder />
      },
      // Invoice [Purchase]
      {
        path: "/purchase/invoice/:spreadsheetId",
        element: <DashboardInvoicePurchase />
      },
      {
        path: "/purchase/invoice/:spreadsheetId/:action",
        element: <DetailInvoicePurchase />
      },
      {
        path: "/purchase/invoice/:spreadsheetId/:action/start/:start/end/:end",
        element: <DetailInvoicePurchase />
      },
      // Petty Cash [Purchase]
      {
        path: "/purchase/pettycash/:spreadsheetId",
        element: <DashboardPettyCashPurchase />
      },
      {
        path: "/purchase/pettycash/:spreadsheetId/:action",
        element: <DetailPettyCashPurchase />
      },
      {
        path: "/purchase/pettycash/:spreadsheetId/:action/position/:position",
        element: <DetailPettyCashPurchase />
      },
      // Service
      {
        path: "/service/minute/:spreadsheetId",
        element: <DashboardMinuteService />
      },
      {
        path: "/service/minute/:spreadsheetId/:action",
        element: <DetailMinuteService />
      },
      {
        path: "/service/minute/:spreadsheetId/:action/position/:position",
        element: <DetailMinuteService />
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();