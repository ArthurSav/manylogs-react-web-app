import { Box, Text, CheckBox, ThemeContext, Tip } from "grommet";
import { CircleInformation } from "grommet-icons";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import CircleStatusIndicator from "../CircleStatusIndicator";
import { txtAppDashboard } from "../../assets/text";
import SelectProfile from "./SelectProfile";
import { useState } from "react";
import DialogConfirmDeleteProfile from "./DialogConfirmDeleteProfile";
import DialogCreateProfile from "./DialogCreateProfile";

const theme = {
  icon: {
    size: {
      smallplus: "20px",
    },
  },
};

const PanelAppControls = () => {
  const { app, updateAppSettings } = useAppDashboardContext();
  const {
    name,
    isConnected,
    isRecordEnabled,
    isReplayEnabled,
    profiles,
    activeProfileId,
  } = app;

  const setRecordEnabled = (isEnabled) =>
    updateAppSettings({ isRecordEnabled: isEnabled });
  const setReplayEnabled = (isEnabled) =>
    updateAppSettings({ isReplayEnabled: isEnabled });
  const setActiveProfileId = (id) => updateAppSettings({ activeProfileId: id });

  const profileOptions = profiles.map((profile) => {
    return {
      label: profile.name,
      id: profile.id,
    };
  });

  return (
    <Box
      justify="start"
      background={{ color: "background-contrast" }}
      round="small"
      direction="column"
      fill="horizontal"
      pad="small"
      gap="medium"
    >
      <AppInfo name={name} isConnected={isConnected} />
      <AppControls
        isRecordEnabled={isRecordEnabled}
        isReplayEnabled={isReplayEnabled}
        setRecordEnabled={setRecordEnabled}
        setReplayEnabled={setReplayEnabled}
        setActiveProfileId={setActiveProfileId}
        selectOptions={{ options: profileOptions, selectedId: activeProfileId }}
      />
    </Box>
  );
};

const AppInfo = ({ name, isConnected }) => {
  const status = isConnected ? "online" : "offline";
  return (
    <Box
      align="start"
      justify="start"
      direction="row"
      gap="medium"
      fill="horizontal"
      height="xsmall"
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
      <Box align="stretch" justify="start" direction="column" gap="xsmall">
        <Text size="large" weight="bold">
          {name}
        </Text>
        <Box align="center" justify="start" direction="row">
          <Text size="medium" color="text-weak">
            {status}
          </Text>
          <CircleStatusIndicator isActive={isConnected} />
        </Box>
      </Box>
    </Box>
  );
};

const AppControls = ({
  isRecordEnabled,
  isReplayEnabled,
  setRecordEnabled,
  setReplayEnabled,
  setActiveProfileId,
  selectOptions,
}) => {
  const { options, selectedId } = selectOptions;

  // Select Profile Options
  const onSelectItemChanged = (id) => setActiveProfileId(id);
  const onSelectItemCreateProfile = () => {
    onOpenCreateDialog();
  };
  const onSelectItemDelete = (id) => {
    const item = options.find((i) => i.id === id);
    onOpenDeleteDialog(item);
  };

  // Dialog Delete Profile
  const [dialogDelete, setDialogDelete] = useState();
  const onOpenDeleteDialog = (item) => setDialogDelete({ item: item });
  const oncloseDeleteDialog = () => setDialogDelete(undefined);

  // dialog Create Http Profile
  const [dialogCreate, setDialogCreate] = useState();
  const onCloseCreateDialog = () => setDialogCreate(undefined);
  const onOpenCreateDialog = () => setDialogCreate(true);

  return (
    <ThemeContext.Extend value={theme}>
      {dialogDelete && (
        <DialogConfirmDeleteProfile
          onClose={oncloseDeleteDialog}
          item={dialogDelete.item}
        />
      )}
      {dialogCreate && <DialogCreateProfile onClose={onCloseCreateDialog} />}
      <Box
        align="center"
        justify="center"
        direction="row"
        gap="small"
        fill="horizontal"
        height="xsmall"
        border={{ size: "xsmall", side: "top" }}
      >
        <Box
          align="start"
          justify="start"
          round="small"
          gap="medium"
          direction="row-responsive"
          flex="grow"
        >
          <Box
            align="center"
            justify="center"
            direction="row"
            gap="small"
            pad="small"
            round="xsmall"
          >
            <CheckBox
              label="Record"
              toggle
              reverse
              checked={isRecordEnabled}
              onChange={(event) => setRecordEnabled(event.target.checked)}
            />
            <Tip
              plain
              content={
                <Box
                  pad="small"
                  gap="small"
                  width={{ max: "small" }}
                  round="small"
                  background="light-2"
                  responsive={false}
                >
                  <Text weight="bold">{txtAppDashboard.tipRecordTitle}</Text>
                  <Text size="small">{txtAppDashboard.tipRecordMessage}</Text>
                </Box>
              }
              dropProps={{ align: { left: "right" } }}
            >
              <CircleInformation size="smallplus" color="light-6" />
            </Tip>
          </Box>
          <Box
            align="center"
            justify="center"
            direction="row"
            gap="small"
            pad="small"
            round="small"
          >
            <CheckBox
              label="Replay"
              toggle
              reverse
              checked={isReplayEnabled}
              onChange={(event) => setReplayEnabled(event.target.checked)}
            />
            <Tip
              plain
              content={
                <Box
                  pad="small"
                  gap="small"
                  width={{ max: "small" }}
                  round="small"
                  background="light-2"
                  responsive={false}
                >
                  <Text weight="bold">{txtAppDashboard.tipReplayTitle}</Text>
                  <Text size="small">{txtAppDashboard.tipReplayMessage}</Text>
                </Box>
              }
              dropProps={{ align: { left: "right" } }}
            >
              <CircleInformation size="smallplus" color="light-6" />
            </Tip>
          </Box>
        </Box>
        <SelectProfile
          options={options}
          selectedId={selectedId}
          onCreateSelected={onSelectItemCreateProfile}
          onOptionSelected={onSelectItemChanged}
          onDeleteSelected={onSelectItemDelete}
        />
      </Box>
    </ThemeContext.Extend>
  );
};

export default PanelAppControls;
