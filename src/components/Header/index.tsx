import { Drawer } from "@mui/material";
import { FiMenu } from "react-icons/fi";

import { HeaderBody } from "./styles";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <HeaderBody>
      <FiMenu
        color="#fefefe"
        size={45}
        cursor="pointer"
        onClick={toggleDrawer(!open)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        teste
      </Drawer>
    </HeaderBody>
  );
}

export default Header;
