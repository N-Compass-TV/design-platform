import { Button, Grid } from "@mui/material";
import { FaCircle, FaSquare } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../../../app/slices/layerSlice";
import { FC } from "react";
import { grey } from "@mui/material/colors";

type ShapeListProps = {
  onCloseDialog: () => void;
};

const ShapeList: FC<ShapeListProps> = ({ onCloseDialog }) => {
  const dispatch = useAppDispatch();
  const { layers } = useAppSelector((u) => u.layer);

  const handleShapeClick = async (shape: string) => {
    const newLayer: KonvaElementType = {
      elementId: uuidv4(),
      contentId: "",
      src: "",
      x: 80,
      y: 80,
      width: 100,
      height: 100,
      radius: 100,
      fill: grey[400],
      type: shape.toLowerCase(),
      stroke: grey[400],
    };
    //insert new shape in the beginning of the array.
    const allLayers = [newLayer, ...layers];
    dispatch(setLayers(allLayers));
    dispatch(setSelectedLayer(newLayer));
    onCloseDialog();
  };

  return (
    <Grid container justifyContent="space-between" alignItems="stretch">
      {shapes.map((shape, index) => (
        <Grid item>
          <Button
            key={index}
            variant="contained"
            color="inherit"
            startIcon={shape.icon}
            sx={{ minWidth: 180, justifyContent: "start", px: 3, py: 2 }}
            onClick={() => handleShapeClick(shape.name)}
          >
            {shape.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShapeList;

const shapes = [
  {
    name: "Circle",
    icon: <FaCircle />,
  },
  {
    name: "Rectangle",
    icon: <FaSquare />,
  },
  {
    name: "Triangle",
    icon: <BsFillTriangleFill />,
  },
];
