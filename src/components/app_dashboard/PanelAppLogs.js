import { Box, Text } from "grommet";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import {
  formatTimestampDate,
  getStatusCodeColor,
  getUrlPath,
} from "../../util/util";
import { ThemeContext } from "grommet";
import { themeContextLogItem } from "../../theme";
import { Action as ImageAction } from "grommet-icons";

const PanelAppLogs = () => {
  const context = useAppDashboardContext();
  const logs = context.logs || [];
  const items = logs.map((log) => {
    return {
      id: log._id,
      method: log.method,
      code: log.code,
      url: log.url,
      timestamp: Number(log.dateUpdated),
    };
  });
  const onItemClick = (id) => context.loadLogItemDetails(id);

  return (
    <Box
      align="start"
      justify="start"
      width="large"
      round="small"
      gap="xxsmall"
      direction="column"
      background={{ color: "background-contrast" }}
      overflow="auto"
      pad="xsmall"
      fill
    >
      {items.length === 0 ? (
        <PanelViewEmpty />
      ) : (
        <PanelView items={items} onClick={onItemClick} />
      )}
    </Box>
  );
};

const PanelView = ({ items, onClick }) => {
  return (
    <Box
      align="start"
      justify="start"
      width="large"
      gap="xxsmall"
      direction="column"
    >
      {items.map((i) => {
        return <ListLogItem key={i.timestamp} {...i} onClick={onClick} />;
      })}
    </Box>
  );
};

const PanelViewEmpty = () => {
  return (
    <Box
      align="center"
      justify="center"
      width="large"
      gap="xxsmall"
      direction="column"
      fill
    >
      <Box pad="small" direction="column" align="center" gap="small">
        <Box direction="row" gap="xsmall" align="center">
          <ImageAction size="medium" />
          <Text size="small" weight="bold">
            Start recording
          </Text>
        </Box>
        <Text size="small" textAlign="center">
          Connect your app and enable recording
          {
            <span>
              <br></br>
            </span>
          }
          to start seeing http requests here.
        </Text>
      </Box>
    </Box>
  );
};

export const ListLogItem = ({ id, method, code, url, timestamp, onClick }) => {
  const statusColor = getStatusCodeColor(code);
  const path = getUrlPath(url);
  let date = formatTimestampDate(timestamp);

  return (
    <Box
      align="start"
      justify="start"
      fill="horizontal"
      direction="column"
      gap="xxsmall"
      responsive
      flex="grow"
      onClick={() => {
        if (onClick) onClick(id);
      }}
    >
      <Box
        align="center"
        justify="center"
        direction="row-responsive"
        gap="xsmall"
        fill="horizontal"
        background={{ color: "dark-2" }}
        pad="xsmall"
        round="xsmall"
      >
        <Box
          align="center"
          justify="center"
          pad="small"
          round="xsmall"
          background={{ color: "graph-3", opacity: "medium" }}
        >
          <Text weight="bold" size="small">
            {method}
          </Text>
        </Box>
        <Box
          align="center"
          justify="center"
          pad="small"
          round="xsmall"
          background={{ color: statusColor, opacity: "medium" }}
        >
          <Text weight="bold" size="small">
            {code}
          </Text>
        </Box>
        <ThemeContext.Extend value={themeContextLogItem}>
          <Box
            align="start"
            justify="start"
            pad="xsmall"
            round="small"
            fill="horizontal"
          >
            <Box align="center" justify="start" direction="row" width="100%">
              <Box align="start" justify="start" flex="grow">
                <Text weight="bold" size="small">
                  {path}
                </Text>
              </Box>
              <Text size="xsmall" color="text-weak">
                {date}
              </Text>
            </Box>
            <Text size="xsmall">{url}</Text>
          </Box>
        </ThemeContext.Extend>
      </Box>
    </Box>
  );
};

export default PanelAppLogs;
