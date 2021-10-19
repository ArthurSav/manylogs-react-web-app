import { Layer, Button, Heading, Box, Text } from "grommet";
import { session, clearUserSession } from "../session";
import { Redirect } from "react-router-dom";
import { useState } from "react";

const DialogMyAccount = ({ onClose }) => {
  const [logout, setLogout] = useState(undefined);
  const { email } = session();
  const starLogout = () => {
    clearUserSession();
    setLogout(true);
  };
  return (
    <Layer
      id="dialog_account"
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
    >
      {logout && <Redirect to="/login" />}
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Account
        </Heading>
        <Text>{email}</Text>
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="end"
          pad={{ top: "medium", bottom: "small" }}
        >
          <Button label="Logout" onClick={starLogout} color="dark-3" />
        </Box>
      </Box>
    </Layer>
  );
};

export default DialogMyAccount;
