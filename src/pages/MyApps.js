import { Box, Grid, Heading } from "grommet";
import AppItem from "../components/AppItem";
import { mockApps } from "../mockApps";

const MyApps = () => {
  return (
    <Box align="start" justify="center">
      <Heading margin={{ left: "small" }}> My Apps</Heading>
      <Box
        overflow="auto"
        pad="large"
        width="xlarge"
        height="xlarge"
        round="small"
        background={{ color: "background-contrast" }}
      >
        <Grid gap="large" columns="small">
          {mockApps.map((app) => {
            return <AppItem {...app} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default MyApps;
