import Box from "@mui/material/Box";
import { TbReload } from "react-icons/tb";
import { FaShapes } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import SolidTabs from "../../../common/components/SolidTabs";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import MediaDialog from "./Media/MediaDialog";
import ShapeDialog from "./Shapes/ShapeDialog";
import TextDialog from "./Text/TextDialog";
import { useNavigate } from "react-router-dom";

const VerticalTabs = () => {
  const [mediaIsOpen, setMediaIsOpen] = useState(false);
  const [shapesIsOpen, setShapesIsOpen] = useState(false);
  const [textIsOpen, setTextIsOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    {
      label: "Media",
      icon: <FaPhotoFilm fontSize="large" />,
      onClick: () => setMediaIsOpen(true),
    },
    {
      label: "Shapes",
      icon: <FaShapes fontSize="large" />,
      onClick: () => setShapesIsOpen(true),
    },
    {
      label: "Text",
      icon: <IoText fontSize="large" />,
      onClick: () => setTextIsOpen(true),
    },
    {
      label: "Reload",
      icon: <TbReload fontSize="large" />,
      onClick: () => navigate(0),
    },
  ];

  return (
    <Box
      height="100%"
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ boxShadow: 2 }}>
        <SolidTabs
          orientation="vertical"
          variant="fullWidth"
          value={0}
          onChange={() => {}}
          aria-label="Vertical side tabs"
        >
          {tabs.map((tab, index) => (
            <IconButton
              key={index}
              sx={{
                py: 2,
                color: "#000",
                bgcolor: "#fff",
                borderRadius: "0px",
                borderTopRightRadius: index == 0 ? "5px" : "",
                borderBottomRightRadius: index == tabs.length - 1 ? "5px" : "",
                borderBottom: index < tabs.length - 1 ? "1px solid #ededed" : "",
              }}
              onClick={tab.onClick}
            >
              <Box>
                <Box>{tab.icon}</Box>
                <Typography fontWeight={600}>
                  <small>{tab.label}</small>
                </Typography>
              </Box>
            </IconButton>
          ))}
        </SolidTabs>
      </Box>

      <MediaDialog
        isOpen={mediaIsOpen}
        handleClose={() => {
          setMediaIsOpen(false);
        }}
      />

      <ShapeDialog
        isOpen={shapesIsOpen}
        handleClose={() => {
          setShapesIsOpen(false);
        }}
      />

      <TextDialog
        isOpen={textIsOpen}
        handleClose={() => {
          setTextIsOpen(false);
        }}
      />
    </Box>
  );
};

export default VerticalTabs;
