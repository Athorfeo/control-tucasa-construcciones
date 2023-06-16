import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './ui/App';
import Login from './ui/login/login';
import Dashboard from './ui/dashboard/dashboard';
import DashboardPurchaseOrder from './ui/purchase-order/dashboard-purchase-order';
import DetailPurchaseOrder from './ui/purchase-order/detail/detail-purchase-order';
import DashboardFeature from './ui/feature/dashboard-feature';

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
        path: "purchase-order",
        element: <DashboardPurchaseOrder />
      },
      {
        path: "/purchase-order/detail/start/:start/end/:end",
        element: <DetailPurchaseOrder />
      },
      {
        path: "feature",
        element: <DashboardFeature />
      }
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();