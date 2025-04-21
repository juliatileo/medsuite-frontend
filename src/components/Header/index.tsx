import { useState } from "react";
import { Link } from "react-router";
import { Drawer } from "@mui/material";
import { FaBars, FaHome, FaUser, FaHospital } from "react-icons/fa";

import session from "config/session";

import {
  HeaderBody,
  DrawerContainer,
  LogOutContainer,
  LinkContainer,
} from "./styles";

function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const links: { url: string; name: string; icon: JSX.Element }[] = [
    { url: "/", name: "Home", icon: <FaHome size={20} /> },
    { url: "/appointments", name: "Consultas", icon: <FaHospital size={18} /> },
  ];

  if (session.isDoctor()) {
    links.splice(1, 0, {
      url: "/patients",
      name: "Pacientes",
      icon: <FaUser size={18} />,
    });
  }

  return (
    <HeaderBody>
      <FaBars
        color="#fefefe"
        size={45}
        cursor="pointer"
        onClick={toggleDrawer(!open)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerContainer>
          {links.map((link) => (
            <LinkContainer key={link.name}>
              {link.icon}
              <Link to={link.url}> {link.name}</Link>
            </LinkContainer>
          ))}
          <LogOutContainer>
            <span
              onClick={() => {
                session.logOut();

                window.location.reload();
              }}
            >
              Logout
            </span>
          </LogOutContainer>
        </DrawerContainer>
      </Drawer>
    </HeaderBody>
  );
}

export default Header;
