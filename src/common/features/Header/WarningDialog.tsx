import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Typography } from "@mui/material";

type MediaDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const WarningDialog: FC<MediaDialogProps> = ({ isOpen, handleClose }) => {
  return (
    <Dialog
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      sx={{
        "& > .MuiPaper-root": {
          width: 500
        }
      }}
    >
      <DialogTitle id="scroll-dialog-title">Warning</DialogTitle>
      <DialogContent dividers={true}>
        <Typography>
          <Alert severity="warning">Template is empty.</Alert>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "start", p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;
