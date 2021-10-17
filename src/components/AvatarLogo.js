import { Avatar, Box } from "grommet";

const AvatarLogo = ({ props }) => {
  return (
    <Box
      pad={{ left: "18px", right: "small", top: "small", bottom: "small" }}
      background="light-2"
      round="small"
    >
      <Avatar src="/assets/logo_webclip_256.png" {...props} />
    </Box>
  );
};

export default AvatarLogo;
