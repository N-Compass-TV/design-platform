import {
  Alert,
  Box,
  Grid,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Canvas from "./components/Canvas";
import Layers from "./components/Layers";
import VerticalTabs from "./components/VerticalTabs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetNewsTemplateByIdQuery } from "../../app/services/api/endpoints/newsTemplate";
import { useAppDispatch } from "../../app/hooks/useStore";
import {
  setIsLoadingTemplate,
  setNewsTemplate,
} from "../../app/slices/newsTemplateSlice";
import { NewsTemplateType } from "../../app/types/NewsTemplateTypes";
import { setLayers } from "../../app/slices/layerSlice";
import { KonvaElementType } from "../../app/types/KonvaTypes";
import useFontFaceObserver from "use-font-face-observer";
import { fontFamilyList } from "../../common/constants/text";

const Home = () => {
  const dispatch = useAppDispatch();
  const { newstemplateid } = useParams();
  const navigate = useNavigate();
  const [getNewsTemplateByIdTrigger, getNewsTemplateByIdResult] =
    useLazyGetNewsTemplateByIdQuery();
  const isFontsLoaded = useFontFaceObserver(
    fontFamilyList.map((font) => ({ family: font } as any))
  );

  useEffect(() => {
    //check if template id is present
    if (newstemplateid) {
      dispatch(setIsLoadingTemplate(true));
      //check if template id exist in db
      getNewsTemplateByIdTrigger(newstemplateid)
        .then((response) => {
          if (response.isSuccess) {
            const template: NewsTemplateType = response.data;
            dispatch(setNewsTemplate(template));

            if (template.newsObject) {
              dispatch(setLayers(template.newsObject as KonvaElementType[]));
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoadingTemplate(false));
        });
    }
  }, [newstemplateid]);
  return (
    <Box height="calc(100vh - 64px)">
      <Toolbar />
      {getNewsTemplateByIdResult.isLoading ||
      getNewsTemplateByIdResult.isFetching ||
      !isFontsLoaded ? (
        <Skeleton
          animation="wave"
          sx={{ m: 2 }}
          variant="rectangular"
          width="98%"
          height="95%"
        />
      ) : getNewsTemplateByIdResult.data ? (
        <Grid
          height="100%"
          alignItems="stretch"
          container
          spacing={0}
          columns={3}
          wrap="nowrap"
          justifyContent="space-between"
        >
          <Grid item>
            <VerticalTabs />
          </Grid>
          <Grid
            item
            sx={{ overflow: "auto" }}
            display="flex"
            alignItems="center"
          >
            <Canvas />
          </Grid>
          <Grid item>
            <Layers />
          </Grid>
        </Grid>
      ) : (
        <Box p={2}>
          <Alert severity="error">
            <Typography component="h5">Template Not Found</Typography>
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Home;
