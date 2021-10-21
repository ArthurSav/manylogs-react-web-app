import { Box } from "grommet";
import PanelAppControls from "./PanelAppControls";
import PanelAppLogs from "./PanelAppLogs";

const PanelMain = () => {
  return (
    <Box gap="small" width="large">
      <PanelAppControls />
      <PanelAppLogs />
    </Box>
  );
};

export default PanelMain;
