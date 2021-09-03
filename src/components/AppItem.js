import { Box, Card, Text, Menu } from "grommet";

const AppItem = () => {
  return (
    <Card
      direction="row"
      background={{ color: "light-1" }}
      pad="small"
      gap="small"
      margin="medium"
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
      <Box
        align="stretch"
        justify="center"
        direction="column"
        margin={{ left: "small", right: "small" }}
        gap="xxsmall"
      >
        <Text size="xlarge" weight="bold">
          iphoneXYZ
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
      <Box align="center" justify="center" margin={{ left: "xlarge" }}>
        <Menu />
      </Box>
    </Card>
  );
};

export default AppItem;
