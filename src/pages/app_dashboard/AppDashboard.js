import { Box, Text } from "grommet";
import PanelDetails from "../../components/app_dashboard/PanelDetails";
import PanelMain from "../../components/app_dashboard/PanelMain";
import { AppDashboardContextProvider, useAppDashboardContext } from "./context";
import SidebarContainer from "../../components/SidebarContainer";

// main view that loads context
const AppDashboard = () => {
  return (
    <AppDashboardContextProvider>
      <DashboardPanels />
    </AppDashboardContextProvider>
  );
};

// content
const DashboardPanels = () => {
  const { app } = useAppDashboardContext();
  const view = () => {
    return (
      <Box
        justify="center"
        direction="row-responsive"
        gap="small"
        fill="vertical"
        height={{ min: "large" }}
      >
        <PanelMain />
        <PanelDetails />
      </Box>
    );
  };
  const viewEmpty = () => <Text>Loading...</Text>;

  return (
    <SidebarContainer>
      <Box fill="vertical">{app ? view() : viewEmpty()}</Box>
    </SidebarContainer>
  );
};

export default AppDashboard;
