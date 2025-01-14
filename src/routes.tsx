import { BrowserRouter, Route, Routes } from "react-router";

import Login from "pages/Login";
import Register from "pages/Register";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
