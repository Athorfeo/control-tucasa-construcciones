import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './app/App';
import Login from './ui/login/login';
import Dashboard from './ui/dashboard/dashboard';
import PurchaseOrder from './ui/purchase-order/purchase-order';

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
        element: <PurchaseOrder />
      }
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();