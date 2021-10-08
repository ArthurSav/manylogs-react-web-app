import { Box, Text, Paragraph, TextArea, Tabs, Tab, Heading } from "grommet";
import { ListLogItem } from "./PanelAppLogs";
import { useState } from "react";

const PanelDetails = () => {
  const [index, setIndex] = useState(0);
  const onActive = (nextIndex) => setIndex(nextIndex);
  return (
    <Box
      align="start"
      justify="start"
      width="large"
      background={{ color: "background-contrast" }}
      round="small"
      pad="small"
      gap="medium"
      direction="column"
      alignSelf="stretch"
      responsive
    >
      <ListLogItem />

      <Box align="stretch" justify="start" fill>
        <Tabs flex activeIndex={index} justify="start" onActive={onActive}>
          <Tab title="Request">
            <TabRequestContent />
          </Tab>
          <Tab title="Response">
            <TabResponseContent />
          </Tab>
        </Tabs>
      </Box>
    </Box>
  );
};

const TabRequestContent = () => {
  return (
    <Box
      align="center"
      justify="start"
      fill
      round="small"
      gap="large"
      pad={{ top: "medium" }}
    >
      <Box align="start" justify="start" direction="column" fill="horizontal">
        <Heading size="small" level="4" margin="xsmall">
          Headers
        </Heading>
        <Box
          align="stretch"
          justify="start"
          fill="horizontal"
          background={{ color: "dark-1" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          height="small"
        >
          <TextArea fill resize={false} size="small" plain />
        </Box>
      </Box>
      <Box align="start" justify="start" direction="column" fill>
        <Heading size="small" level="4" margin="xsmall">
          Body
        </Heading>
        <Box
          align="stretch"
          justify="start"
          background={{ color: "dark-1" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          pad="xsmall"
          fill
          height="100%"
        >
          <TextArea fill plain resize={false} size="small" />
        </Box>
      </Box>
    </Box>
  );
};

const TabResponseContent = () => {
  return (
    <Box
      align="center"
      justify="start"
      fill
      round="small"
      gap="large"
      pad={{ top: "medium" }}
    >
      <Box align="start" justify="start" direction="column" fill="horizontal">
        <Heading size="small" level="4" margin="xsmall">
          Headers
        </Heading>
        <Box
          align="stretch"
          justify="start"
          fill="horizontal"
          background={{ color: "dark-1" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          height="small"
        >
          <TextArea fill resize={false} size="small" plain />
        </Box>
      </Box>
      <Box align="start" justify="start" direction="column" fill>
        <Heading size="small" level="4" margin="xsmall">
          Body
        </Heading>
        <Box
          align="stretch"
          justify="start"
          background={{ color: "dark-1" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          pad="xsmall"
          fill
          height="100%"
        >
          <TextArea fill plain resize={false} size="small" />
        </Box>
      </Box>
    </Box>
  );
};

export default PanelDetails;
