import { Box, Button, Nav, Sidebar, Anchor } from "grommet";
import { Chat, Projects, UserSettings } from "grommet-icons";
import { Link } from "react-router-dom";
import { HomeRounded } from "../assets/HomeRounded";

const NavigationBar = () => {
  return (
    <Sidebar responsive={false} background="dark-2" footer={<SidebarFooter />}>
      <MainNavigation />
    </Sidebar>
  );
};

const MainNavigation = () => (
  <Nav gap="small">
    <Link to="/apps">
      <Button icon={<HomeRounded />} />
    </Link>
    <Box border={{ color: "white", side: "bottom" }} />
  </Nav>
);

const SidebarFooter = () => (
  <Nav gap="small">
    <Button icon={<Chat />} />
    <Button icon={<UserSettings />} />
  </Nav>
);

export default NavigationBar;
