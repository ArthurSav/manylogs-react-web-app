import { Box, Main } from "grommet";
import NavigationBar from "./NavigationBar";

const SidebarContainer = ({ children }) => {
  return (
    <Box fill direction="row">
      <NavigationBar />
      <Box align="center" justify="start" pad="medium" fill>
        {children}
      </Box>
    </Box>
  );
};
export default SidebarContainer;
