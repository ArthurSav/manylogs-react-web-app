import { Layer, Button, Heading, Box, Text, Spinner } from "grommet";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import { useState } from "react";

const DialogConfirmDeleteProfile = ({ onClose, item }) => {
  const { id, label } = item;
  const [loading, setLoading] = useState(false);
  const { deleteHttpProfile } = useAppDashboardContext();
  const onLoading = (isLoading) => setLoading(isLoading);
  const onDeleteSuccess = () => onClose();
  const onDeleteError = (error) => console.log(error);
  const onDeleteAccept = () => {
    if (!loading) {
      deleteHttpProfile({
        profileId: id,
        onLoading: onLoading,
        onSuccess: onDeleteSuccess,
        onError: onDeleteError,
      });
    }
  };
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
              <>
                {loading ? (
                  <Spinner />
                ) : (
                  <Text color="white">
                    <strong>Delete</strong>
                  </Text>
                )}
              </>
            }
            onClick={onDeleteAccept}
            primary
            color="status-critical"
          />
        </Box>
      </Box>
    </Layer>
  );
};

export default DialogConfirmDeleteProfile;
