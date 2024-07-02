import { createRef, useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../../app/slices/layerSlice";
import MediaElement from "./Media/MediaElement";
import CircleElement from "./Shapes/CircleElement";
import RectElement from "./Shapes/RectElement";
import TriangleElement from "./Shapes/TriangleElement";
import TextElement from "./Text/TextElement";
import { HtmlTag, html } from "js-to-html";
import { Node, NodeConfig } from "konva/lib/Node";
import { objectToCssString } from "../../../app/helpers/string";
import saveAs from "file-saver";
import { useCustomEventListener } from "react-custom-events";

const Canvas = () => {
  const [canvasWidth] = useState(1080);
  const [canvasHeight] = useState(608);

  const stageRef = createRef<Konva.Stage>();
  const dispatch = useAppDispatch();
  const { layers, selectedLayer } = useAppSelector((u) => u.layer);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(setSelectedLayer(undefined));
    }
  };

  const toPercentage = (num: number, divisor: number) => {
    return (num / divisor) * 100;
  };

  const getLayers = () => {
    const contents: Array<HtmlTag<any>> = new Array<HtmlTag<any>>();
    layers.map((layer, index) => {
      let style = {};
      switch (layer.type?.toLowerCase()) {
        case "text": {
          style = {
            position: "absolute",
            left: `${toPercentage(layer.x, canvasWidth)}%`,
            top: `${toPercentage(layer.y, canvasHeight)}%`,
            font_size: `${toPercentage(layer.fontSize || 0, canvasWidth)}vw`,
            font_family: layer.fontFamily,
            color: layer.fill,
            letter_spacing: `${layer.letterSpacing}px`,
            line_height: `${toPercentage((layer.fontSize || 0) * (layer.lineHeight || 0), canvasHeight)}vh`,
            text_align: layer.align,
            z_index: layers.length - index,
          };
          break;
        }
        case "rectangle": {
          style = {
            position: "absolute",
            left: `${toPercentage(layer.x, canvasWidth)}%`,
            top: `${toPercentage(layer.y, canvasHeight)}%`,
            background: layer.fill,
            width: `${toPercentage(layer.width || 0, canvasWidth)}%`,
            height: `${toPercentage(layer.height || 0, canvasHeight)}vh`,
            border_radius: `${layer.radius}px`,
            border_color: `${layer.stroke}`,
            border_width: `${layer.strokeWidth}px`,
            border_style: "solid",
            z_index: layers.length - index,
          };
          break;
        }

        case "circle": {
          style = {
            position: "absolute",
            left: `${toPercentage(layer.x - (layer.radius || 0), canvasWidth)}%`, //substract radius since circle x and y is point to the center of the circle
            top: `${toPercentage(layer.y - (layer.radius || 0), canvasHeight)}%`,
            background: layer.fill,
            width: `${toPercentage(layer.width || 0, canvasWidth)}%`,
            height: `${toPercentage(layer.height || 0, canvasHeight)}vh`,
            border_radius: `${layer.radius}%`,
            border_color: `${layer.stroke}`,
            border_width: `${layer.strokeWidth}px`,
            border_style: "solid",
            z_index: layers.length - index,
          };
          break;
        }

        case "media": {
          style = {
            position: "absolute",
            left: `${toPercentage(layer.x, canvasWidth)}%`,
            top: `${toPercentage(layer.y, canvasHeight)}%`,
            // background: layer.fill,
            width: `${toPercentage(layer.width || 0, canvasWidth)}%`,
            height: `${toPercentage(layer.height || 0, canvasHeight)}vh`,
            border_radius: `${layer.radius}%`,
            border_color: `${layer.stroke}`,
            border_width: `${layer.strokeWidth}px`,
            border_style: "solid",
            z_index: layers.length - index,
          };
          break;
        }
        default:
      }
      if (layer.type?.toLowerCase() == "media") {
        contents.push(html.img({ style: objectToCssString(style), src: layer.src }));
      } else {
        contents.push(html.div({ style: objectToCssString(style) }, layer.text));
      }
    });
    return contents;
  };

  const canvasToHtmlEvent = () => {
    const stage = stageRef.current?.getStage();
    if (stage) {
      const bodyContentArray = getLayers();

      var finalHtml = html.html([
        html.head([
          html.style("p { margin: 0 } body { margin: 0px }"),
          html.link({ rel: "stylesheet", href: "./fonts/fonts.css" }),
        ]),
        html.body([...bodyContentArray]),
      ]);
      const htmlString = finalHtml.toHtmlDoc({ title: "test", pretty: true }, {});

      const blob = new Blob([htmlString], { type: "text/html" });

      saveAs(blob, "test.html");
    }
  };

  useCustomEventListener(
    "ce-canvastohtml",
    () => {
      canvasToHtmlEvent();
    },
    []
  );

  useEffect(() => {
    setTimeout(() => {
      stageRef.current?.draw();
    }, 1);
  }, []);

  return (
    <Box p={5} alignSelf="start">
      <Stage
        className="konva-container"
        width={canvasWidth}
        height={canvasHeight}
        style={{ background: "#fff" }}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {layers.map((el, index) => {
            //reverse the rendering so that the first element is in front of the canvas
            const revIndex = layers.slice(index, layers.length - 1).length;
            const element = layers[revIndex];
            let finalElement = <></>;
            switch (element.type?.toLowerCase()) {
              case "media":
                finalElement = (
                  <MediaElement
                    elementId={element.elementId}
                    width={element.width}
                    height={element.height}
                    key={element.elementId}
                    src={element.src}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    isFeatured={element.isFeatured}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;

              case "circle":
                finalElement = (
                  <CircleElement
                    elementId={element.elementId}
                    radius={element.radius}
                    width={element.width}
                    height={element.height}
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;
              case "rectangle":
                finalElement = (
                  <RectElement
                    elementId={element.elementId}
                    width={element.width}
                    height={element.height}
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    radius={element.radius}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;

              case "triangle":
                finalElement = (
                  <TriangleElement
                    elementId={element.elementId}
                    sides={element.sides}
                    radius={element.radius}
                    width={element.width}
                    height={element.height}
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;

              case "text":
                finalElement = (
                  <TextElement
                    elementId={element.elementId}
                    text={element.text}
                    fontFamily={element.fontFamily}
                    fontSize={element.fontSize}
                    lineHeight={element.lineHeight}
                    letterSpacing={element.letterSpacing}
                    fontStyle={element.fontStyle}
                    align={element.align}
                    width={element.width}
                    height={element.height}
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;

              default:
                finalElement = <></>;
            }
            return finalElement;
          })}
        </Layer>
      </Stage>
    </Box>
  );
};

export default Canvas;
