import { Box, ResponsiveContext } from "grommet";
import PanelDetails from "../components/app_dashboard/PanelDetails";
import PanelMain from "../components/app_dashboard/PanelMain";

const AppDashboard2 = () => {
  const calculateContainerHeight = (size) => {
    return size === "small" || size === "medium" ? "100%" : "xlarge";
  };

  return (
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
      <Box align="center" justify="center" height="xsmall" />
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            align="stretch"
            justify="center"
            direction="row-responsive"
            gap="small"
            height={calculateContainerHeight(size)}
          >
            <PanelMain />
            <PanelDetails />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  );
};

export default AppDashboard2;
