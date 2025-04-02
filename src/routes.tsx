import { BrowserRouter, Route, Routes } from "react-router";

import session from "config/session";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";

function Router() {
  return (
    <BrowserRouter>
      {session.isAuthenticated() ? (
        <Routes>
          <Route path="*" element={<Home />} />
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
