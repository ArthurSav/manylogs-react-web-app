import { Box, Text } from "grommet";

const PanelAppLogs = () => {
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
      <ListLogItem />
    </Box>
  );
};

export const ListLogItem = () => {
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
            GET
          </Text>
        </Box>
        <Box
          align="center"
          justify="center"
          pad="small"
          round="xsmall"
          background={{ color: "accent-1", opacity: "medium" }}
        >
          <Text weight="bold" size="small">
            200
          </Text>
        </Box>
        <Box
          align="start"
          justify="start"
          pad="xsmall"
          round="small"
          fill="horizontal"
        >
          <Box align="center" justify="start" direction="row" width="100%">
            <Box align="start" justify="start" flex="grow">
              <Text weight="bold" size="medium">
                /v1/posts
              </Text>
            </Box>
            <Text size="xsmall" color="text-weak">
              2020/10/04 12:12:00+4
            </Text>
          </Box>
          <Text size="xsmall">https://www.box.com/v1/posts?id=1</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PanelAppLogs;
