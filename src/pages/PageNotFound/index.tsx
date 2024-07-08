import { Alert, Box, Toolbar, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box p={2}>
      <Toolbar />
      <Alert severity="error">
        <Typography component="h5">Page Not Found</Typography>
      </Alert>
    </Box>
  );
};

export default PageNotFound;
