import {
  Box,
  Text,
  CheckBox,
  Select,
  Heading,
  TextArea,
  Button,
} from "grommet";

import { Edit } from "grommet-icons";
import SecretMenu from "./SecretMenu";

const AppDashboard = () => {
  return (
    <Box
      fill="vertical"
      overflow="auto"
      align="center"
      flex="grow"
      justify="center"
      direction="row-responsive"
      gap="small"
    >
      <PanelApp />
      {/* <PanelLogs /> */}
      {/* <PanelLogDetails /> */}
      <SecretMenu />
    </Box>
  );
};

const PanelApp = (props) => {
  // const { id, name, connected, record, replay, activeProfile, profiles } = props;
  // const [record, setRecord] = useState(props.record);
  // const [replay, setReplay] = useState(props.replay);
  // const [activeProfileId, setActiveProfileId] = useState(props.activeProfileId);

  return (
    <Box
      align="start"
      justify="start"
      background={{ color: "background-contrast" }}
      round="medium"
      gap="none"
      direction="row-responsive"
      pad="small"
      height="xlarge"
    >
      <Box
        align="center"
        justify="start"
        responsive
        flex="grow"
        round="small"
        direction="column"
        gap="medium"
      >
        <Box
          align="center"
          justify="start"
          direction="row-responsive"
          gap="medium"
          border={{ color: "dark-6", side: "bottom" }}
          pad="medium"
          flex="grow"
          fill="horizontal"
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
            justify="start"
            direction="column"
            margin={{ left: "small", right: "small" }}
            gap="xsmall"
          >
            <Text size="xlarge" weight="bold">
              iphoneXYZ
            </Text>
            <Box align="center" justify="start" direction="row-responsive">
              <Text size="large">online</Text>
              <Box
                align="center"
                justify="center"
                background={{ dark: false, color: "accent-1" }}
                pad="xsmall"
                round="medium"
                margin={{ left: "xsmall" }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          align="start"
          justify="start"
          fill="horizontal"
          direction="row-responsive"
        >
          <Select
            options={["User John", "User Pro", "Another One"]}
            placeholder="Default Profile"
          />
        </Box>
        <Box
          align="center"
          justify="center"
          direction="row"
          gap="small"
          fill="horizontal"
        >
          <Box
            align="start"
            justify="start"
            flex="grow"
            fill="vertical"
            round="small"
            pad="xsmall"
            gap="medium"
          >
            <CheckBox label="Record" toggle reverse />
            <CheckBox label="Replay" toggle reverse />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const PanelLogs = () => {
  return (
    <Box
      align="start"
      justify="start"
      width="large"
      height="xlarge"
      round="medium"
      pad="small"
      gap="xxsmall"
      direction="column"
      background={{ color: "background-contrast" }}
      overflow="auto"
    >
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
            <Text weight="bold" size="medium">
              /v1/posts
            </Text>
            <Text size="xsmall">https://www.box.com/v1/posts?id=1</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const PanelLogDetails = () => {
  return (
    <Box
      align="start"
      justify="start"
      width="large"
      height="xlarge"
      background={{ color: "background-contrast" }}
      round="medium"
      pad="medium"
      gap="medium"
      direction="column"
    >
      <Box
        align="center"
        justify="center"
        direction="row-responsive"
        gap="xsmall"
        fill="horizontal"
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
          <Text weight="bold" size="medium">
            /v1/posts
          </Text>
          <Text size="xsmall">https://www.box.com/v1/posts?id=1</Text>
        </Box>
      </Box>
      <Box
        align="start"
        justify="center"
        background={{ color: "dark-1", opacity: "medium" }}
        fill="horizontal"
        pad="small"
        round="xsmall"
      >
        <Box align="center" justify="center">
          <Heading
            size="small"
            level="3"
            margin={{ bottom: "medium", top: "none" }}
          >
            Request
          </Heading>
        </Box>
        <Box align="start" justify="center" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ top: "xsmall", bottom: "xsmall" }}
            color="text-weak"
          >
            Headers
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="xsmall"
            overflow="auto"
          >
            <TextArea plain fill size="small" />
          </Box>
        </Box>
        <Box align="start" justify="start" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ bottom: "xsmall", top: "medium" }}
            color="text-weak"
          >
            Body
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="small"
            overflow="auto"
          >
            <TextArea size="small" fill plain />
          </Box>
        </Box>
      </Box>
      <Box
        align="start"
        justify="center"
        background={{ color: "dark-1", opacity: "medium" }}
        fill="horizontal"
        pad="small"
        round="xsmall"
      >
        <Box
          align="center"
          justify="start"
          fill="horizontal"
          direction="row-responsive"
        >
          <Heading
            size="small"
            level="3"
            margin={{ top: "none", bottom: "medium" }}
          >
            Response
          </Heading>
          <Box align="end" justify="center" fill="horizontal">
            <Button label="Edit" icon={<Edit />} reverse={false} size="small" />
          </Box>
        </Box>
        <Box align="start" justify="center" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            Headers
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="xsmall"
            overflow="auto"
          >
            <TextArea plain fill size="small" />
          </Box>
        </Box>
        <Box align="start" justify="start" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ bottom: "xsmall", top: "medium" }}
          >
            Body
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="small"
            overflow="auto"
          >
            <TextArea size="small" plain fill />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppDashboard;
