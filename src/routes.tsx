import { BrowserRouter, Route, Routes } from "react-router";

import session from "config/session";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Patients from "pages/Patients";
import Appointments from "pages/Appointments";

function Router() {
  return (
    <BrowserRouter>
      {session.isAuthenticated() ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router;
