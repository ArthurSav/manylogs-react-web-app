import { Box, Button, Nav, Sidebar } from "grommet";
import { Chat, Projects, UserSettings } from "grommet-icons";
import { HomeRounded } from "../assets/HomeRounded";

const NavigationBar = () => {
  return (
    <Sidebar responsive background="dark-2" footer={<SidebarFooter />}>
      <MainNavigation />
    </Sidebar>
  );
};

const SidebarFooter = () => (
  <Nav gap="small">
    <Button icon={<Chat />} />
    <Button icon={<UserSettings />} />
  </Nav>
);

const MainNavigation = () => (
  <Nav gap="small">
    <Button icon={<HomeRounded />} />
    <Box border={{ color: "white", side: "bottom" }} />
  </Nav>
);

export default NavigationBar;
