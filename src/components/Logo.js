import { Box, Image } from "grommet";

export const Logo1 = () => {
  return (
    <Box
      pad="small"
      background="accent-1"
      round="xsmall"
      height="70px"
      width="70px"
    >
      <Image fill src="/assets/manylogs_logo_2.svg" />
    </Box>
  );
};

export const Logo2 = () => {
  return (
    <Box
      pad="xsmall"
      background="light-4"
      round="xsmall"
      height="50px"
      width="50px"
    >
      <Image fill src="/assets/manylogs_logo_1.svg" />
    </Box>
  );
};
