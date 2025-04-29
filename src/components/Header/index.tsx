import { useState } from "react";
import { Link } from "react-router";
import { Drawer } from "@mui/material";
import {
  Home as MuiHome,
  Person as MuiPerson,
  LocalHospital as MuiHospital,
  MenuRounded as MuiMenuRounded,
} from "@mui/icons-material";

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
    { url: "/", name: "Home", icon: <MuiHome fontSize="medium" /> },
    {
      url: "/appointments",
      name: "Consultas",
      icon: <MuiHospital fontSize="medium" />,
    },
  ];

  if (session.isDoctor()) {
    links.splice(1, 0, {
      url: "/patients",
      name: "Pacientes",
      icon: <MuiPerson fontSize="medium" />,
    });
  }

  return (
    <HeaderBody>
      <MuiMenuRounded
        sx={{
          color: "#fefefe",
          cursor: "pointer",
        }}
        fontSize="large"
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
