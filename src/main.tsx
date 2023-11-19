import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./providers";

import * as Pages from "./pages";
import { PrivateRoute } from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Pages.HomePage />,
      },
      {
        path: "/sign-in",
        element: <Pages.SignInPage />,
      },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <Pages.UserPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
