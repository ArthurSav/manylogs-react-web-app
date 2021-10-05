import { Box, Text, Select, CheckBox } from "grommet";
import { CircleInformation } from "grommet-icons";

const PanelAppControls = () => {
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
            iphoneXYZiphoneXYZ12
          </Text>
          <Box align="center" justify="start" direction="row-responsive">
            <Text size="large">online</Text>
            <Box
              align="center"
              justify="center"
              background={{ dark: false, color: "accent-1" }}
              pad="xsmall"
              round="medium"
              margin={{ left: "xsmall" }}
            />
          </Box>
        </Box>
      </Box>
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
            <CircleInformation size="medium" color="light-6" />
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
            <CircleInformation size="medium" color="light-6" />
          </Box>
        </Box>
        <Select
          options={["User John", "User Pro", "Another One", "+ Add Profile"]}
          placeholder="Default Profile"
        />
      </Box>
    </Box>
  );
};

export default PanelAppControls;
