import { Box, Card, Text, Menu } from "grommet";
import { useHistory } from "react-router-dom";
import CircleStatusIndicator from "../CircleStatusIndicator";

const AppListItem = ({ id, name, isConnected }, onClick) => {
  const history = useHistory();
  const gotoAppDetails = () => history.push("/apps/" + id);
  const status = isConnected ? "online" : "offline";
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
        <Text size="medium" weight="bold" truncate>
          {name}
        </Text>
        <Box align="center" justify="start" direction="row-responsive">
          <Text size="medium">{status}</Text>
          <CircleStatusIndicator isActive={isConnected} />
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

export default AppListItem;
