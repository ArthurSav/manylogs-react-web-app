import { Box, Text, TextArea, Tabs, Tab, Heading, Spinner } from "grommet";
import { ListLogItem } from "./PanelAppLogs";
import { useState } from "react";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import { Select as ImageSelect } from "grommet-icons";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import yaml from "react-syntax-highlighter/dist/esm/languages/hljs/yaml";
import htmlbars from "react-syntax-highlighter/dist/esm/languages/hljs/htmlbars";
import darcula from "react-syntax-highlighter/dist/esm/styles/hljs/darcula";
import { parseHttpDataToDisplayableContent } from "../../util/parsing";
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("htmlbars", htmlbars);

const PanelDetails = () => {
  const { selectedLog } = useAppDashboardContext();
  const data = selectedLog ? constructPanelViewData(selectedLog) : {};
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
      {selectedLog ? <PanelView data={data} /> : <PanelViewEmpty />}
    </Box>
  );
};

const PanelView = ({ data }) => {
  const [index, setIndex] = useState(0); // tab index
  const onActive = (nextIndex) => setIndex(nextIndex);
  return (
    <Box align="start" justify="start" gap="medium" direction="column" fill>
      <ListLogItem item={data.info} />
      <Box align="stretch" justify="start" fill>
        <Tabs flex activeIndex={index} justify="start" onActive={onActive}>
          <Tab title="Request">
            <TabRequestContent request={data.request} />
          </Tab>
          <Tab title="Response">
            <TabResponseContent response={data.response} />
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
          background={{ color: "background-json-highlighting" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          height="medium"
          fill="horizontal"
        >
          <Text size="xsmall">
            <SyntaxHighlighter
              style={darcula}
              language={request.headerHighlightLang}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={{ margin: 6, background: "" }}
            >
              {request.headersText}
            </SyntaxHighlighter>
          </Text>
        </Box>
      </Box>
      <Box align="start" justify="start" direction="column" fill>
        <Box direction="row" fill="horizontal">
          <Heading size="small" level="4" margin="xsmall">
            Body
          </Heading>

          <Box fill="horizontal" justify="center" align="end">
            <Text size="small" color="text-xweak">
              {request.contentType}
            </Text>
          </Box>
        </Box>
        <Box
          align="stretch"
          justify="start"
          background={{ color: "background-json-highlighting" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          fill
          height="100%"
        >
          <Text size="xsmall">
            <SyntaxHighlighter
              style={darcula}
              language={request.bodyHighlightLang}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={{ margin: 4, background: "" }}
            >
              {request.bodyText}
            </SyntaxHighlighter>
          </Text>
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
          background={{ color: "background-json-highlighting" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          height="medium"
          fill="horizontal"
        >
          <Text size="xsmall">
            <SyntaxHighlighter
              style={darcula}
              language={response.headerHighlightLang}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={{ margin: 6, background: "" }}
            >
              {response.headersText}
            </SyntaxHighlighter>
          </Text>
        </Box>
      </Box>
      <Box align="start" justify="start" direction="column" fill>
        <Box direction="row" fill="horizontal">
          <Heading size="small" level="4" margin="xsmall">
            Body
          </Heading>

          <Box fill="horizontal" justify="center" align="end">
            <Text size="small" color="text-xweak">
              {response.contentType}
            </Text>
          </Box>
        </Box>
        <Box
          align="stretch"
          justify="start"
          background={{ color: "background-json-highlighting" }}
          round="xsmall"
          overflow="auto"
          direction="column"
          fill
          height="100%"
        >
          <Text size="xsmall">
            <SyntaxHighlighter
              style={darcula}
              language={response.bodyHighlightLang}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={{ margin: 4, background: "" }}
            >
              {response.bodyText}
            </SyntaxHighlighter>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const constructPanelViewData = (selectedLog) => {
  const preview = selectedLog.preview;
  const full = selectedLog.full;

  const result = {};

  if (full) {
    const id = full._id;
    const timestamp = Number(full.dateUpdated);
    const http = full.data;
    const info = {
      id: id,
      method: http.request.method,
      code: http.response.code,
      url: http.request.url,
      timestamp: timestamp,
    };
    result.info = info;
    result.request = parseHttpDataToDisplayableContent({
      headers: http.request.headers,
      body: http.request.body,
    });
    result.response = parseHttpDataToDisplayableContent({
      headers: http.response.headers,
      body: http.response.body,
    });
  } else if (preview) {
    result.request = parseHttpDataToDisplayableContent({}); // empty data
    result.response = parseHttpDataToDisplayableContent({}); // empty data
    result.info = preview;
  }

  return result;
};

export default PanelDetails;
