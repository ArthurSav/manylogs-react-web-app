import { Box, ResponsiveContext, Text } from "grommet";
import PanelDetails from "../../components/app_dashboard/PanelDetails";
import PanelMain from "../../components/app_dashboard/PanelMain";
import { AppDashboardContextProvider, useAppDashboardContext } from "./context";
import { calculatePageContainerHeight } from "../../util/util";
import SidebarContainer from "../../components/SidebarContainer";

const AppDashboard = () => {
  return (
    <AppDashboardContextProvider>
      <SidebarContainer>
        <Box flex="grow" pad="medium">
          <DashboardPanels />
        </Box>
      </SidebarContainer>
    </AppDashboardContextProvider>
  );
};

const DashboardPanels = () => {
  const { app } = useAppDashboardContext();
  const view = () => {
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            align="stretch"
            justify="center"
            direction="row-responsive"
            gap="small"
            height={calculatePageContainerHeight(size)}
          >
            <PanelMain />
            <PanelDetails />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  };
  const viewEmpty = () => {
    return <Text>Loading...</Text>;
  };
  return <>{app ? view() : viewEmpty()}</>;
};

export default AppDashboard;
