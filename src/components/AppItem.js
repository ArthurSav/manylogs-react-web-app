import { Box, Card, Text, Menu } from "grommet";

const AppItem = ({ id, name, connected }) => {
  return (
    <Card
      width="large"
      background={{ color: "light-1" }}
      pad="small"
      gap="small"
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
        <Text size="large" weight="bold">
          {name}
        </Text>
        <Box align="center" justify="start" direction="row-responsive">
          <Text size="large">{connected ? "online" : "offline"}</Text>
          <Box
            align="center"
            justify="center"
            background={
              connected ? { color: "accent-1" } : { color: "accent-2" }
            }
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
