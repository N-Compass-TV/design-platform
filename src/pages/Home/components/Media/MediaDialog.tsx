import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import MediaList from "./MediaList";
import {
  KonvaElementType,
} from "../../../../app/types/KonvaTypes";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../../../app/slices/layerSlice";

type MediaDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const MediaDialog: FC<MediaDialogProps> = ({ isOpen, handleClose }) => {
  const [selectedMedia, setSelectedMedia] = useState<Array<KonvaElementType>>(
    []
  );
  const dispatch = useAppDispatch();
  const { layers } = useAppSelector((u) => u.layer);

  const handleClickSubmit = () => {
    if (selectedMedia.length > 0) {
      //insert new media in the beginning of the array.
      const allLayers = [...selectedMedia.reverse(), ...layers, ];
      dispatch(setLayers(allLayers));
      dispatch(
        setSelectedLayer(selectedMedia[selectedMedia.length - 1])
      );
    }
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        Media Library
        <Typography>
          <small>Select one or more asset to include in your project.</small>
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <MediaList setSelectedMedia={setSelectedMedia} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "start", p: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickSubmit}>
          Add to Project
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediaDialog;
