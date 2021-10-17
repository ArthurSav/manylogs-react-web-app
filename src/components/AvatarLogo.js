import { Avatar, Box } from "grommet";

const AvatarLogo = () => {
  return (
    <Box
      pad={{ left: "18px", right: "small", top: "small", bottom: "small" }}
      background="light-2"
      round="xsmall"
    >
      <Avatar size="35px" src="/assets/logo_webclip_256.png" />
    </Box>
  );
};

export default AvatarLogo;
