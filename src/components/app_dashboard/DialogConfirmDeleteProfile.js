import { Layer, Button, Heading, Box, Text } from "grommet";

const DialogConfirmDeleteProfile = ({ onClose, onAccept, item }) => {
  const { id, label } = item;
  return (
    <Layer
      id="delete_http_profile"
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
    >
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Confirm
        </Heading>
        <Text wordBreak="break-word">
          Are you sure you want to delete <strong>{label}</strong>? All Http
          data in this profile will be permanently deleted.
        </Text>
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="end"
          pad={{ top: "medium", bottom: "small" }}
        >
          <Button label="Cancel" onClick={onClose} color="dark-3" />
          <Button
            label={
              <Text color="white">
                <strong>Delete</strong>
              </Text>
            }
            onClick={() => onAccept(id)}
            primary
            color="status-critical"
          />
        </Box>
      </Box>
    </Layer>
  );
};

export default DialogConfirmDeleteProfile;
