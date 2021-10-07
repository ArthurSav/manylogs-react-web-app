import {
  Layer,
  Button,
  Heading,
  Box,
  Text,
  TextInput,
  FormField,
  Form,
} from "grommet";
import { useState } from "react";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import { Spinner } from "grommet";

const DialogCreateProfile = ({ onClose }) => {
  const [value, setValue] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createHttpProfile } = useAppDashboardContext();
  const onSubmit = (data) => {
    if (!loading) {
      createHttpProfile({
        name: data.name,
        onLoading: onLoading,
        onSuccess: onSuccess,
        onError: onError,
      });
    }
  };
  const onError = (error) => setError(error);
  const onSuccess = () => onClose();
  const onLoading = (isLoading) => setLoading(isLoading);
  return (
    <Layer
      id="create_http_profile"
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
    >
      <Box pad="medium" gap="medium" width="medium" justify="center">
        <Heading level={3} margin="none">
          Create http profile
        </Heading>
        <Form
          value={value}
          onChange={(nextValue) => {
            setError(undefined);
            setValue(nextValue);
          }}
          onSubmit={({ value: nextValue }) => onSubmit(nextValue)}
        >
          <FormField name="name" error={error} required>
            <TextInput name="name" placeholder="Profile name" />
          </FormField>
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
              type="submit"
              label={
                <>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Text color="white">
                      <strong>Create</strong>
                    </Text>
                  )}
                </>
              }
              primary
              color="status-ok"
            />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
};

export default DialogCreateProfile;
