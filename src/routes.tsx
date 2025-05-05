import { BrowserRouter, Route, Routes } from "react-router";

import session from "config/session";

import Login from "pages/Login";
import Home from "pages/Home";
import Patients from "pages/Patients";
import Appointments from "pages/Appointments";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import { useFirstAccess } from "providers/FirstAccessProvider";

function Router() {
  const firstAccessContext = useFirstAccess();

  let authenticatedRoutes = [
    <Route path="*" element={<Home />} />,
    <Route path="/appointments" element={<Appointments />} />,
  ];

  if (session.isDoctor()) {
    authenticatedRoutes.push(<Route path="/patients" element={<Patients />} />);
  }

  if (firstAccessContext.isFirstAccess) {
    authenticatedRoutes = [<Route path="*" element={<ResetPassword />} />];
  }

  return (
    <BrowserRouter>
      {session.isAuthenticated() ? (
        <Routes>...{authenticatedRoutes}</Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router;
