import {
  Layer,
  Text,
  Box,
  Heading,
  Form,
  FormField,
  TextInput,
  Button,
  Spinner,
  TextArea,
  ThemeContext,
} from "grommet";
import { useState } from "react";
import { useAppDashboardContext } from "../../pages/app_dashboard/context";
import { themeContextEditResponse } from "../../theme";
import { isValidHttpStatusCode } from "../../util/util";

export const DialogEditResponse = ({ onClose, data }) => {
  const [value, setValue] = useState({
    code: data.info.code,
    body: data.response.bodyText,
  });
  const { updateLogResponse } = useAppDashboardContext();

  // dialog
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onError = (error) => setError(error);
  const onSuccess = () => onClose();
  const onLoading = (isLoading) => setLoading(isLoading);
  const onSubmit = (formData) => {
    if (!loading) {
      if (!isValidHttpStatusCode(formData.code)) {
        setError("Http status code should be a value from 100 to 600");
        return;
      }
      updateLogResponse({
        itemId: data.info.id,
        response: {
          code: Number(formData.code),
          body: formData.body || "",
        },
        onSuccess: onSuccess,
        onError: onError,
      });
    }
  };
  return (
    <Layer
      id="create_http_profile"
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
    >
      <Box pad="medium" gap="medium" width="large" justify="center">
        <Heading level={3} margin="none">
          Edit Response
        </Heading>

        <Form
          value={value}
          onChange={(nextValue) => {
            setError(undefined);
            setValue(nextValue);
          }}
          onSubmit={({ value: nextValue }) => onSubmit(nextValue)}
        >
          <FormField name="code" error={error} label="code" required>
            <TextInput plain name="code" placeholder="Response code" />
          </FormField>
          <ThemeContext.Extend value={themeContextEditResponse}>
            <FormField name="body">
              <Box
                height="medium"
                background="background-json-highlighting"
                round="xsmall"
              >
                <TextArea
                  size="small"
                  name="body"
                  placeholder="Body"
                  fill
                  plain
                  resize={false}
                />
              </Box>
            </FormField>
          </ThemeContext.Extend>
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
                      <strong>Update</strong>
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
