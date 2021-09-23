import { Box, Menu } from "grommet";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { clearUserSession } from "../context";

const SecretMenu = () => {
  const [data, setData] = useState({ logout: false });
  const onLogout = () => {
    clearUserSession();
    setData({ logout: true });
  };

  return (
    <Box align="center" justify="center">
      {data.logout ? <Redirect to="/signin" /> : null}
      <Menu
        label="Secret Menu"
        items={[
          {
            label: "Logout",
            onClick: () => {
              onLogout();
            },
          },
        ]}
      />
    </Box>
  );
};

export default SecretMenu;
