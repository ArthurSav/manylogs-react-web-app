import { Box, Text } from "grommet";

export const ListLogItem = (args) => {
  const { method, code, url } = args.item;
  const urlParsed = new URL(url);
  const pathName = urlParsed.pathname;

  const statusCodeColor = getStatusColor(code);

  return (
    <Box
      align="center"
      justify="center"
      direction="row-responsive"
      gap="xsmall"
      fill="horizontal"
      background={{ color: "dark-3" }}
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
        background={{ color: statusCodeColor, opacity: "medium" }}
      >
        <Text weight="bold" size="small">
          {code}
        </Text>
      </Box>
      <Box
        align="start"
        justify="start"
        pad="xsmall"
        round="small"
        fill="horizontal"
      >
        <Text weight="bold" size="medium">
          {pathName}
        </Text>
        <Text size="xsmall">{url}</Text>
      </Box>
    </Box>
  );
};

const getStatusColor = (code) => {
  if (code >= 400 && code < 600) {
    return "status-error";
  }
  return "status-ok";
};
