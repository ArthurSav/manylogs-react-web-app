import { Box } from "grommet";

const CircleStatusIndicator = ({ isActive }) => {
  return (
    <Box
      align="center"
      justify="center"
      background={isActive ? { color: "status-ok" } : { color: "calm-red" }}
      pad="xsmall"
      round="medium"
      margin={{ left: "xsmall" }}
    />
  );
};

export default CircleStatusIndicator;
