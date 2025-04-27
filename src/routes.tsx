import { BrowserRouter, Route, Routes } from "react-router";

import session from "config/session";

import Login from "pages/Login";
import Home from "pages/Home";
import Patients from "pages/Patients";
import Appointments from "pages/Appointments";

function Router() {
  const authenticatedRoutes = [
    <Route path="*" element={<Home />} />,
    <Route path="/appointments" element={<Appointments />} />,
  ];

  if (session.isDoctor()) {
    authenticatedRoutes.push(<Route path="/patients" element={<Patients />} />);
  }

  return (
    <BrowserRouter>
      {session.isAuthenticated() ? (
        <Routes>...{authenticatedRoutes}</Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router;
