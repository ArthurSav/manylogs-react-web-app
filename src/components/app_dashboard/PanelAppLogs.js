import { Box, Text } from "grommet";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import {
  formatTimestampDate,
  getStatusCodeColor,
  getUrlPath,
} from "../../util/util";
import { ThemeContext } from "grommet";
import { customLogTheme } from "../../theme";

const PanelAppLogs = () => {
  const state = useAppDashboardContext();
  const logs = state.logs || [];
  const items = logs.map((log) => {
    return {
      id: log._id,
      method: log.method,
      code: log.code,
      url: log.url,
      timestamp: Number(log.dateUpdated),
    };
  });

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
      {items.map((i) => {
        return <ListLogItem key={i.id} {...i} />;
      })}
    </Box>
  );
};

export const ListLogItem = ({ id, method, code, url, timestamp }) => {
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
        <ThemeContext.Extend value={customLogTheme}>
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
