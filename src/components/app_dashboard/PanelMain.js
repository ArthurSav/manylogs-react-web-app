import { Box } from "grommet";
import PanelAppControls from "./PanelAppControls";
import PanelAppLogs from "./PanelAppLogs";

const PanelMain = () => {
  return (
    <Box align="center" justify="center" gap="small">
      <PanelAppControls />
      <PanelAppLogs />
    </Box>
  );
};

export default PanelMain;
