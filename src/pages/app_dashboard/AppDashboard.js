import { Box, ResponsiveContext, Text } from "grommet";
import PanelDetails from "../../components/app_dashboard/PanelDetails";
import PanelMain from "../../components/app_dashboard/PanelMain";
import { AppDashboardContextProvider, useAppDashboardContext } from "./context";
import { calculatePageContainerHeight } from "../../util/util";
import NavigationBar from "../../components/NavigationBar";

const AppDashboard = () => {
  return (
    <AppDashboardContextProvider>
      <Box flex="grow" fill="vertical" direction="row">
        <NavigationBar />
        <Box
          // pad={{
          //   top: "medium",
          //   left: "medium",
          //   right: "medium",
          //   bottom: "medium",
          // }}
          pad="medium"
          overflow="auto"
          fill
          align="top"
          justify="center"
          direction="row"
          gap="small"
        >
          <DashboardPanels />
        </Box>
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
