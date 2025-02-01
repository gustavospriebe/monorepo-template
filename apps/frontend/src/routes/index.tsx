import { createBrowserRouter } from "react-router-dom";
import { LayoutForm } from "../layout/form";

export const router = createBrowserRouter([
  {
    element: <LayoutForm />,
    children: [
      {
        path: "/",
        element: <div>home</div>,
      },
      {
        path: "auth/register",
        element: <div>registedsddsdssdsdr</div>,
        // element: <NewAccount />,
      },
      {
        path: "auth/validate-registration-confirmation/:token",
        element: <div>validate-registration-confirmation</div>,
        // element: <RegistrationConfirmation />,
      },
      // daqui pra cima ja atualizei
      // { path: "auth/", element: <Authenticate /> },
    ],
  },
]);
