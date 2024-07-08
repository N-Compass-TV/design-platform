import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { FaHome, FaSave } from "react-icons/fa";
import { FaChartLine, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/useStore";
import { usePutNewsTemplateByIdMutation } from "../../../app/services/api/endpoints/newsTemplate";
import { UpdateNewsTemplateModel } from "../../../app/models/UpdateNewsTemplateModel";
import { LoadingButton } from "@mui/lab";
import { grey, orange } from "@mui/material/colors";
import theme from "../../../app/theme";
import WarningDialog from "./WarningDialog";
import { useSnackbar } from "notistack";
import { emitCustomEvent } from "react-custom-events";
import { setSelectedLayer } from "../../../app/slices/layerSlice";

const Header = () => {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const { layers } = useAppSelector((s) => s.layer);
  const { template, isLoading } = useAppSelector((s) => s.newsTemplate);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const [updateTemplateTrigger, updateTemplateResult] = usePutNewsTemplateByIdMutation();

  const saveTemplate = () => {
    if (template) {
      const updateTemplateModel: UpdateNewsTemplateModel = {
        newsTemplateId: template.id,
        newsObject: layers,
      };
      return updateTemplateTrigger(updateTemplateModel);
    }
    return Promise.resolve();
  };

  const onSave = () => {
    if (layers.length > 0) {
      dispatch(setSelectedLayer(undefined));
      saveTemplate().then(() => {
        emitCustomEvent("ce-canvastohtml");
      });
    } else {
      setIsSaveOpen(true);
    }
  };

  useEffect(() => {
    if (updateTemplateResult.isSuccess) {
      enqueueSnackbar("Template saved!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }

    if (updateTemplateResult.isError) {
      enqueueSnackbar("Failed to save template.", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  }, [updateTemplateResult]);

  return (
    <Stack direction="row" alignItems="center" flexGrow={1}>
      <Typography color="inherit">
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "2rem", width: 200, bgcolor: "#ffffff1f" }}
          />
        ) : (
          template?.newsTitle || "News Builder"
        )}
      </Typography>

      {template ? (
        <Box sx={{ justifyContent: "end", flexGrow: 1, display: { md: "flex" } }}>
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: 1 }}
            endIcon={<FaChartLine size={14} />}
          >
            Dashboard
          </Button>
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: 1 }}
            endIcon={<FaHome size={14} />}
          >
            Home
          </Button>
          <LoadingButton
            color="warning"
            variant="contained"
            endIcon={<FaSave size={14} />}
            onClick={onSave}
            loading={updateTemplateResult.isLoading}
            sx={{
              mr: 1,
              "&.MuiLoadingButton-loading": {
                background: theme.palette.warning.main,
              },
              "& .MuiLoadingButton-loadingIndicator": {
                color: theme.palette.common.white,
              },
            }}
          >
            Save
          </LoadingButton>
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: 1 }}
            endIcon={<FaPlus size={14} />}
          >
            Save As
          </Button>
        </Box>
      ) : (
        <></>
      )}
      <WarningDialog isOpen={isSaveOpen} handleClose={() => setIsSaveOpen(false)} />
    </Stack>
  );
};

export default Header;
