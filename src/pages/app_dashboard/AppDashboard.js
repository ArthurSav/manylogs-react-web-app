import { Box, ResponsiveContext, Text } from "grommet";
import PanelDetails from "../../components/app_dashboard/PanelDetails";
import PanelMain from "../../components/app_dashboard/PanelMain";
import { AppDashboardContextProvider, useAppDashboardContext } from "./context";
import { calculatePageContainerHeight } from "../../util/util";

const AppDashboard = () => {
  return (
    <AppDashboardContextProvider>
      <Box
        fill="vertical"
        overflow="auto"
        align="center"
        flex="grow"
        background={{ color: "dark-1" }}
        justify="start"
        direction="column"
        gap="small"
        pad="medium"
      >
        <Box align="center" justify="center" height="xxsmall" />
        <DashboardPanels />
      </Box>
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
