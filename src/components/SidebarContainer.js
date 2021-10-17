import { Box, Main } from "grommet";
import NavigationBar from "./NavigationBar";

const SidebarContainer = ({ children }) => {
  return (
    <Box fill direction="row">
      <NavigationBar />
      <Main align="center" justify="top">
        {children}
      </Main>
    </Box>
  );
};
export default SidebarContainer;
