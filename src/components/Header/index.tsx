import { useState } from "react";
import { Link } from "react-router";
import { Drawer } from "@mui/material";
import { FiMenu, FiHome } from "react-icons/fi";

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
    { url: "/", name: "Home", icon: <FiHome size={20} /> },
  ];

  return (
    <HeaderBody>
      <FiMenu
        color="#fefefe"
        size={45}
        cursor="pointer"
        onClick={toggleDrawer(!open)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerContainer>
          {links.map((link) => (
            <LinkContainer>
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
