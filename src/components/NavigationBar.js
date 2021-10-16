import { Box, Avatar, Button, Nav, Sidebar } from "grommet";
import {
  Analytics,
  Chat,
  Clock,
  Configure,
  Help,
  Projects,
  StatusInfoSmall,
} from "grommet-icons";

const NavigationBar = () => {
  return (
    <Sidebar
      responsive
      background="dark-2"
      header={<SidebarHeader />}
      footer={<SidebarFooter />}
    >
      <MainNavigation />
    </Sidebar>
  );
};

const SidebarHeader = () => (
  <Avatar
    border={{ size: "small", color: "accent-2" }}
    background="white"
    flex={false}
  >
    SY
  </Avatar>
);

const SidebarFooter = () => (
  <Nav gap="small">
    <Button icon={<Chat />} />
    <Button icon={<Help />} />
  </Nav>
);

const MainNavigation = () => (
  <Nav gap="small">
    <Button icon={<StatusInfoSmall />} />
    <Button icon={<Projects />} />
    <Button icon={<Clock />} />
    <Box pad="small" border={{ color: "white", side: "bottom" }} />
    <Box gap="small" pad={{ vertical: "medium" }}>
      <Button icon={<Analytics />} />
      <Button icon={<Configure />} />
    </Box>
  </Nav>
);

export default NavigationBar;
