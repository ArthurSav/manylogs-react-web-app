import { Avatar, Box, Image } from "grommet";

const AvatarLogo = () => {
  return (
    <Box
      pad="small"
      background="accent-1"
      round="xsmall"
      height="90px"
      width="90px"
    >
      <Image fill src="/assets/manylogs_logo_2.svg" />
    </Box>
  );
};

export default AvatarLogo;
