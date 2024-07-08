import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { FC } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const DenseAppBar: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ bgcolor: "#1c2731" }}>{children}</Toolbar>
      </AppBar>
    </Box>
  );
};

export default DenseAppBar;
