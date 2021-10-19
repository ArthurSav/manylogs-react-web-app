import { Box, Button, Nav, Sidebar } from "grommet";
import { UserSettings } from "grommet-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeRounded } from "../assets/HomeRounded";
import DialogMyAccount from "./DialogMyAccount";

const NavigationBar = () => {
  return (
    <Sidebar responsive={false} background="dark-2" footer={<SidebarFooter />}>
      <MainNavigation />
    </Sidebar>
  );
};

const MainNavigation = () => (
  <Nav gap="small">
    <Link to="/">
      <Button icon={<HomeRounded />} />
    </Link>
    <Box border={{ color: "white", side: "bottom" }} />
  </Nav>
);

const SidebarFooter = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  return (
    <Nav gap="small">
      {open && <DialogMyAccount onClose={onClose} />}
      {/* <Button icon={<Chat />} /> */}
      <Button icon={<UserSettings onClick={onOpen} />} />
    </Nav>
  );
};

export default NavigationBar;
