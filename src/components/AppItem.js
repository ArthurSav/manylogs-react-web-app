import { Box, Card, Text, Menu } from "grommet";
import { useHistory } from "react-router-dom";

const AppItem = ({ id, name, isConnected }, onClick) => {
  const history = useHistory();
  const gotoAppDetails = () => {
    history.push("/apps/" + id);
  };
  return (
    <Card
      background={{ color: "light-1" }}
      pad={{ top: "small", right: "small", left: "small" }}
      onClick={() => gotoAppDetails()}
      gap="small"
    >
      <Box
        align="center"
        justify="center"
        pad="small"
        background={{ color: "neutral-3" }}
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
        <Text size="medium" weight="bold" truncate>
          {name}
        </Text>
        <Box align="center" justify="start" direction="row-responsive">
          <Text size="medium">{isConnected ? "online" : "offline"}</Text>
          <Box
            align="center"
            justify="center"
            background={
              isConnected
                ? { color: "status-ok" }
                : { color: "status-disabled" }
            }
            pad="xsmall"
            round="medium"
            border={{ color: "light-3", size: "xsmall", side: "all" }}
            margin={{ left: "xsmall" }}
          />
        </Box>
      </Box>
      <Box align="end" justify="end">
        <Menu
          dropProps={{ align: { bottom: "bottom", left: "left" } }}
          items={[
            {
              label: "Api Key",
              onClick: () => {},
            },
            {
              label: "Delete",
              onClick: () => {},
            },
            {
              label: "Rename",
              onClick: () => {},
            },
          ]}
        />
      </Box>
    </Card>
  );
};

export default AppItem;
