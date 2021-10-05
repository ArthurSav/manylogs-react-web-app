import { Box, Text, Select, CheckBox, ThemeContext, Tip } from "grommet";
import { CircleInformation } from "grommet-icons";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import CircleStatusIndicator from "../../components/CircleStatusIndicator";

const theme = {
  icon: {
    size: {
      smallplus: "20px",
    },
  },
};

const PanelAppControls = () => {
  const state = useAppDashboardContext();
  const { name, isConnected } = state.app;
  return (
    <Box
      align="start"
      justify="start"
      background={{ color: "background-contrast" }}
      round="small"
      direction="column"
      width="large"
      fill="horizontal"
      pad="small"
      gap="medium"
    >
      <AppInfo name={name} isConnected={isConnected} />
      <AppControls />
    </Box>
  );
};

const AppInfo = ({ name, isConnected }) => {
  const status = isConnected ? "online" : "offline";
  return (
    <Box
      align="start"
      justify="start"
      direction="row"
      gap="medium"
      fill="horizontal"
      height="xsmall"
    >
      <Box
        align="center"
        justify="center"
        pad="small"
        background={{ color: "light-4" }}
        round="xsmall"
      >
        <Text size="4xl">📱</Text>
      </Box>
      <Box align="stretch" justify="start" direction="column" gap="xsmall">
        <Text size="large" weight="bold">
          {name}
        </Text>
        <Box align="center" justify="start" direction="row">
          <Text size="large">{status}</Text>
          <CircleStatusIndicator isActive={isConnected} />
        </Box>
      </Box>
    </Box>
  );
};

const AppControls = () => {
  return (
    <ThemeContext.Extend value={theme}>
      <Box
        align="center"
        justify="center"
        direction="row"
        gap="small"
        fill="horizontal"
        height="xsmall"
        border={{ size: "xsmall", side: "top" }}
      >
        <Box
          align="start"
          justify="start"
          round="small"
          gap="medium"
          direction="row-responsive"
          flex="grow"
        >
          <Box
            align="center"
            justify="center"
            direction="row"
            gap="small"
            pad="small"
            round="xsmall"
          >
            <CheckBox label="Record" toggle reverse />
            <Tip
              plain
              content={
                <Box
                  pad="small"
                  gap="small"
                  width={{ max: "small" }}
                  round="small"
                  background="light-2"
                  responsive={false}
                >
                  <Text weight="bold">Help</Text>
                  <Text size="small">
                    Help is on the way! Who are you going to call?
                  </Text>
                </Box>
              }
              dropProps={{ align: { left: "right" } }}
            >
              <CircleInformation size="smallplus" color="light-6" />
            </Tip>
          </Box>
          <Box
            align="center"
            justify="center"
            direction="row"
            gap="small"
            pad="small"
            round="small"
          >
            <CheckBox label="Replay" toggle reverse />
            <CircleInformation size="smallplus" color="light-6" />
          </Box>
        </Box>
        <Select
          options={["User John", "User Pro", "Another One", "+ Add Profile"]}
          placeholder="Default Profile"
        />
      </Box>
    </ThemeContext.Extend>
  );
};

export default PanelAppControls;
