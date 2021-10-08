import { Box, Text, TextArea, Tabs, Tab, Heading } from "grommet";
import { ListLogItem } from "./PanelAppLogs";
import { useState } from "react";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import { Select as ImageSelect } from "grommet-icons";

const PanelDetails = () => {
  const { selectedLog } = useAppDashboardContext();
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
    >
      {selectedLog ? <PanelView data={selectedLog} /> : <PanelViewEmpty />}
    </Box>
  );
};

const PanelView = ({ data }) => {
  // tab index
  const [index, setIndex] = useState(0);
  const onActive = (nextIndex) => setIndex(nextIndex);

  // data
  const http = data.data;

  const info = {
    id: data._id,
    method: http.request.method,
    code: http.response.code,
    url: http.request.url,
    timestamp: Number(data.dateUpdated),
  };

  const request = {
    headers: JSON.stringify(http.request.headers),
    body: http.request.body,
  };

  const response = {
    headers: JSON.stringify(http.response.headers),
    body: http.response.body,
  };

  return (
    <Box align="start" justify="start" gap="medium" direction="column" fill>
      <ListLogItem {...info} />
      <Box align="stretch" justify="start" fill>
        <Tabs flex activeIndex={index} justify="start" onActive={onActive}>
          <Tab title="Request">
            <TabRequestContent request={request} />
          </Tab>
          <Tab title="Response">
            <TabResponseContent response={response} />
          </Tab>
        </Tabs>
      </Box>
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
          <ImageSelect size="medium" />
          <Text size="small" weight="bold">
            Select http request
          </Text>
        </Box>
        <Text size="small" textAlign="center">
          Select a http request to{<br></br>} view details or edit the response.
        </Text>
      </Box>
    </Box>
  );
};

const TabRequestContent = ({ request }) => {
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
          <TextArea
            fill
            resize={false}
            size="small"
            plain
            value={request.headers}
          />
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
          <TextArea
            fill
            plain
            resize={false}
            size="small"
            value={request.body}
          />
        </Box>
      </Box>
    </Box>
  );
};

const TabResponseContent = ({ response }) => {
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
          <TextArea
            fill
            resize={false}
            size="small"
            plain
            value={response.headers}
          />
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
          <TextArea
            fill
            plain
            resize={false}
            size="small"
            value={response.body}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PanelDetails;
