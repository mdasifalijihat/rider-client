import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import AuthLayout from "../layout/AuthLayout";
import Coverage from "../pages/Covareage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, Component: Home },
      { path: "/coverage", Component: Coverage },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
